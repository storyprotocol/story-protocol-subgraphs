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

  const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())

  entity.uuid = hash;
  entity.to = event.params.to;
  entity.ipAccount = event.params.ipAccount;
  entity.func = event.params.func;
  entity.signer = event.params.signer;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.permission = event.params.permission.toString();

  entity.save();
}

export function takeFirst15Chars(input: string): string {
  let result: string = "";

  // Iterate through the string and copy the first 10 characters
  for (let i: i32 = 0; i < 15 && i < input.length; i++) {
    result = result.concat(input.charAt(i));
  }

  return result;
}

// export function generateUUID(): string {
//   const uuidBytes = new Uint8Array(16);
//
//   // Generate random bytes
//   for (let i = 0; i < 16; i++) {
//     uuidBytes[i] = <u8>(Math.floor(Math.random() * 256));
//   }
//
//   // Set version (4) and variant (2) bits
//   uuidBytes[6] = (uuidBytes[6] & 0x0f) | 0x40;
//   uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80;
//
//   // Convert bytes to a hexadecimal string
//   let uuid = "";
//   for (let i = 0; i < 16; i++) {
//     uuid += uuidBytes[i].toString(16).padStart(2, "0");
//   }
//
//   // Insert dashes at the appropriate positions to match UUID format
//   return (
//       uuid.substring(0, 8) +
//       "-" +
//       uuid.substring(8, 12) +
//       "-" +
//       uuid.substring(12, 16) +
//       "-" +
//       uuid.substring(16, 20) +
//       "-" +
//       uuid.substring(20)
//   );
// }
