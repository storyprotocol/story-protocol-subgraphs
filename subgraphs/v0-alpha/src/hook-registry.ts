import {
    HooksRegistered as HooksRegisteredEvent,
  } from "../generated/templates/HookRegistry/HookRegistry"
  import {
    Transaction,
    HookRegistered, 
  } from "../generated/schema"
import { Bytes } from "@graphprotocol/graph-ts"
  
  export function handleHooksRegistered(event: HooksRegisteredEvent): void {
    const hooks = event.params.hook
    for (let i = 0; i < hooks.length; i++) {
        let entity = new HookRegistered(hooks[i])
        entity.moduleId = event.address
        entity.registryKey = event.params.registryKey
        entity.type = event.params.hType
        entity.save()

        let transaction = new Transaction(event.transaction.hash.concatI32(event.logIndex.toI32()))
        transaction.initiator = event.transaction.from
        transaction.ipOrgId = new Bytes(0) 
        transaction.resourceId = hooks[i].toHexString() 
        transaction.resourceType = "Hook" 
        transaction.actionType = "Register"
  
        transaction.blockNumber = event.block.number
        transaction.blockTimestamp = event.block.timestamp
        transaction.transactionHash = event.transaction.hash
        transaction.save()
    }
  }