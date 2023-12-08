import {
  LicenseRegistered as LicenseRegisteredEvent,
} from "../generated/LicenseRegistry/LicenseRegistry"
import {
  LicenseRegisterred,
  Transaction,
} from "../generated/schema"

export function handleLicenseRegistered(event: LicenseRegisteredEvent): void {
  let entity = new LicenseRegisterred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.licenseId = event.params.id
  entity.derivativesAllowed = event.params.licenseData.derivativesAllowed
  entity.isReciprocal = event.params.licenseData.isReciprocal
  entity.derivativeNeedsApproval = event.params.licenseData.derivativeNeedsApproval
  entity.status = event.params.licenseData.status
  entity.licensor = event.params.licenseData.licensor
  entity.revoker = event.params.licenseData.revoker
  entity.ipOrgId = event.params.licenseData.ipOrg
  entity.ipAssetId = event.params.licenseData.ipaId
  entity.parentLicenseId = event.params.licenseData.parentLicenseId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Index the transaction
  let transaction = new Transaction(event.transaction.hash)
  transaction.initiator = event.transaction.from 
  transaction.ipOrgId = event.params.licenseData.ipOrg
  transaction.resourceId = event.params.id.toHexString()
  transaction.resourceType = "License" 
  transaction.actionType = "Register"

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()
}