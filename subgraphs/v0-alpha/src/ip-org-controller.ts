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
    event.params.ipAssetOrg
  )
  entity.owner = event.params.owner
  entity.ipOrgId = event.params.ipAssetOrg
  entity.name = event.params.name
  entity.symbol = event.params.symbol
  entity.ipAssetTypes = event.params.ipAssetTypes 

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Index the transaction
  let transaction = new Transaction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  transaction.initiator = event.params.owner
  transaction.ipOrgId = event.params.ipAssetOrg
  transaction.resourceId = event.params.ipAssetOrg.toHexString()
  transaction.resourceType = "IPOrg" 
  transaction.actionType = "Register"

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()
}

export function handleIPOrgTransferred(event: IPOrgTransferredEvent): void {
  let entity = new IPOrgTransferred(
    event.params.ipOrg
  )
  entity.ipOrgId = event.params.ipOrg
  entity.prevOwner = event.params.prevOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}