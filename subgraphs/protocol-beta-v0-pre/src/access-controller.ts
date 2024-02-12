import { PermissionSet } from "../generated/AccessController/AccessController";
import { Permission, Transaction } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts"

export function handlePermissionSet(event: PermissionSet): void {
  let entity = new Permission(
    event.params.ipAccount.toHexString() +
      "-" +
      event.params.to.toHexString() +
      "-" +
      event.params.signer.toHexString() +
      "-" +
      event.params.func.toHexString(),
  );

  const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())

  entity.uuid = hash;
  entity.to = event.params.to;
  entity.func = event.params.func;
  entity.signer = event.params.signer;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.permission = event.params.permission.toString();

  entity.save();

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = new Bytes(0)
  trx.resourceId = event.params.ipAccount
  trx.actionType = "Set"
  trx.resourceType = "Permission"

  trx.save()
}

export function takeFirst15Chars(input: string): string {
  let result: string = "";

  // Iterate through the string and copy the first 10 characters
  for (let i: i32 = 0; i < 15 && i < input.length; i++) {
    result = result.concat(input.charAt(i));
  }

  return result;
}