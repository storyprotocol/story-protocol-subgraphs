import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  CreateLicense,
  ExecuteTerms,
  IPAssetWritten,
  Initialized,
  RevokeLicense,
  TermsUpdated,
  Transfer,
  TransferLicense
} from "../generated/IPAssetRegistry/IPAssetRegistry"

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

export function createCreateLicenseEvent(
  _licenseId: BigInt,
  _tokenId: BigInt,
  _parentLicenseId: BigInt,
  _licenseHolder: Address,
  _uri: string,
  _revoker: Address
): CreateLicense {
  let createLicenseEvent = changetype<CreateLicense>(newMockEvent())

  createLicenseEvent.parameters = new Array()

  createLicenseEvent.parameters.push(
    new ethereum.EventParam(
      "_licenseId",
      ethereum.Value.fromUnsignedBigInt(_licenseId)
    )
  )
  createLicenseEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  createLicenseEvent.parameters.push(
    new ethereum.EventParam(
      "_parentLicenseId",
      ethereum.Value.fromUnsignedBigInt(_parentLicenseId)
    )
  )
  createLicenseEvent.parameters.push(
    new ethereum.EventParam(
      "_licenseHolder",
      ethereum.Value.fromAddress(_licenseHolder)
    )
  )
  createLicenseEvent.parameters.push(
    new ethereum.EventParam("_uri", ethereum.Value.fromString(_uri))
  )
  createLicenseEvent.parameters.push(
    new ethereum.EventParam("_revoker", ethereum.Value.fromAddress(_revoker))
  )

  return createLicenseEvent
}

export function createExecuteTermsEvent(
  _licenseId: BigInt,
  _data: Bytes
): ExecuteTerms {
  let executeTermsEvent = changetype<ExecuteTerms>(newMockEvent())

  executeTermsEvent.parameters = new Array()

  executeTermsEvent.parameters.push(
    new ethereum.EventParam(
      "_licenseId",
      ethereum.Value.fromUnsignedBigInt(_licenseId)
    )
  )
  executeTermsEvent.parameters.push(
    new ethereum.EventParam("_data", ethereum.Value.fromBytes(_data))
  )

  return executeTermsEvent
}

export function createIPAssetWrittenEvent(
  IPAssetId: BigInt,
  blockType: i32,
  name: string,
  description: string,
  mediaUrl: string
): IPAssetWritten {
  let ipAssetWrittenEvent = changetype<IPAssetWritten>(newMockEvent())

  ipAssetWrittenEvent.parameters = new Array()

  ipAssetWrittenEvent.parameters.push(
    new ethereum.EventParam(
      "IPAssetId",
      ethereum.Value.fromUnsignedBigInt(IPAssetId)
    )
  )
  ipAssetWrittenEvent.parameters.push(
    new ethereum.EventParam(
      "blockType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(blockType))
    )
  )
  ipAssetWrittenEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  ipAssetWrittenEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  ipAssetWrittenEvent.parameters.push(
    new ethereum.EventParam("mediaUrl", ethereum.Value.fromString(mediaUrl))
  )

  return ipAssetWrittenEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createRevokeLicenseEvent(_licenseId: BigInt): RevokeLicense {
  let revokeLicenseEvent = changetype<RevokeLicense>(newMockEvent())

  revokeLicenseEvent.parameters = new Array()

  revokeLicenseEvent.parameters.push(
    new ethereum.EventParam(
      "_licenseId",
      ethereum.Value.fromUnsignedBigInt(_licenseId)
    )
  )

  return revokeLicenseEvent
}

export function createTermsUpdatedEvent(
  licenseId: BigInt,
  processor: Address,
  termsData: Bytes
): TermsUpdated {
  let termsUpdatedEvent = changetype<TermsUpdated>(newMockEvent())

  termsUpdatedEvent.parameters = new Array()

  termsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "licenseId",
      ethereum.Value.fromUnsignedBigInt(licenseId)
    )
  )
  termsUpdatedEvent.parameters.push(
    new ethereum.EventParam("processor", ethereum.Value.fromAddress(processor))
  )
  termsUpdatedEvent.parameters.push(
    new ethereum.EventParam("termsData", ethereum.Value.fromBytes(termsData))
  )

  return termsUpdatedEvent
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

export function createTransferLicenseEvent(
  _licenseId: BigInt,
  _licenseHolder: Address
): TransferLicense {
  let transferLicenseEvent = changetype<TransferLicense>(newMockEvent())

  transferLicenseEvent.parameters = new Array()

  transferLicenseEvent.parameters.push(
    new ethereum.EventParam(
      "_licenseId",
      ethereum.Value.fromUnsignedBigInt(_licenseId)
    )
  )
  transferLicenseEvent.parameters.push(
    new ethereum.EventParam(
      "_licenseHolder",
      ethereum.Value.fromAddress(_licenseHolder)
    )
  )

  return transferLicenseEvent
}
