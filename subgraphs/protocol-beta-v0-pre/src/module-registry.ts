import {
  ModuleAdded as ModuleAddedEvent,
  ModuleRemoved as ModuleRemovedEvent,
} from "../generated/ModuleRegistry/ModuleRegistry"
import { Module } from "../generated/schema"

export function handleModuleAdded(event: ModuleAddedEvent): void {

  let entity2 = new Module(
      event.params.module,
  )
  entity2.name = event.params.name
  entity2.module = event.params.module

  entity2.blockNumber = event.block.number
  entity2.blockTimestamp = event.block.timestamp
  entity2.transactionHash = event.transaction.hash

  entity2.save()
}

export function handleModuleRemoved(event: ModuleRemovedEvent): void {
  let entity = Module.load(event.params.module)
  if (entity == null) {
    return
  }
  entity.deletedAt = event.block.number
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.save()
}
