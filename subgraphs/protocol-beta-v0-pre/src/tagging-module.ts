import { TagSet, TagRemoved } from "../generated/TaggingModule/TaggingModule";
import { Tag } from "../generated/schema";

export function handleTagSet(event: TagSet): void {
  const tagString = event.params.ipId.toHexString() + "-" + event.params.tag;

  let entity = new Tag(tagString);

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
