import { Bytes } from "@graphprotocol/graph-ts"
import {
  LicenseActivated as LicenseActivatedEvent,
  LicenseNftBoundedToIpa as LicenseNftBoundedToIpaEvent,
  LicenseRegistered as LicenseRegisteredEvent,
  LicenseRevoked as LicenseRevokedEvent,
  Transfer as TransferEvent,
  LicenseRegistry,
} from "../generated/LicenseRegistry/LicenseRegistry"
import {
  LicenseActivated,
  LicenseNftBoundedToIpa,
  LicenseRegisterred,
  LicenseRevoked,
  LicenseTransferred,
  Transaction,
} from "../generated/schema"

export function handleLicenseActivated(event: LicenseActivatedEvent): void {
  let entity = new LicenseActivated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.licenseId = event.params.licenseId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLicenseNftBoundedToIpa(
  event: LicenseNftBoundedToIpaEvent
): void {
  let entity = new LicenseNftBoundedToIpa(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.licenseId = event.params.licenseId
  entity.ipAssetId = event.params.ipaId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLicenseRegistered(event: LicenseRegisteredEvent): void {
  let entity = new LicenseRegisterred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.licenseId = event.params.id

  let contract = LicenseRegistry.bind(event.address)
  let licenseData = contract.getLicense(event.params.id)

  entity.isCommercial = licenseData.isCommercial
  entity.status = licenseData.status
  entity.licensor = licenseData.licensor
  entity.revoker = licenseData.revoker
  entity.ipOrgId = licenseData.ipOrg
  entity.licenseeType = licenseData.licenseeType
  entity.ipAssetId = licenseData.ipaId
  entity.parentLicenseId = licenseData.parentLicenseId
  entity.termIds = licenseData.termIds
  entity.termsData = licenseData.termsData

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Index the transaction
  let transaction = new Transaction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  transaction.initiator = event.transaction.from 
  transaction.ipOrgId = new Bytes(0) 
  transaction.resourceId = event.params.id.toString()
  transaction.resourceType = "License" 
  transaction.actionType = "Register"

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()
}

export function handleLicenseRevoked(event: LicenseRevokedEvent): void {
  let entity = new LicenseRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.licenseId = event.params.licenseId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new LicenseTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}