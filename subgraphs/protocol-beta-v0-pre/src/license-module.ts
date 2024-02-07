import {
    PolicyFrameworkRegistered,
    PolicyAddedToIpId,
    LicenseModule,
    PolicyRegistered
} from "../generated/LicenseModule/LicenseModule"
import { 
    PolicyFrameworkManager,
    IPAPolicy, Transaction, Policy } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts"

export function handlePolicyRegistered(event: PolicyRegistered): void {
    let entity = new Policy(event.params.policyId.toString())

    entity.policyId = event.params.policyId
    entity.policy = event.params.policy
    entity.policyFrameworkManager = event.params.policyFrameworkManager
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

export function takeFirst15Chars(input: string): string {
    let result: string = "";

    // Iterate through the string and copy the first 10 characters
    for (let i: i32 = 0; i < 15 && i < input.length; i++) {
        result = result.concat(input.charAt(i));
    }

    return result;
}
