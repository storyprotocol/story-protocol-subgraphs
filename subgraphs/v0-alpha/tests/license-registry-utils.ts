import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  LicenseActivated,
  LicenseNftBoundedToIpa,
  LicenseRegistered,
  LicenseRevoked,
  Transfer
} from "../generated/LicenseRegistry/LicenseRegistry"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createLicenseActivatedEvent(
  licenseId: BigInt
): LicenseActivated {
  let licenseActivatedEvent = changetype<LicenseActivated>(newMockEvent())

  licenseActivatedEvent.parameters = new Array()

  licenseActivatedEvent.parameters.push(
    new ethereum.EventParam(
      "licenseId",
      ethereum.Value.fromUnsignedBigInt(licenseId)
    )
  )

  return licenseActivatedEvent
}

export function createLicenseNftBoundedToIpaEvent(
  licenseId: BigInt,
  ipaId: BigInt
): LicenseNftBoundedToIpa {
  let licenseNftBoundedToIpaEvent = changetype<LicenseNftBoundedToIpa>(
    newMockEvent()
  )

  licenseNftBoundedToIpaEvent.parameters = new Array()

  licenseNftBoundedToIpaEvent.parameters.push(
    new ethereum.EventParam(
      "licenseId",
      ethereum.Value.fromUnsignedBigInt(licenseId)
    )
  )
  licenseNftBoundedToIpaEvent.parameters.push(
    new ethereum.EventParam("ipaId", ethereum.Value.fromUnsignedBigInt(ipaId))
  )

  return licenseNftBoundedToIpaEvent
}

export function createLicenseRegisteredEvent(id: BigInt): LicenseRegistered {
  let licenseRegisteredEvent = changetype<LicenseRegistered>(newMockEvent())

  licenseRegisteredEvent.parameters = new Array()

  licenseRegisteredEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return licenseRegisteredEvent
}

export function createLicenseRevokedEvent(licenseId: BigInt): LicenseRevoked {
  let licenseRevokedEvent = changetype<LicenseRevoked>(newMockEvent())

  licenseRevokedEvent.parameters = new Array()

  licenseRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "licenseId",
      ethereum.Value.fromUnsignedBigInt(licenseId)
    )
  )

  return licenseRevokedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
