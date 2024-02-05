import {
    PolicyFrameworkRegistered,
    PolicyAddedToIpId
} from "../generated/LicenseModule/LicenseModule"
import { 
    PolicyFrameworkManager,
    IPAPolicy
} from "../generated/schema"

export function handlePolicyFrameworkRegistered(event: PolicyFrameworkRegistered): void {
    let entity = new PolicyFrameworkManager(
        event.params.framework.toString() + "-" + event.params.name
    )

    entity.address = event.params.framework
    entity.name = event.params.name
    entity.licenseUrl = event.params.licenseTextUrl
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    entity.save()
}
export function handlePolicyAddedToIpId(event: PolicyAddedToIpId): void {
    let entity = new IPAPolicy(
        event.params.ipId.toString() + "-" + event.params.policyId
    )

    entity.ipId = event.params.ipId.toHexString()
    entity.policyId = event.params.policyId.toHexString()
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    entity.save()
}
