import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  AccessControlUpdated,
  ModuleAdded,
  ModuleConfigured,
  ModuleExecuted,
  ModuleRemoved
} from "../generated/ModuleRegistry/ModuleRegistry"

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

export function createModuleAddedEvent(
  ipOrg: Address,
  moduleKey: string,
  module: Address
): ModuleAdded {
  let moduleAddedEvent = changetype<ModuleAdded>(newMockEvent())

  moduleAddedEvent.parameters = new Array()

  moduleAddedEvent.parameters.push(
    new ethereum.EventParam("ipOrg", ethereum.Value.fromAddress(ipOrg))
  )
  moduleAddedEvent.parameters.push(
    new ethereum.EventParam("moduleKey", ethereum.Value.fromString(moduleKey))
  )
  moduleAddedEvent.parameters.push(
    new ethereum.EventParam("module", ethereum.Value.fromAddress(module))
  )

  return moduleAddedEvent
}

export function createModuleConfiguredEvent(
  ipOrg: Address,
  moduleKey: string,
  caller: Address,
  params: Bytes
): ModuleConfigured {
  let moduleConfiguredEvent = changetype<ModuleConfigured>(newMockEvent())

  moduleConfiguredEvent.parameters = new Array()

  moduleConfiguredEvent.parameters.push(
    new ethereum.EventParam("ipOrg", ethereum.Value.fromAddress(ipOrg))
  )
  moduleConfiguredEvent.parameters.push(
    new ethereum.EventParam("moduleKey", ethereum.Value.fromString(moduleKey))
  )
  moduleConfiguredEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  moduleConfiguredEvent.parameters.push(
    new ethereum.EventParam("params", ethereum.Value.fromBytes(params))
  )

  return moduleConfiguredEvent
}

export function createModuleExecutedEvent(
  ipOrg: Address,
  moduleKey: string,
  caller: Address,
  selfParams: Bytes,
  preHookParams: Array<Bytes>,
  postHookParams: Array<Bytes>
): ModuleExecuted {
  let moduleExecutedEvent = changetype<ModuleExecuted>(newMockEvent())

  moduleExecutedEvent.parameters = new Array()

  moduleExecutedEvent.parameters.push(
    new ethereum.EventParam("ipOrg", ethereum.Value.fromAddress(ipOrg))
  )
  moduleExecutedEvent.parameters.push(
    new ethereum.EventParam("moduleKey", ethereum.Value.fromString(moduleKey))
  )
  moduleExecutedEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  moduleExecutedEvent.parameters.push(
    new ethereum.EventParam("selfParams", ethereum.Value.fromBytes(selfParams))
  )
  moduleExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "preHookParams",
      ethereum.Value.fromBytesArray(preHookParams)
    )
  )
  moduleExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "postHookParams",
      ethereum.Value.fromBytesArray(postHookParams)
    )
  )

  return moduleExecutedEvent
}

export function createModuleRemovedEvent(
  ipOrg: Address,
  moduleKey: string,
  module: Address
): ModuleRemoved {
  let moduleRemovedEvent = changetype<ModuleRemoved>(newMockEvent())

  moduleRemovedEvent.parameters = new Array()

  moduleRemovedEvent.parameters.push(
    new ethereum.EventParam("ipOrg", ethereum.Value.fromAddress(ipOrg))
  )
  moduleRemovedEvent.parameters.push(
    new ethereum.EventParam("moduleKey", ethereum.Value.fromString(moduleKey))
  )
  moduleRemovedEvent.parameters.push(
    new ethereum.EventParam("module", ethereum.Value.fromAddress(module))
  )

  return moduleRemovedEvent
}
