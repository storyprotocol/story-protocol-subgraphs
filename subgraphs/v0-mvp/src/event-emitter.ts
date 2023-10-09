import { IPAssetCreated as IPAssetCreatedEvent } from "../generated/EventEmitter/EventEmitter"
import { IPAssetRegistry } from "../generated/EventEmitter/IPAssetRegistry"
import { IPAssetCreated } from "../generated/schema"

export function handleIPAssetCreated(event: IPAssetCreatedEvent): void {
  let entity = new IPAssetCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.franchiseId = event.params.franchiseId
  entity.ipAssetRegistry = event.params.ipAssetRegistry
  entity.ipAssetId = event.params.ipAssetId
  entity.ipAssetType = event.params.ipAssetType

  let contract = IPAssetRegistry.bind(event.params.ipAssetRegistry)
  let ipAssetData = contract.readIPAsset(event.params.ipAssetId)
  let owner = contract.ownerOf(event.params.ipAssetId)

  entity.owner = owner
  entity.name = ipAssetData.name
  entity.description = ipAssetData.description
  entity.mediaUrl = ipAssetData.mediaUrl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}