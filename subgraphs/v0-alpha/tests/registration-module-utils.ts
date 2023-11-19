import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  AccessControlUpdated,
  HooksCleared,
  HooksRegistered,
  IPAssetRegistered,
  IPAssetTransferred,
  MetadataUpdated,
  RequestCompleted,
  RequestPending
} from "../generated/RegistrationModule/RegistrationModule"

export function createAccessControlUpdatedEvent(
  accessControl: Address
): AccessControlUpdated {
  let accessControlUpdatedEvent = changetype<AccessControlUpdated>(
    newMockEvent()
  )

  accessControlUpdatedEvent.parameters = new Array()

  accessControlUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "accessControl",
      ethereum.Value.fromAddress(accessControl)
    )
  )

  return accessControlUpdatedEvent
}

export function createHooksClearedEvent(
  hType: i32,
  registryKey: Bytes
): HooksCleared {
  let hooksClearedEvent = changetype<HooksCleared>(newMockEvent())

  hooksClearedEvent.parameters = new Array()

  hooksClearedEvent.parameters.push(
    new ethereum.EventParam(
      "hType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(hType))
    )
  )
  hooksClearedEvent.parameters.push(
    new ethereum.EventParam(
      "registryKey",
      ethereum.Value.fromFixedBytes(registryKey)
    )
  )

  return hooksClearedEvent
}

export function createHooksRegisteredEvent(
  hType: i32,
  registryKey: Bytes,
  hook: Array<Address>
): HooksRegistered {
  let hooksRegisteredEvent = changetype<HooksRegistered>(newMockEvent())

  hooksRegisteredEvent.parameters = new Array()

  hooksRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "hType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(hType))
    )
  )
  hooksRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "registryKey",
      ethereum.Value.fromFixedBytes(registryKey)
    )
  )
  hooksRegisteredEvent.parameters.push(
    new ethereum.EventParam("hook", ethereum.Value.fromAddressArray(hook))
  )

  return hooksRegisteredEvent
}

export function createIPAssetRegisteredEvent(
  ipAssetId_: BigInt,
  ipOrg_: Address,
  ipOrgAssetId_: BigInt,
  owner_: Address,
  name_: string,
  ipAssetType_: BigInt,
  hash_: Bytes,
  mediaUrl_: string
): IPAssetRegistered {
  let ipAssetRegisteredEvent = changetype<IPAssetRegistered>(newMockEvent())

  ipAssetRegisteredEvent.parameters = new Array()

  ipAssetRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "ipAssetId_",
      ethereum.Value.fromUnsignedBigInt(ipAssetId_)
    )
  )
  ipAssetRegisteredEvent.parameters.push(
    new ethereum.EventParam("ipOrg_", ethereum.Value.fromAddress(ipOrg_))
  )
  ipAssetRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "ipOrgAssetId_",
      ethereum.Value.fromUnsignedBigInt(ipOrgAssetId_)
    )
  )
  ipAssetRegisteredEvent.parameters.push(
    new ethereum.EventParam("owner_", ethereum.Value.fromAddress(owner_))
  )
  ipAssetRegisteredEvent.parameters.push(
    new ethereum.EventParam("name_", ethereum.Value.fromString(name_))
  )
  ipAssetRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "ipAssetType_",
      ethereum.Value.fromUnsignedBigInt(ipAssetType_)
    )
  )
  ipAssetRegisteredEvent.parameters.push(
    new ethereum.EventParam("hash_", ethereum.Value.fromFixedBytes(hash_))
  )
  ipAssetRegisteredEvent.parameters.push(
    new ethereum.EventParam("mediaUrl_", ethereum.Value.fromString(mediaUrl_))
  )

  return ipAssetRegisteredEvent
}

export function createIPAssetTransferredEvent(
  ipAssetId_: BigInt,
  ipOrg_: Address,
  ipOrgAssetId_: BigInt,
  prevOwner_: Address,
  newOwner_: Address
): IPAssetTransferred {
  let ipAssetTransferredEvent = changetype<IPAssetTransferred>(newMockEvent())

  ipAssetTransferredEvent.parameters = new Array()

  ipAssetTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "ipAssetId_",
      ethereum.Value.fromUnsignedBigInt(ipAssetId_)
    )
  )
  ipAssetTransferredEvent.parameters.push(
    new ethereum.EventParam("ipOrg_", ethereum.Value.fromAddress(ipOrg_))
  )
  ipAssetTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "ipOrgAssetId_",
      ethereum.Value.fromUnsignedBigInt(ipOrgAssetId_)
    )
  )
  ipAssetTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "prevOwner_",
      ethereum.Value.fromAddress(prevOwner_)
    )
  )
  ipAssetTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner_", ethereum.Value.fromAddress(newOwner_))
  )

  return ipAssetTransferredEvent
}

export function createMetadataUpdatedEvent(
  ipOrg_: Address,
  baseURI_: string,
  contractURI_: string
): MetadataUpdated {
  let metadataUpdatedEvent = changetype<MetadataUpdated>(newMockEvent())

  metadataUpdatedEvent.parameters = new Array()

  metadataUpdatedEvent.parameters.push(
    new ethereum.EventParam("ipOrg_", ethereum.Value.fromAddress(ipOrg_))
  )
  metadataUpdatedEvent.parameters.push(
    new ethereum.EventParam("baseURI_", ethereum.Value.fromString(baseURI_))
  )
  metadataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "contractURI_",
      ethereum.Value.fromString(contractURI_)
    )
  )

  return metadataUpdatedEvent
}

export function createRequestCompletedEvent(sender: Address): RequestCompleted {
  let requestCompletedEvent = changetype<RequestCompleted>(newMockEvent())

  requestCompletedEvent.parameters = new Array()

  requestCompletedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return requestCompletedEvent
}

export function createRequestPendingEvent(sender: Address): RequestPending {
  let requestPendingEvent = changetype<RequestPending>(newMockEvent())

  requestPendingEvent.parameters = new Array()

  requestPendingEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return requestPendingEvent
}
