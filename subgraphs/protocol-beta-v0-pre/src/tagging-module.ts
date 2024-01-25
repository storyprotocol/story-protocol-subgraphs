import { TagSet, TagRemoved } from "../generated/TaggingModule/TaggingModule"
import { Tag } from "../generated/schema"

export function handleTagSet(
    event: TagSet
): void {
    let entity = new Tag(
        event.params.ipId.toString()
    )

    entity.ipId = event.params.ipId
    entity.tag = event.params.tag
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    entity.save()
}

export function handleTagRemoved(
    event: TagRemoved
): void {
    let entity = Tag.load(event.params.ipId.toString())
    if (entity == null) {
        return
    }

    entity.deletedAt = event.block.number
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    entity.save()
}
