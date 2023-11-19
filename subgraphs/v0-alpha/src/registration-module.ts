import {
  IPAssetRegistered as IPAssetRegisteredEvent,
  IPAssetTransferred as IPAssetTransferredEvent,
  MetadataUpdated as MetadataUpdatedEvent,
} from "../generated/RegistrationModule/RegistrationModule"
import {
  IPAssetRegistered,
  IPAssetTransferred,
  MetadataUpdated,
} from "../generated/schema"

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