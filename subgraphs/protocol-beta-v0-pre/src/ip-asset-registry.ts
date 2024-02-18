import { IPRegistered, IPResolverSet, IPAssetRegistry } from "../generated/IPAssetRegistry/IPAssetRegistry"
import { MetadataProviderV1 } from "../generated/IPAssetRegistry/MetadataProviderV1"
import { LicenseModule } from "../generated/IPAssetRegistry/LicenseModule"
import { IPAsset, Transaction, Metadata, Collection } from "../generated/schema";
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
export function handleIPRegistered(
    event: IPRegistered
): void {
  let entity = new IPAsset(
      event.params.ipId
  )

  let contract = MetadataProviderV1.bind(Address.fromString("0xfcD468A72F76e89F2Df517274063ef7210a32e2A"));
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

  // ADDRESS ARRAY OF ROOT ANCESTORS
  // check LicenseModule to see if ipid has parents
  // if it does not, its root - set entity.rootAddresses to self
  let licenseModule = LicenseModule.bind(Address.fromString("0x0C72b24067a15994f91D92Fd9bA23eB5ebcF8378"))
  if (contract == null) {
    return;
  }

  let parentIpIds = licenseModule.parentIpIds(event.params.ipId)
  if (parentIpIds.length == 0) {
    let rootIpIds : Bytes[] = []
    rootIpIds.push(event.params.ipId)
    entity.rootIpIds = rootIpIds
  }
  // ADDRESS ARRAY OF ALL ANCESTORS
  // ROYALTY ARRAY OF ALL ANCESTORS
  entity.ipId = event.params.ipId
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId
  entity.metadataResolverAddress = event.params.resolver
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.metadata = metadataEntity.id

  entity.save()

  let currentCollection = Collection.load(entity.tokenContract)
  if (currentCollection == null) {
    let collectionEntity = new Collection(entity.tokenContract)
    collectionEntity.assetCount = BigInt.fromI64(1)
    collectionEntity.licensesCount = BigInt.fromI64(0)
    collectionEntity.resolvedDisputeCount = BigInt.fromI64(0)
    collectionEntity.raisedDisputeCount = BigInt.fromI64(0)
    collectionEntity.cancelledDisputeCount = BigInt.fromI64(0)
    collectionEntity.judgedDisputeCount = BigInt.fromI64(0)
    collectionEntity.blockNumber = event.block.number
    collectionEntity.blockTimestamp = event.block.timestamp
    collectionEntity.save()
  } else {
    currentCollection.assetCount = currentCollection.assetCount.plus(BigInt.fromI64(1))
    currentCollection.save()
  }

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = event.params.ipId
  trx.resourceId = event.address
  trx.actionType = "Register"
  trx.resourceType = "IPAsset"
  trx.blockNumber = event.block.number;
  trx.blockTimestamp = event.block.timestamp;

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
  trx.blockNumber = event.block.number;
  trx.blockTimestamp = event.block.timestamp;

  trx.save()
}


