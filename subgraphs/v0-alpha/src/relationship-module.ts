import {
  AccessControlUpdated as AccessControlUpdatedEvent,
  HooksCleared as HooksClearedEvent,
  HooksRegistered as HooksRegisteredEvent,
  RelationshipCreated as RelationshipCreatedEvent,
  RelationshipTypeSet as RelationshipTypeSetEvent,
  RelationshipTypeUnset as RelationshipTypeUnsetEvent,
  RequestCompleted as RequestCompletedEvent,
  RequestPending as RequestPendingEvent
} from "../generated/RelationshipModule/RelationshipModule"
import {
  AccessControlUpdated,
  HooksCleared,
  HooksRegistered,
  RelationshipCreated,
  RelationshipTypeSet,
  RelationshipTypeUnset,
  RequestCompleted,
  RequestPending
} from "../generated/schema"
import { Bytes } from '@graphprotocol/graph-ts'

export function handleAccessControlUpdated(
  event: AccessControlUpdatedEvent
): void {
  let entity = new AccessControlUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accessControl = event.params.accessControl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleHooksCleared(event: HooksClearedEvent): void {
  let entity = new HooksCleared(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.hType = event.params.hType
  entity.registryKey = event.params.registryKey

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleHooksRegistered(event: HooksRegisteredEvent): void {
  let entity = new HooksRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.hType = event.params.hType
  entity.registryKey = event.params.registryKey
  entity.hook = event.params.hook.map<Bytes>((address) => Bytes.fromHexString(address.toHexString()))

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

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

export function handleRequestCompleted(event: RequestCompletedEvent): void {
  let entity = new RequestCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequestPending(event: RequestPendingEvent): void {
  let entity = new RequestPending(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
