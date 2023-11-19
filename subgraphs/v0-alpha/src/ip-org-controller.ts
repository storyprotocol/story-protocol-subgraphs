import {
  IPOrgRegistered as IPOrgRegisteredEvent,
  IPOrgTransferred as IPOrgTransferredEvent,
} from "../generated/IPOrgController/IPOrgController"
import {
  IPOrgRegistered,
  IPOrgTransferred,
} from "../generated/schema"

export function handleIPOrgRegistered(event: IPOrgRegisteredEvent): void {
  let entity = new IPOrgRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner_ = event.params.owner_
  entity.ipAssetOrg_ = event.params.ipAssetOrg_
  entity.name_ = event.params.name_
  entity.symbol_ = event.params.symbol_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPOrgTransferred(event: IPOrgTransferredEvent): void {
  let entity = new IPOrgTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipOrg_ = event.params.ipOrg_
  entity.prevOwner_ = event.params.prevOwner_
  entity.newOwner_ = event.params.newOwner_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}