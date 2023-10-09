import {
  FranchiseRegistered as FranchiseRegisteredEvent,
} from "../generated/FranchiseRegistry/FranchiseRegistry"
import {
  FranchiseRegistered,
} from "../generated/schema"

export function handleFranchiseRegistered(
  event: FranchiseRegisteredEvent
): void {
  let entity = new FranchiseRegistered(
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
}