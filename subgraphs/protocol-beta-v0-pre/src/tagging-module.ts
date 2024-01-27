import { TagSet, TagRemoved } from "../generated/TaggingModule/TaggingModule";
import { Tag } from "../generated/schema";

export function handleTagSet(event: TagSet): void {
  let entity = new Tag(generateUUID().toString());

  entity.ipId = event.params.ipId;
  entity.tag = event.params.tag;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}

export function handleTagRemoved(event: TagRemoved): void {
  let entity = Tag.load(generateUUID().toString());
  if (entity == null) {
    return;
  }

  entity.deletedAt = event.block.number;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}


export function generateUUID(): string {
  const uuidBytes = new Uint8Array(16);

  // Generate random bytes
  for (let i = 0; i < 16; i++) {
    uuidBytes[i] = <u8>(Math.floor(Math.random() * 256));
  }

  // Set version (4) and variant (2) bits
  uuidBytes[6] = (uuidBytes[6] & 0x0f) | 0x40;
  uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80;

  // Convert bytes to a hexadecimal string
  let uuid = "";
  for (let i = 0; i < 16; i++) {
    uuid += uuidBytes[i].toString(16).padStart(2, "0");
  }

  // Insert dashes at the appropriate positions to match UUID format
  return (
      uuid.substring(0, 8) +
      "-" +
      uuid.substring(8, 12) +
      "-" +
      uuid.substring(12, 16) +
      "-" +
      uuid.substring(16, 20) +
      "-" +
      uuid.substring(20)
  );
}

