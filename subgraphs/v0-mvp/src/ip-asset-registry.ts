import {
  CreateLicense as CreateLicenseEvent,
  IPAssetRegistry,
} from "../generated/templates/IPAssetRegistry/IPAssetRegistry"
import {
  License,
  Transaction,
} from "../generated/schema"

export function handleCreateLicense(event: CreateLicenseEvent): void {
  let entity = new License(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  let contract = IPAssetRegistry.bind(event.address)
  let franchiseId = contract.franchiseId()

  entity.licenseId = event.params._licenseId
  entity.ipAssetId = event.params._tokenId
  entity.franchiseId = franchiseId
  entity.parentLicenseId = event.params._parentLicenseId
  entity.licenseOwner = event.params._licenseHolder
  entity.uri = event.params._uri
  entity.revoker = event.params._revoker

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let transaction = new Transaction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  transaction.owner = event.params._licenseHolder
  transaction.franchiseId = franchiseId 
  transaction.resourceId = event.params._licenseId
  transaction.resourceType = "License" 

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()
}


