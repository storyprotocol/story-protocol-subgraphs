import { PermissionSet } from "../generated/AccessController/AccessController";
import { Permission } from "../generated/schema";

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

  entity.to = event.params.to;
  entity.ipAccount = event.params.ipAccount;
  entity.func = event.params.func;
  entity.signer = event.params.signer;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.permission = event.params.permission.toString();

  entity.save();
}
