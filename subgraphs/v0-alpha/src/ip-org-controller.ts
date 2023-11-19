import {
  IPOrgRegistered as IPOrgRegisteredEvent,
  IPOrgTransferred as IPOrgTransferredEvent,
} from "../generated/IPOrgController/IPOrgController"
import {
  IPOrgRegistered,
  IPOrgTransferred,
  Transaction,
} from "../generated/schema"

export function handleIPOrgRegistered(event: IPOrgRegisteredEvent): void {
  let entity = new IPOrgRegistered(
    event.params.ipAssetOrg_
  )
  entity.owner = event.params.owner_
  entity.ipOrgId = event.params.ipAssetOrg_
  entity.name = event.params.name_
  entity.symbol = event.params.symbol_
  entity.ipAssetTypes = new Array<string>() // Temporarily set to empty

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Index the transaction
  let transaction = new Transaction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  transaction.initiator = event.params.owner_ 
  transaction.ipOrgId = event.params.ipAssetOrg_
  transaction.resourceId = event.params.ipAssetOrg_.toHexString()
  transaction.resourceType = "IPOrg" 
  transaction.actionType = "Register"

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()
}

export function handleIPOrgTransferred(event: IPOrgTransferredEvent): void {
  let entity = new IPOrgTransferred(
    event.params.ipOrg_
  )
  entity.ipOrgId = event.params.ipOrg_
  entity.prevOwner = event.params.prevOwner_
  entity.newOwner = event.params.newOwner_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}