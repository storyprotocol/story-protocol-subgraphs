import {
  IPAssetRegistered as IPAssetRegisteredEvent,
  IPAssetTransferred as IPAssetTransferredEvent,
  MetadataUpdated as MetadataUpdatedEvent,
  RegistrationModule,
} from "../generated/RegistrationModule/RegistrationModule"
import {
  IPAssetRegistered,
  IPAssetTransferred,
  IPOrgRegistered,
  Transaction,
} from "../generated/schema"

export function handleIPAssetRegistered(event: IPAssetRegisteredEvent): void {
  let entity = new IPAssetRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipAssetId = event.params.ipAssetId
  entity.ipOrgId = event.params.ipOrg
  entity.ipOrgAssetId = event.params.ipOrgAssetId
  entity.owner = event.params.owner
  entity.name = event.params.name
  entity.ipAssetTypeIndex = event.params.ipOrgAssetType
  entity.contentHash = event.params.hash
  entity.mediaUrl = event.params.mediaUrl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let contract = RegistrationModule.bind(event.address)
  let ipAssetTypes = contract.getIpOrgAssetTypes(event.params.ipOrg)
  entity.ipAssetTypeValue = ipAssetTypes[event.params.ipOrgAssetType]

  entity.save()

  // Index the transaction
  let transaction = new Transaction(event.transaction.hash)
  transaction.initiator = event.params.owner 
  transaction.ipOrgId = event.params.ipOrg
  transaction.resourceId = event.params.ipAssetId.toString()
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
  entity.ipAssetId = event.params.ipAssetId
  entity.ipOrgId = event.params.ipOrg
  entity.ipOrgAssetId = event.params.ipOrgAssetId
  entity.prevOwner = event.params.prevOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataUpdated(event: MetadataUpdatedEvent): void {
  const ipOrgRecord = IPOrgRegistered.load(event.params.ipOrg)!
  ipOrgRecord.baseURI = event.params.baseURI
  ipOrgRecord.contractURI = event.params.contractURI
  ipOrgRecord.save()
}