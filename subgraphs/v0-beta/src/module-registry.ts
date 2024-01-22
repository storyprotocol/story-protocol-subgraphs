import {
  ModuleAdded as ModuleAddedEvent,
  ModuleRemoved as ModuleRemovedEvent,
} from "../generated/ModuleRegistry/ModuleRegistry"
import { ModuleAdded, ModuleRemoved } from "../generated/schema"

export function handleModuleAdded(event: ModuleAddedEvent): void {
  let entity = new ModuleAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.name = event.params.name.toString()
  entity.module = event.params.module

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleRemoved(event: ModuleRemovedEvent): void {
  let entity = new ModuleRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.name = event.params.name.toString()
  entity.module = event.params.module

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
