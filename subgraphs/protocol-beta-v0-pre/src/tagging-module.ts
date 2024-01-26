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
  return hash;
}
