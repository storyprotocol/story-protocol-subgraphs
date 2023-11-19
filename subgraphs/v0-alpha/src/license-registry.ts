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
  LicenseRegistered,
  LicenseRevoked,
  Transfer
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
  entity.ipaId = event.params.ipaId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLicenseRegistered(event: LicenseRegisteredEvent): void {
  let entity = new LicenseRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.LicenseRegistry_id = event.params.id

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
  let entity = new Transfer(
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