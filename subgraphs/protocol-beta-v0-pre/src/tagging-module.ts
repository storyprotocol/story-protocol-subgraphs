import { TagSet, TagRemoved } from "../generated/TaggingModule/TaggingModule"
import { Tag } from "../generated/schema"

export function handleTagSet(
    event: TagSet
): void {
    let entity = new Tag(
        event.params.ipId.toString()
    )

    entity.tag = event.params.tag

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
    
    entity.save()
}
