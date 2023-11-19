import {
  LicenseActivated as LicenseActivatedEvent,
  LicenseNftBoundedToIpa as LicenseNftBoundedToIpaEvent,
  LicenseRegistered as LicenseRegisteredEvent,
  LicenseRevoked as LicenseRevokedEvent,
  Transfer as TransferEvent
} from "../generated/LicenseRegistry/LicenseRegistry"
import {
  LicenseActivated,
  LicenseNftBoundedToIpa,
  LicenseRegisterred,
  LicenseRevoked,
  LicenseTransferred
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

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
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