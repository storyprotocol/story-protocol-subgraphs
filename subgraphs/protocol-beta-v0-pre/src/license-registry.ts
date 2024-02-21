import {
    TransferSingle,
    TransferBatch,
    LicenseRegistry
} from "../generated/LicenseRegistry/LicenseRegistry"
import {
    License,
    LicenseOwner,
    Transaction,
    IPAsset,
    Collection
} from "../generated/schema";
import { Bytes, BigInt } from "@graphprotocol/graph-ts"

export function handleLicenseTransferSingle(event: TransferSingle): void {
    let contract = LicenseRegistry.bind(event.address)
    let licenseData = contract.license(event.params.id)

    // owner is event.params.from
    let entity = License.load(event.params.id.toString())
    if (entity == null) {
        let entity = new License(event.params.id.toString());
        entity.policyId = licenseData.policyId.toString();
        entity.licensorIpId = licenseData.licensorIpId.toHexString();
        entity.transferable = licenseData.transferable;
        entity.blockNumber = event.block.number;
        entity.blockTimestamp = event.block.timestamp;
        entity.amount = BigInt.fromI64(1)

        entity.save();
    } else {
        entity.amount = entity.amount.plus(BigInt.fromI64(1))
        entity.save()
    }


    let ipAsset = IPAsset.load(licenseData.licensorIpId)
    if (ipAsset != null) {
        let collection = Collection.load(ipAsset.tokenContract)
        if (collection != null) {
            collection.licensesCount = collection.licensesCount.plus(BigInt.fromI64(1))
            collection.save()
        }
    }

    let trx = new Transaction(event.transaction.hash.toHexString())

    trx.txHash = event.transaction.hash.toHexString()
    trx.initiator = event.transaction.from
    trx.createdAt = event.block.timestamp
    trx.ipId = licenseData.licensorIpId
    trx.resourceId = event.address
    trx.actionType = "Create"
    trx.resourceType = "License"
    trx.blockNumber = event.block.number;
    trx.blockTimestamp = event.block.timestamp;

    trx.save()
}

export function handleLicenseTransferBatch(event: TransferBatch): void {
    for (let i = 0; i < event.params.ids.length; i++) {
        let entity = License.load(event.params.ids[i].toString());
        if (entity == null) {
            return;
        }

        entity.amount = entity.amount.minus(BigInt.fromI64(1))
        entity.deletedAt = event.block.number;
        entity.save();

        let trx = new Transaction(event.transaction.hash.toHexString())

        trx.txHash = event.transaction.hash.toHexString()
        trx.initiator = event.transaction.from
        trx.createdAt = event.block.timestamp
        trx.ipId = Bytes.fromHexString(entity.licensorIpId)
        trx.resourceId = event.address
        trx.actionType = "Remove"
        trx.resourceType = "License"
        trx.blockNumber = event.block.number;
        trx.blockTimestamp = event.block.timestamp;

        trx.save()
    }
}
// export function handlePolicyCreated(event: PolicyCreated): void {
//     let entity = new Policy(
//         event.params.policyId.toString(),
//     )
//     entity.creator = event.params.creator
//     entity.policyId = event.params.policyId
//     entity.blockNumber = event.block.number
//     entity.blockTimestamp = event.block.timestamp
//     entity.frameworkId = event.params.policy.frameworkId
//
//     let subEntity = new PolicyData(event.params.policyId.toString() + "-data")
//     subEntity.frameworkId = event.params.policy.frameworkId
//     subEntity.needsActivation = event.params.policy.needsActivation
//
//     const mintingParamValues : Array<Bytes> = []
//     for (let i = 0; i < event.params.policy.mintingParamValues.length; i++) {
//         mintingParamValues.push(event.params.policy.mintingParamValues[i])
//     }
//     subEntity.mintingParamValues = mintingParamValues
//
//     const activationParamValues : Array<Bytes> = []
//     for (let i = 0; i < event.params.policy.activationParamValues.length; i++) {
//         activationParamValues.push(event.params.policy.activationParamValues[i])
//     }
//     subEntity.activationParamValues = activationParamValues
//
//     const linkParentParamValues : Array<Bytes> = []
//     for (let i = 0; i < event.params.policy.linkParentParamValues.length; i++) {
//         linkParentParamValues.push(event.params.policy.linkParentParamValues[i])
//     }
//     subEntity.linkParentParamValues = linkParentParamValues
//
//     subEntity.save()
//     entity.save()
// }

// export function handleLicenseFrameworkCreated(event: LicenseFrameworkCreated): void {
//     let entity = new LicenseFramework(
//         event.params.frameworkId.toString(),
//     )
//     entity.creator = event.params.creator
//     entity.blockNumber = event.block.number
//     entity.blockTimestamp = event.block.timestamp
//
//     let frameworkCreationParams = new FrameworkCreationParams(
//         event.params.frameworkId.toString() + "-data",
//     );
//
//     const mintingParamVerifies : Array<Bytes> = []
//     for (let i = 0; i < event.params.frameworkCreationParams.mintingParamVerifiers.length; i++) {
//         mintingParamVerifies.push(event.params.frameworkCreationParams.mintingParamVerifiers[i])
//     }
//     frameworkCreationParams.mintingParamVerifiers = mintingParamVerifies;
//
//     const mintingParamDefaultValues : Array<Bytes> = []
//     for (let i = 0; i < event.params.frameworkCreationParams.mintingParamDefaultValues.length; i++) {
//         mintingParamDefaultValues.push(event.params.frameworkCreationParams.mintingParamDefaultValues[i])
//     }
//     frameworkCreationParams.mintingParamDefaultValues = mintingParamDefaultValues;
//
//     const activationParamVerifiers : Array<Bytes> = []
//     for (let i = 0; i < event.params.frameworkCreationParams.activationParamVerifiers.length; i++) {
//         activationParamVerifiers.push(event.params.frameworkCreationParams.activationParamVerifiers[i])
//     }
//     frameworkCreationParams.activationParamVerifiers = activationParamVerifiers;
//
//     const activationParamDefaultValues : Array<Bytes> = []
//     for (let i = 0; i < event.params.frameworkCreationParams.activationParamDefaultValues.length; i++) {
//         activationParamDefaultValues.push(event.params.frameworkCreationParams.activationParamDefaultValues[i])
//     }
//     frameworkCreationParams.activationParamDefaultValues = activationParamDefaultValues;
//
//     const linkParentParamVerifiers : Array<Bytes> = []
//     for (let i = 0; i < event.params.frameworkCreationParams.linkParentParamVerifiers.length; i++) {
//         linkParentParamVerifiers.push(event.params.frameworkCreationParams.linkParentParamVerifiers[i])
//     }
//     frameworkCreationParams.linkParentParamVerifiers = linkParentParamVerifiers;
//
//     const linkParentParamDefaultValues : Array<Bytes> = []
//     for (let i = 0; i < event.params.frameworkCreationParams.linkParentParamDefaultValues.length; i++) {
//         linkParentParamDefaultValues.push(event.params.frameworkCreationParams.linkParentParamDefaultValues[i])
//     }
//     frameworkCreationParams.linkParentParamDefaultValues = linkParentParamDefaultValues;
//
//     frameworkCreationParams.licenseUrl = event.params.frameworkCreationParams.licenseUrl;
//     frameworkCreationParams.defaultNeedsActivation = event.params.frameworkCreationParams.defaultNeedsActivation;
//
//     frameworkCreationParams.save()
//     entity.save()
// }
//
// export function handlePolicyAddedToIpId(event: PolicyAddedToIpId): void {
//     // // TODO
//     let entity = new IPAToPolicy(
//         event.params.ipId.toHexString() + "-" + event.params.policyId.toString(),
//     )
//     entity.ipId = event.params.ipId
//     entity.policyId = event.params.policyId
//     entity.blockNumber = event.block.number
//     entity.blockTimestamp = event.block.timestamp
//
//     entity.save()
// }
