import {
    PolicyFrameworkRegistered,
    PolicyAddedToIpId,
    LicenseModule,
    PolicyRegistered,
    IpIdLinkedToParents
} from "../generated/LicenseModule/LicenseModule"
import {
    PILPolicyFrameworkManager
} from "../generated/LicenseModule/PILPolicyFrameworkManager"
import {
    PolicyFrameworkManager,
    IPAPolicy,
    Transaction,
    Policy,
    PILPolicy,
    IPAsset } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts"

export function handlePolicyRegistered(event: PolicyRegistered): void {
    let entity = new Policy(event.params.policyId.toString())

    entity.policyId = event.params.policyId
    entity.policyFrameworkManager = event.params.policyFrameworkManager
    entity.frameworkData = event.params.frameworkData
    entity.royaltyPolicy = event.params.royaltyPolicy
    entity.royaltyData = event.params.royaltyData
    entity.mintingFee = event.params.mintingFee
    entity.mintingFeeToken = event.params.mintingFeeToken

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    if (entity.policyFrameworkManager.toHexString().toLowerCase() == "0x49cF5C5523011F8B4A0489969096Eb68C571C197".toLowerCase()) {
        let contract = PILPolicyFrameworkManager.bind(event.params.policyFrameworkManager)
        let umlData = contract.getPILPolicy(entity.policyId)

        const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())
        let umlEntity = new PILPolicy(hash)
        umlEntity.attribution = umlData.attribution
        umlEntity.commercialUse = umlData.commercialUse
        umlEntity.commercialAttribution = umlData.commercialAttribution
        umlEntity.commercialRevShare = umlData.commercialRevShare
        umlEntity.commercializerChecker = umlData.commercializerChecker
        umlEntity.commercializerCheckerData = umlData.commercializerCheckerData
        umlEntity.commercialRevShare = umlData.commercialRevShare
        umlEntity.derivativesAllowed = umlData.derivativesAllowed
        umlEntity.derivativesAttribution = umlData.derivativesAttribution
        umlEntity.derivativesApproval = umlData.derivativesApproval
        umlEntity.derivativesReciprocal = umlData.derivativesReciprocal
        umlEntity.territories = umlData.territories
        umlEntity.distributionChannels = umlData.distributionChannels
        umlEntity.contentRestrictions = umlData.contentRestrictions

        umlEntity.save()
        entity.pil = umlEntity.id
    }
    entity.save()

    let trx = new Transaction(event.transaction.hash.toHexString())

    trx.txHash = event.transaction.hash.toHexString()
    trx.initiator = event.transaction.from
    trx.createdAt = event.block.timestamp
    trx.ipId = new Bytes(0)
    trx.resourceId = event.address
    trx.actionType = "Register"
    trx.resourceType = "Policy"
    trx.blockNumber = event.block.number;
    trx.blockTimestamp = event.block.timestamp;

    trx.save()
}

export function handlePolicyFrameworkRegistered(event: PolicyFrameworkRegistered): void {
    const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())

    let entity = new PolicyFrameworkManager(hash)

    entity.address = event.params.framework
    entity.name = event.params.name
    entity.licenseUrl = event.params.licenseTextUrl
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    entity.save()

    let trx = new Transaction(event.transaction.hash.toHexString())

    trx.txHash = event.transaction.hash.toHexString()
    trx.initiator = event.transaction.from
    trx.createdAt = event.block.timestamp
    trx.ipId = new Bytes(0)
    trx.resourceId = event.address
    trx.actionType = "Register"
    trx.resourceType = "Policy"
    trx.blockNumber = event.block.number;
    trx.blockTimestamp = event.block.timestamp;

    trx.save()
}
export function handlePolicyAddedToIpId(event: PolicyAddedToIpId): void {
    const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())

    let entity = new IPAPolicy(
        hash
    )

    let contract = LicenseModule.bind(event.address);
    let licenseData = contract.policyStatus(event.params.ipId, event.params.policyId)

    entity.ipId = event.params.ipId.toHexString()
    entity.policyId = event.params.policyId.toString()
    entity.index = licenseData.getIndex()
    entity.active = licenseData.getActive()
    entity.inherited = licenseData.getIsInherited()
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    entity.save()

    let trx = new Transaction(event.transaction.hash.toHexString())

    trx.txHash = event.transaction.hash.toHexString()
    trx.initiator = event.transaction.from
    trx.createdAt = event.block.timestamp
    trx.ipId = new Bytes(0)
    trx.resourceId = event.address
    trx.actionType = "Link"
    trx.resourceType = "Policy"
    trx.blockNumber = event.block.number;
    trx.blockTimestamp = event.block.timestamp;

    trx.save()
}

export function handleIpIdLinkedToParents(
    event: IpIdLinkedToParents
): void {
    let entity = IPAsset.load(event.params.ipId);
    if (entity == null) {
        return;
    }

    let parentIpIds : Bytes[] = [];
    let rootIpIds : Bytes[] = [];

    for (let i = 0; i < event.params.parentIpIds.length; i++) {
        // Add parentIpId to childs parentIpId array
        parentIpIds.push(event.params.parentIpIds[i])
        entity.parentIpIds = parentIpIds

        // Add childIpId to parents childIpId array
        let parentEntity = IPAsset.load(event.params.parentIpIds[i])
        if (parentEntity == null) {
            return;
        }

        let childIpIds = parentEntity.childIpIds
        if (childIpIds != null) {
            childIpIds.push(event.params.ipId)
        } else {
            let newChildIpIds : Bytes[] = []
            newChildIpIds.push(event.params.ipId)
            childIpIds = newChildIpIds
        }

        parentEntity.childIpIds = childIpIds
        parentEntity.save()

        // Copy rootAddress from parent to child
        let parentRootAncestors = parentEntity.rootIpIds
        if (parentRootAncestors != null) {
            for (let i = 0; i < parentRootAncestors.length; i ++) {
                rootIpIds.push(parentRootAncestors[i])
            }
        }
    }

    entity.rootIpIds = rootIpIds

    entity.save()
}

export function takeFirst15Chars(input: string): string {
    let result: string = "";

    // Iterate through the string and copy the first 10 characters
    for (let i: i32 = 0; i < 15 && i < input.length; i++) {
        result = result.concat(input.charAt(i));
    }

    return result;
}
