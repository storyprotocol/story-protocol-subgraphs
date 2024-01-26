import { TagSet, TagRemoved } from "../generated/TaggingModule/TaggingModule";
import { Tag } from "../generated/schema";
import * as crypto from "crypto";

export async function handleTagSet(event: TagSet): void {
  const tagString = event.params.ipId + "-" + event.params.tag;
  let tagHash = crypto.createHash(tagString).digest("hex");

  let entity = new Tag(tagHash);

  entity.ipId = event.params.ipId;
  entity.tag = event.params.tag;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}

export function handleTagRemoved(event: TagRemoved): void {
  const tagString = event.params.ipId + "-" + event.params.tag;
  let tagHash = crypto.createHash(tagString).digest("hex");

  let entity = Tag.load(tagHash);
  if (entity == null) {
    return;
  }

  entity.deletedAt = event.block.number;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}
