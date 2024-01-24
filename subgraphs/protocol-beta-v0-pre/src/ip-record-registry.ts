import { IPRegistered, IPResolverSet } from "../generated/IPRecordRegistry/IPRecordRegistry"
import { IPRecord } from "../generated/schema"

export function handleIPRegistered(
    event: IPRegistered
): void {
  let entity = new IPRecord(
      event.params.ipId.toString()
  )

  entity.ipId = event.params.ipId.toString()
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId
  entity.metadataResolverAddress = event.params.resolver

  entity.save()
}

export function handleIPResolverSet(
    event: IPResolverSet
): void {

  let entity = IPRecord.load(event.params.ipId.toString())
  if (entity == null) {
    return
  }
  
  entity.metadataResolverAddress = event.params.resolver

  entity.save()
}
