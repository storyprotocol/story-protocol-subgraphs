import { IPRegistered, IPResolverSet } from "../generated/IPRecordRegistry/IPRecordRegistry"
import { IPRecord } from "../generated/schema"

export function handleIPRegistered(
    event: IPRegistered
): void {
  let entity = new IPRecord(
      event.params.ipId
  )

  entity.ipId = event.params.ipId
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId
  entity.metadataResolverAddress = event.params.resolver
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  
  entity.save()
}

export function handleIPResolverSet(
    event: IPResolverSet
): void {

  let entity = IPRecord.load(event.params.ipId)
  if (entity == null) {
    return
  }
  
  entity.metadataResolverAddress = event.params.resolver
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  
  entity.save()
}
