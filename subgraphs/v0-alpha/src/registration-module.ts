import {
  IPAssetRegistered as IPAssetRegisteredEvent,
  IPAssetTransferred as IPAssetTransferredEvent,
  MetadataUpdated as MetadataUpdatedEvent,
} from "../generated/RegistrationModule/RegistrationModule"
import {
  IPAssetRegistered,
  IPAssetTransferred,
  IPOrgRegistered,
  MetadataUpdated,
  Transaction,
} from "../generated/schema"

export function handleIPAssetRegistered(event: IPAssetRegisteredEvent): void {
  let entity = new IPAssetRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipAssetId = event.params.ipAssetId_
  entity.ipOrgId = event.params.ipOrg_
  entity.ipOrgAssetId = event.params.ipOrgAssetId_
  entity.owner = event.params.owner_
  entity.name = event.params.name_
  entity.ipAssetType = event.params.ipAssetType_
  entity.contentHash = event.params.hash_
  entity.mediaUrl = event.params.mediaUrl_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Index the transaction
  let transaction = new Transaction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  transaction.initiator = event.params.owner_ 
  transaction.ipOrgId = event.params.ipOrg_
  transaction.resourceId = event.params.ipAssetId_.toString()
  transaction.resourceType = "IPAsset" 
  transaction.actionType = "Register"

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()
}

export function handleIPAssetTransferred(event: IPAssetTransferredEvent): void {
  let entity = new IPAssetTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipAssetId = event.params.ipAssetId_
  entity.ipOrgId = event.params.ipOrg_
  entity.ipOrgAssetId = event.params.ipOrgAssetId_
  entity.prevOwner = event.params.prevOwner_
  entity.newOwner = event.params.newOwner_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataUpdated(event: MetadataUpdatedEvent): void {
  const ipOrgRecord = IPOrgRegistered.load(event.params.ipOrg_)!
  ipOrgRecord.baseURI = event.params.baseURI_
  ipOrgRecord.contractURI = event.params.contractURI_
  ipOrgRecord.save()
}