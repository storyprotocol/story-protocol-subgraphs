import { PermissionSet } from "../generated/AccessController/AccessController";
import { Permission } from "../generated/schema";

export function handlePermissionSet(event: PermissionSet): void {
  const permString =
    event.params.ipAccount.toHexString() +
    "-" +
    event.params.to.toHexString() +
    "-" +
    event.params.signer.toHexString() +
    "-" +
    event.params.func.toHexString();

  let permHash = sha256(permString);
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

function sha256(input: string): string {
  let hash = "";
  for (let i = 0; i < input.length; i++) {
    hash += input.charCodeAt(i).toString(16);
  }
  return hash;
}
