import {
  RelationshipCreated as RelationshipCreatedEvent,
  RelationshipTypeSet as RelationshipTypeSetEvent,
  RelationshipTypeUnset as RelationshipTypeUnsetEvent,
} from "../generated/RelationshipModule/RelationshipModule"
import {
  RelationshipCreated,
  RelationshipTypeSet,
  RelationshipTypeUnset,
} from "../generated/schema"

export function handleRelationshipCreated(
  event: RelationshipCreatedEvent
): void {
  let entity = new RelationshipCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.relationshipId = event.params.relationshipId
  entity.relType = event.params.relType
  entity.srcAddress = event.params.srcAddress
  entity.srcId = event.params.srcId
  entity.dstAddress = event.params.dstAddress
  entity.dstId = event.params.dstId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelationshipTypeSet(
  event: RelationshipTypeSetEvent
): void {
  let entity = new RelationshipTypeSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.relType = event.params.relType
  entity.ipOrg = event.params.ipOrg
  entity.src = event.params.src
  entity.srcRelatable = event.params.srcRelatable
  entity.srcSubtypesMask = event.params.srcSubtypesMask
  entity.dst = event.params.dst
  entity.dstRelatable = event.params.dstRelatable
  entity.dstSubtypesMask = event.params.dstSubtypesMask

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelationshipTypeUnset(
  event: RelationshipTypeUnsetEvent
): void {
  let entity = new RelationshipTypeUnset(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.relType = event.params.relType
  entity.ipOrg = event.params.ipOrg

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}