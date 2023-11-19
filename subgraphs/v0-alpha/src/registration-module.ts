import {
  AccessControlUpdated as AccessControlUpdatedEvent,
  HooksCleared as HooksClearedEvent,
  HooksRegistered as HooksRegisteredEvent,
  IPAssetRegistered as IPAssetRegisteredEvent,
  IPAssetTransferred as IPAssetTransferredEvent,
  MetadataUpdated as MetadataUpdatedEvent,
  RequestCompleted as RequestCompletedEvent,
  RequestPending as RequestPendingEvent
} from "../generated/RegistrationModule/RegistrationModule"
import {
  AccessControlUpdated,
  HooksCleared,
  HooksRegistered,
  IPAssetRegistered,
  IPAssetTransferred,
  MetadataUpdated,
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

export function handleIPAssetRegistered(event: IPAssetRegisteredEvent): void {
  let entity = new IPAssetRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipAssetId_ = event.params.ipAssetId_
  entity.ipOrg_ = event.params.ipOrg_
  entity.ipOrgAssetId_ = event.params.ipOrgAssetId_
  entity.owner_ = event.params.owner_
  entity.name_ = event.params.name_
  entity.ipAssetType_ = event.params.ipAssetType_
  entity.hash_ = event.params.hash_
  entity.mediaUrl_ = event.params.mediaUrl_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPAssetTransferred(event: IPAssetTransferredEvent): void {
  let entity = new IPAssetTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipAssetId_ = event.params.ipAssetId_
  entity.ipOrg_ = event.params.ipOrg_
  entity.ipOrgAssetId_ = event.params.ipOrgAssetId_
  entity.prevOwner_ = event.params.prevOwner_
  entity.newOwner_ = event.params.newOwner_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataUpdated(event: MetadataUpdatedEvent): void {
  let entity = new MetadataUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipOrg_ = event.params.ipOrg_
  entity.baseURI_ = event.params.baseURI_
  entity.contractURI_ = event.params.contractURI_

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
