import {
  ModuleAdded as ModuleAddedEvent,
  ModuleRemoved as ModuleRemovedEvent,
} from "../generated/ModuleRegistry/ModuleRegistry"
import { ModuleAdded, ModuleRemoved, Module } from "../generated/schema"

export function handleModuleAdded(event: ModuleAddedEvent): void {

  let entity2 = new Module(
      event.params.name.toString(),
  )
  entity2.name = event.params.name.toString()
  entity2.module = event.params.module

  entity2.blockNumber = event.block.number
  entity2.blockTimestamp = event.block.timestamp
  entity2.transactionHash = event.transaction.hash

  entity2.save()
}

export function handleModuleRemoved(event: ModuleRemovedEvent): void {
  let entity2 = Module.load(event.params.name.toString())
  if (entity2 == null) {
    return
  }
  entity2.deletedAt = event.block.number
  entity2.save()
}
