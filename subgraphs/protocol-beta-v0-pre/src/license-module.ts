import {
    PolicyFrameworkRegistered,
    PolicyAddedToIpId,
    LicenseModule,
    PolicyRegistered,
    IpIdLinkedToParents
} from "../generated/LicenseModule/LicenseModule"
import {
    UMLPolicyFrameworkManager
} from "../generated/LicenseModule/UMLPolicyFrameworkManager"
import { 
    PolicyFrameworkManager,
    IPAPolicy,
    Transaction,
    Policy,
    UMLPolicy,
    IPAsset } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts"

export function handlePolicyRegistered(event: PolicyRegistered): void {
    let entity = new Policy(event.params.policyId.toString())

    entity.policyId = event.params.policyId
    entity.policy = event.params.policy
    entity.policyFrameworkManager = event.params.policyFrameworkManager
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    if (entity.policyFrameworkManager.toHexString().toLowerCase() == "0xDEc23819025c761FAAbA391AC7dBB3FEDB3CDDF7".toLowerCase()) {
        let contract = UMLPolicyFrameworkManager.bind(event.params.policyFrameworkManager)
        let umlData = contract.getPolicy(entity.policyId)

        const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())
        let umlEntity = new UMLPolicy(hash)
        umlEntity.attribution = umlData.attribution
        umlEntity.transferable = umlData.transferable
        umlEntity.commercialUse = umlData.commercialUse
        umlEntity.commercialAttribution = umlData.commercialAttribution
        umlEntity.commercializers = umlData.commercializers
        umlEntity.commercialRevShare = umlData.commercialRevShare
        umlEntity.derivativesAllowed = umlData.derivativesAllowed
        umlEntity.derivativesAttribution = umlData.derivativesAttribution
        umlEntity.derivativesApproval = umlData.derivativesApproval
        umlEntity.derivativesReciprocal = umlData.derivativesReciprocal
        umlEntity.derivativesRevShare = umlData.derivativesRevShare
        umlEntity.territories = umlData.territories
        umlEntity.distributionChannels = umlData.distributionChannels
        umlEntity.contentRestrictions = umlData.contentRestrictions
        umlEntity.royaltyPolicy = umlData.royaltyPolicy
        
        umlEntity.save()
        entity.uml = umlEntity.id
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
    entity.policyId = event.params.policyId.toHexString()
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
        
        let childIpIds : Bytes[] = []
        if (parentEntity.childIpIds !== null) {
            childIpIds = parentEntity.childIpIds
        }
        childIpIds.push(event.params.ipId)
        parentEntity.save()

        // Copy rootAddress from parent to child
        if (parentEntity.rootAncestors !== null) {
            for (let i = 0; i < parentEntity.rootAncestors.length; i ++) {
                rootIpIds.push(parentEntity.rootAncestors[i])
            }
        }
    }

    entity.rootAncestors = rootIpIds
    
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
