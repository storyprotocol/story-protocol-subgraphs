import {
  ModuleAdded as ModuleAddedEvent,
  ModuleConfigured as ModuleConfiguredEvent,
  ModuleExecuted as ModuleExecutedEvent,
  ModuleRemoved as ModuleRemovedEvent
} from "../generated/ModuleRegistry/ModuleRegistry"
import {
  ModuleRegisterred,
  ModuleConfigured,
  ModuleExecuted,
  ModuleRemoved
} from "../generated/schema"

export function handleModuleAdded(event: ModuleAddedEvent): void {
  const id = event.params.ipOrg.toHexString() + ":" + event.params.moduleKey
  let entity = new ModuleRegisterred(id)
  entity.ipOrgId = event.params.ipOrg
  entity.moduleKey = event.params.moduleKey
  entity.moduleId = event.params.module

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleConfigured(event: ModuleConfiguredEvent): void {
  let entity = new ModuleConfigured(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipOrgId = event.params.ipOrg
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
  entity.ipOrgId = event.params.ipOrg
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
  entity.ipOrgId = event.params.ipOrg
  entity.moduleKey = event.params.moduleKey
  entity.moduleId = event.params.module

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}