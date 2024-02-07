import { IPRegistered, IPResolverSet, IPAssetRegistry } from "../generated/IPAssetRegistry/IPAssetRegistry"
import { MetadataProviderV1 } from "../generated/IPAssetRegistry/MetadataProviderV1"
import { IPAsset, Transaction, Metadata } from "../generated/schema";
import { Address } from "@graphprotocol/graph-ts"
export function handleIPRegistered(
    event: IPRegistered
): void {
  let entity = new IPAsset(
      event.params.ipId
  )

  let contract = MetadataProviderV1.bind(Address.fromString("0x2F11b29C0fC7BbaF40Be6c6B2c0Bb4cADB93328d"));
  if (contract == null) {
    return;
  }

  let metadata = contract.metadata(event.params.ipId)
  let metadataEntity = new Metadata(event.params.ipId)
  metadataEntity.name = metadata.name
  metadataEntity.hash = metadata.hash
  metadataEntity.registrant = metadata.registrant
  metadataEntity.registrationDate = metadata.registrationDate
  metadataEntity.uri = metadata.uri
  metadataEntity.save()

  entity.ipId = event.params.ipId
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId
  entity.metadataResolverAddress = event.params.resolver
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.metadata = metadataEntity.id

  entity.save()

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = event.params.ipId
  trx.resourceId = event.address
  trx.actionType = "Register"
  trx.resourceType = "IPAsset"

  trx.save()
}

export function handleIPResolverSet(
    event: IPResolverSet
): void {

  let entity = IPAsset.load(event.params.ipId)
  if (entity == null) {
    return
  }

  entity.metadataResolverAddress = event.params.resolver
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp

  entity.save()

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.ipId = event.params.ipId
  trx.resourceId = event.address
  trx.resourceType = "IPAsset"
  trx.actionType = "Set"
  trx.createdAt = event.block.timestamp

  trx.save()
}


