import { RoyaltyPolicySet,
  RoyaltyPaid,
  RoyaltyTokenWhitelistUpdated,
  RoyaltyPolicyWhitelistUpdated,
  LicenseMintingFeePaid } from "../generated/RoyaltyModule/RoyaltyModule";
import { IPRoyalty, RoyaltyPay, LicenseMintingFeePaidEntity, Transaction } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts"
export function handleRoyaltyPaid(event: RoyaltyPaid): void {
  const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())

  let entity = new RoyaltyPay(hash);

  entity.receiverIpId = event.params.receiverIpId;
  entity.payerIpId = event.params.payerIpId;
  entity.sender = event.params.sender;
  entity.token = event.params.token;
  entity.amount = event.params.amount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = event.params.receiverIpId
  trx.resourceId = event.address
  trx.actionType = "Pay"
  trx.resourceType = "Royalty"
  trx.blockNumber = event.block.number;
  trx.blockTimestamp = event.block.timestamp;

  trx.save()
}

export function handleLicenseMintingFeePaid(event: LicenseMintingFeePaid): void {
  const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())

  let entity = new LicenseMintingFeePaidEntity(hash);

  entity.receiverIpId = event.params.receiverIpId;
  entity.payer = event.params.payerAddress;
  entity.token = event.params.token;
  entity.amount = event.params.amount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = event.params.receiverIpId
  trx.resourceId = event.address
  trx.actionType = "Pay"
  trx.resourceType = "Royalty"
  trx.blockNumber = event.block.number;
  trx.blockTimestamp = event.block.timestamp;

  trx.save()
}

export function handleRoyaltyPolicySet(event: RoyaltyPolicySet): void {
  const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())

  let entity = new IPRoyalty(hash)

  entity.royaltyPolicy = event.params.royaltyPolicy;
  entity.ipId = event.params.ipId;
  entity.data = event.params.data;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = event.params.ipId
  trx.resourceId = event.address
  trx.actionType = "Set"
  trx.resourceType = "Royalty"
  trx.blockNumber = event.block.number;
  trx.blockTimestamp = event.block.timestamp;

  trx.save()
}

export function handleRoyaltyPolicyWhitelistUpdated(event: RoyaltyPolicyWhitelistUpdated): void {

}

export function handleRoyaltyTokenWhitelistUpdated(event: RoyaltyTokenWhitelistUpdated): void {

}
export function takeFirst15Chars(input: string): string {
  let result: string = "";

  // Iterate through the string and copy the first 10 characters
  for (let i: i32 = 0; i < 15 && i < input.length; i++) {
    result = result.concat(input.charAt(i));
  }

  return result;
}
