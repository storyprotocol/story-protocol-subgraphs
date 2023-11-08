import {
  FranchiseRegistered as FranchiseRegisteredEvent,
} from "../generated/FranchiseRegistry/FranchiseRegistry"
import {
  Franchise, Transaction,
} from "../generated/schema"
import { IPAssetRegistry } from "../generated/templates"

export function handleFranchiseRegistered(
  event: FranchiseRegisteredEvent
): void {
  // Index the franchise
  let entity = new Franchise(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.franchiseId = event.params.id
  entity.ipAssetRegistry = event.params.ipAssetRegistryForId
  entity.name = event.params.name
  entity.symbol = event.params.symbol
  entity.tokenURI = event.params.tokenURI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Index the transaction
  let transaction = new Transaction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  transaction.owner = event.params.owner
  transaction.franchiseId = event.params.id
  transaction.resourceId = event.params.id
  transaction.resourceType = "Franchise" 

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()

  // Index the IP Asset Registry
  IPAssetRegistry.create(event.params.ipAssetRegistryForId)
}