import { IPAssetCreated as IPAssetCreatedEvent } from "../generated/EventEmitter/EventEmitter"
import { IPAssetRegistry } from "../generated/EventEmitter/IPAssetRegistry"
import { IPAsset, Transaction } from "../generated/schema"
import { log } from '@graphprotocol/graph-ts';

export function handleIPAssetCreated(event: IPAssetCreatedEvent): void {
  let entity = new IPAsset(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.franchiseId = event.params.franchiseId
  entity.ipAssetRegistry = event.params.ipAssetRegistry
  entity.ipAssetId = event.params.ipAssetId
  switch(event.params.ipAssetType) {
    case 0:
        entity.ipAssetType = "Unspecified" 
        break
    case 1:
        entity.ipAssetType = "Story"
        break
    case 2:
        entity.ipAssetType = "Character"
        break
    default:
        log.error("Invalid ip asset type: {}", [event.params.ipAssetType.toString()])
        entity.ipAssetType = "Unspecified"  
  }
  

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

  let transaction = new Transaction(event.transaction.hash.concatI32(event.logIndex.toI32()))
  transaction.owner = owner 
  transaction.franchiseId = event.params.franchiseId 
  transaction.resourceId = event.params.ipAssetId
  transaction.resourceType = "IpAsset" 

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()
}