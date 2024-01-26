import { PermissionSet } from "../generated/AccessController/AccessController";
import { Permission } from "../generated/schema";
import * as crypto from "crypto";

export function handlePermissionSet(event: PermissionSet): void {
  const permString =
    event.params.ipAccount.toHexString() +
    "-" +
    event.params.to.toHexString() +
    "-" +
    event.params.signer.toHexString() +
    "-" +
    event.params.func.toHexString();
  let permHash = crypto.createHash(permString).digest("hex");

  let entity = new Permission(permHash);

  entity.to = event.params.to;
  entity.ipAccount = event.params.ipAccount;
  entity.func = event.params.func;
  entity.signer = event.params.signer;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.permission = event.params.permission.toString();

  entity.save();
}
