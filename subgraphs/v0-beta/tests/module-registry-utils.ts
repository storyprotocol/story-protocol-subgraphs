import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ModuleAdded,
  ModuleRemoved
} from "../generated/ModuleRegistry/ModuleRegistry"

export function createModuleAddedEvent(
  name: string,
  module: Address
): ModuleAdded {
  let moduleAddedEvent = changetype<ModuleAdded>(newMockEvent())

  moduleAddedEvent.parameters = new Array()

  moduleAddedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  moduleAddedEvent.parameters.push(
    new ethereum.EventParam("module", ethereum.Value.fromAddress(module))
  )

  return moduleAddedEvent
}

export function createModuleRemovedEvent(
  name: string,
  module: Address
): ModuleRemoved {
  let moduleRemovedEvent = changetype<ModuleRemoved>(newMockEvent())

  moduleRemovedEvent.parameters = new Array()

  moduleRemovedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  moduleRemovedEvent.parameters.push(
    new ethereum.EventParam("module", ethereum.Value.fromAddress(module))
  )

  return moduleRemovedEvent
}
