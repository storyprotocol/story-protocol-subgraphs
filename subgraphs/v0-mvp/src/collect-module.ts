import {
    Collected as CollectedEvent
} from "../generated/CollectModule/CollectModuleBase"
import {
    CollectNFTBase
} from "../generated/CollectModule/CollectNFTBase"
import {
  Collection, Transaction,
} from "../generated/schema"

export function handleCollected(
  event: CollectedEvent
): void {
  // Index the collect NFT
  let entity = new Collection(
    event.params.collectnft_
  )

  let contract = CollectNFTBase.bind(event.params.collectnft_)
  let totalSupply = contract.totalSupply()

  entity.franchiseId = event.params.franchiseid_
  entity.ipAssetId = event.params.ipassetid_
  entity.totalCollected = totalSupply

  entity.save()

  // Index the transaction
  let transaction = new Transaction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  transaction.owner = event.params.collector_
  transaction.franchiseId = event.params.franchiseid_
  transaction.resourceId = event.params.collectnftid_
  transaction.resourceType = "Collection" 

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()
}