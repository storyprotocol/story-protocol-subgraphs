import { TagSet, TagRemoved } from "../generated/TaggingModule/TaggingModule";
import { Tag } from "../generated/schema";

export function handleTagSet(event: TagSet): void {
  const tagString = event.params.ipId.toHexString() + "-" + event.params.tag;

  let entity = new Tag(tagString);

  const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())

  entity.uuid = hash;
  entity.ipId = event.params.ipId;
  entity.tag = event.params.tag;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}

export function handleTagRemoved(event: TagRemoved): void {
  const tagString = event.params.ipId.toHexString() + "-" + event.params.tag;

  let entity = Tag.load(tagString);
  if (entity == null) {
    return;
  }

  entity.deletedAt = event.block.number;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

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