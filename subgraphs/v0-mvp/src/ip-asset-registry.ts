import {
  CreateLicense as CreateLicenseEvent,
} from "../generated/IPAssetRegistry/IPAssetRegistry"
import {
  CreateLicense,
} from "../generated/schema"

export function handleCreateLicense(event: CreateLicenseEvent): void {
  let entity = new CreateLicense(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.licenseId = event.params._licenseId
  entity.ipAssetId = event.params._tokenId
  entity.parentLicenseId = event.params._parentLicenseId
  entity.licenseOwner = event.params._licenseHolder
  entity.uri = event.params._uri
  entity.revoker = event.params._revoker

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}


