import {
  ModuleAdded as ModuleAddedEvent,
  ModuleRemoved as ModuleRemovedEvent,
} from "../generated/ModuleRegistry/ModuleRegistry"
import { Module, Transaction } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts"
export function handleModuleAdded(event: ModuleAddedEvent): void {

  let entity2 = new Module(
      event.params.module,
  )

  entity2.name = event.params.name
  entity2.module = event.params.module
  entity2.moduleType = event.params.moduleType
  entity2.moduleTypeInterfaceId = event.params.moduleTypeInterfaceId

  entity2.blockNumber = event.block.number
  entity2.blockTimestamp = event.block.timestamp
  entity2.transactionHash = event.transaction.hash

  entity2.save()

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = new Bytes(0)
  trx.resourceId = event.address
  trx.actionType = "Create"
  trx.resourceType = "Module"
  trx.blockNumber = event.block.number;
  trx.blockTimestamp = event.block.timestamp;

  trx.save()
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

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = new Bytes(0)
  trx.resourceId = event.address
  trx.actionType = "Remove"
  trx.resourceType = "Module"
  trx.blockNumber = event.block.number;
  trx.blockTimestamp = event.block.timestamp;

  trx.save()
}
