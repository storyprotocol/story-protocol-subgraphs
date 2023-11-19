import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  AccessControlUpdated,
  HooksCleared,
  HooksRegistered,
  RelationshipCreated,
  RelationshipTypeSet,
  RelationshipTypeUnset,
  RequestCompleted,
  RequestPending
} from "../generated/RelationshipModule/RelationshipModule"

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

export function createRelationshipCreatedEvent(
  relationshipId: BigInt,
  relType: string,
  srcAddress: Address,
  srcId: BigInt,
  dstAddress: Address,
  dstId: BigInt
): RelationshipCreated {
  let relationshipCreatedEvent = changetype<RelationshipCreated>(newMockEvent())

  relationshipCreatedEvent.parameters = new Array()

  relationshipCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "relationshipId",
      ethereum.Value.fromUnsignedBigInt(relationshipId)
    )
  )
  relationshipCreatedEvent.parameters.push(
    new ethereum.EventParam("relType", ethereum.Value.fromString(relType))
  )
  relationshipCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "srcAddress",
      ethereum.Value.fromAddress(srcAddress)
    )
  )
  relationshipCreatedEvent.parameters.push(
    new ethereum.EventParam("srcId", ethereum.Value.fromUnsignedBigInt(srcId))
  )
  relationshipCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "dstAddress",
      ethereum.Value.fromAddress(dstAddress)
    )
  )
  relationshipCreatedEvent.parameters.push(
    new ethereum.EventParam("dstId", ethereum.Value.fromUnsignedBigInt(dstId))
  )

  return relationshipCreatedEvent
}

export function createRelationshipTypeSetEvent(
  relType: string,
  ipOrg: Address,
  src: Address,
  srcRelatable: i32,
  srcSubtypesMask: BigInt,
  dst: Address,
  dstRelatable: i32,
  dstSubtypesMask: BigInt
): RelationshipTypeSet {
  let relationshipTypeSetEvent = changetype<RelationshipTypeSet>(newMockEvent())

  relationshipTypeSetEvent.parameters = new Array()

  relationshipTypeSetEvent.parameters.push(
    new ethereum.EventParam("relType", ethereum.Value.fromString(relType))
  )
  relationshipTypeSetEvent.parameters.push(
    new ethereum.EventParam("ipOrg", ethereum.Value.fromAddress(ipOrg))
  )
  relationshipTypeSetEvent.parameters.push(
    new ethereum.EventParam("src", ethereum.Value.fromAddress(src))
  )
  relationshipTypeSetEvent.parameters.push(
    new ethereum.EventParam(
      "srcRelatable",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(srcRelatable))
    )
  )
  relationshipTypeSetEvent.parameters.push(
    new ethereum.EventParam(
      "srcSubtypesMask",
      ethereum.Value.fromUnsignedBigInt(srcSubtypesMask)
    )
  )
  relationshipTypeSetEvent.parameters.push(
    new ethereum.EventParam("dst", ethereum.Value.fromAddress(dst))
  )
  relationshipTypeSetEvent.parameters.push(
    new ethereum.EventParam(
      "dstRelatable",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(dstRelatable))
    )
  )
  relationshipTypeSetEvent.parameters.push(
    new ethereum.EventParam(
      "dstSubtypesMask",
      ethereum.Value.fromUnsignedBigInt(dstSubtypesMask)
    )
  )

  return relationshipTypeSetEvent
}

export function createRelationshipTypeUnsetEvent(
  relType: string,
  ipOrg: Address
): RelationshipTypeUnset {
  let relationshipTypeUnsetEvent = changetype<RelationshipTypeUnset>(
    newMockEvent()
  )

  relationshipTypeUnsetEvent.parameters = new Array()

  relationshipTypeUnsetEvent.parameters.push(
    new ethereum.EventParam("relType", ethereum.Value.fromString(relType))
  )
  relationshipTypeUnsetEvent.parameters.push(
    new ethereum.EventParam("ipOrg", ethereum.Value.fromAddress(ipOrg))
  )

  return relationshipTypeUnsetEvent
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
