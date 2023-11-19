import {
  AccessControlUpdated as AccessControlUpdatedEvent,
  ModuleAdded as ModuleAddedEvent,
  ModuleConfigured as ModuleConfiguredEvent,
  ModuleExecuted as ModuleExecutedEvent,
  ModuleRemoved as ModuleRemovedEvent
} from "../generated/ModuleRegistry/ModuleRegistry"
import {
  AccessControlUpdated,
  ModuleAdded,
  ModuleConfigured,
  ModuleExecuted,
  ModuleRemoved
} from "../generated/schema"

export function handleAccessControlUpdated(
  event: AccessControlUpdatedEvent
): void {
  let entity = new AccessControlUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accessControl = event.params.accessControl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleAdded(event: ModuleAddedEvent): void {
  let entity = new ModuleAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipOrg = event.params.ipOrg
  entity.moduleKey = event.params.moduleKey
  entity.module = event.params.module

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleConfigured(event: ModuleConfiguredEvent): void {
  let entity = new ModuleConfigured(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipOrg = event.params.ipOrg
  entity.moduleKey = event.params.moduleKey
  entity.caller = event.params.caller
  entity.params = event.params.params

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleExecuted(event: ModuleExecutedEvent): void {
  let entity = new ModuleExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipOrg = event.params.ipOrg
  entity.moduleKey = event.params.moduleKey
  entity.caller = event.params.caller
  entity.selfParams = event.params.selfParams
  entity.preHookParams = event.params.preHookParams
  entity.postHookParams = event.params.postHookParams

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleRemoved(event: ModuleRemovedEvent): void {
  let entity = new ModuleRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipOrg = event.params.ipOrg
  entity.moduleKey = event.params.moduleKey
  entity.module = event.params.module

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
