import {
  IPAccountSet as IPAccountSetEvent,
  IPRegistered as IPRegisteredEvent,
  IPResolverSet as IPResolverSetEvent,
} from "../generated/IPRecordRegistry/IPRecordRegistry"
import { IPAccountSet, IPRegistered, IPResolverSet } from "../generated/schema"

export function handleIPAccountSet(event: IPAccountSetEvent): void {
  let entity = new IPAccountSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.ipId = event.params.ipId
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPRegistered(event: IPRegisteredEvent): void {
  let entity = new IPRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.ipId = event.params.ipId
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId
  entity.resolver = event.params.resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPResolverSet(event: IPResolverSetEvent): void {
  let entity = new IPResolverSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.ipId = event.params.ipId
  entity.resolver = event.params.resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
