import { TagSet, TagRemoved } from "../generated/TaggingModule/TaggingModule";
import { Tag } from "../generated/schema";

export function handleTagSet(event: TagSet): void {
  const tagString = event.params.ipId.toHexString() + "-" + event.params.tag;
  let tagHash = sha256(tagString);

  let entity = new Tag(tagHash);

  entity.ipId = event.params.ipId;
  entity.tag = event.params.tag;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}

export function handleTagRemoved(event: TagRemoved): void {
  const tagString = event.params.ipId.toHexString() + "-" + event.params.tag;
  let tagHash = sha256(tagString);

  let entity = Tag.load(tagHash);
  if (entity == null) {
    return;
  }

  entity.deletedAt = event.block.number;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}

function sha256(input: string): string {
  let hash = "";
  for (let i = 0; i < input.length; i++) {
    hash += input.charCodeAt(i).toString(16);
  }

  let binary = "";
  for (let i = 0; i < hash.length; i += 2) {
    binary += String.fromCharCode(
      parseInt(hash.substr(i, 2), 16) as i32, // Explicit cast to i32
    );
  }

  // Convert the binary string to Base64 manually
  let base64 = "";
  let bytes = Uint8Array.wrap(String.UTF8.encode(binary));
  const base64Chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (let i = 0; i < bytes.length; i += 3) {
    const triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    for (let j = 0; j < 4; j++) {
      if (i * 8 + j * 6 < bytes.length * 8) {
        let shiftAmount = <u8>((3 - j) * 6);
        let index = (triplet >>> shiftAmount) & 0x3f;
        base64 += base64Chars.charAt(index as u8);
      } else {
        base64 += "=";
      }
    }
  }
  return base64;
}
