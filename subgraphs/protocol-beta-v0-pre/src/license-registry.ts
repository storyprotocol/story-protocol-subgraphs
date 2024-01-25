import { Bytes } from "@graphprotocol/graph-ts"
import {
    LicenseFrameworkCreated,
    LicenseMinted,
    PolicyCreated,
    PolicyAddedToIpId
} from "../generated/LicenseRegistry/LicenseRegistry"
import { 
    License, 
    LicenseFramework, 
    LicenseData, 
    FrameworkCreationParams,
    Policy,
    PolicyData,
    IPAToPolicy
} from "../generated/schema"

export function handlePolicyCreated(event: PolicyCreated): void {
    let entity = new Policy(
        event.params.policyId.toString(),
    )
    entity.creator = event.params.creator
    entity.policyId = event.params.policyId
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.frameworkId = event.params.policy.frameworkId

    let subEntity = new PolicyData(event.params.policyId.toString() + "-data")
    subEntity.frameworkId = event.params.policy.frameworkId
    subEntity.needsActivation = event.params.policy.needsActivation

    const mintingParamValues : Array<Bytes> = []
    for (let i = 0; i < event.params.policy.mintingParamValues.length; i++) {
        mintingParamValues.push(event.params.policy.mintingParamValues[i])
    }
    subEntity.mintingParamValues = mintingParamValues

    const activationParamValues : Array<Bytes> = []
    for (let i = 0; i < event.params.policy.activationParamValues.length; i++) {
        activationParamValues.push(event.params.policy.activationParamValues[i])
    }
    subEntity.activationParamValues = activationParamValues

    const linkParentParamValues : Array<Bytes> = []
    for (let i = 0; i < event.params.policy.linkParentParamValues.length; i++) {
        linkParentParamValues.push(event.params.policy.linkParentParamValues[i])
    }
    subEntity.linkParentParamValues = linkParentParamValues

    subEntity.save()
    entity.save()
}
export function handleLicenseMinted(event: LicenseMinted): void {
    let entity = new License(
        event.params.licenseId.toString(),
    )
    entity.creator = event.params.creator
    entity.receiver = event.params.receiver
    entity.licenseId = event.params.licenseId
    entity.amount = event.params.amount
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    let subEntity = new LicenseData(event.params.licenseId.toString() + "-data")
    subEntity.policyId = event.params.licenseData.policyId

    const licensorIpIds : Array<Bytes> = []
    for (let i = 0; i < event.params.licenseData.licensorIpIds.length; i++) {
        licensorIpIds.push(event.params.licenseData.licensorIpIds[i])
    }

    subEntity.licensorIpIds = licensorIpIds

    subEntity.save()
    entity.save()
}

export function handleLicenseFrameworkCreated(event: LicenseFrameworkCreated): void {
    let entity = new LicenseFramework(
        event.params.frameworkId.toString(),
    )
    entity.creator = event.params.creator
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    let frameworkCreationParams = new FrameworkCreationParams(
        event.params.frameworkId.toString() + "-data",
    );

    const mintingParamVerifies : Array<Bytes> = []
    for (let i = 0; i < event.params.frameworkCreationParams.mintingParamVerifiers.length; i++) {
        mintingParamVerifies.push(event.params.frameworkCreationParams.mintingParamVerifiers[i])
    }
    frameworkCreationParams.mintingParamVerifiers = mintingParamVerifies;

    const mintingParamDefaultValues : Array<Bytes> = []
    for (let i = 0; i < event.params.frameworkCreationParams.mintingParamDefaultValues.length; i++) {
        mintingParamDefaultValues.push(event.params.frameworkCreationParams.mintingParamDefaultValues[i])
    }
    frameworkCreationParams.mintingParamDefaultValues = mintingParamDefaultValues;

    const activationParamVerifiers : Array<Bytes> = []
    for (let i = 0; i < event.params.frameworkCreationParams.activationParamVerifiers.length; i++) {
        activationParamVerifiers.push(event.params.frameworkCreationParams.activationParamVerifiers[i])
    }
    frameworkCreationParams.activationParamVerifiers = activationParamVerifiers;

    const activationParamDefaultValues : Array<Bytes> = []
    for (let i = 0; i < event.params.frameworkCreationParams.activationParamDefaultValues.length; i++) {
        activationParamDefaultValues.push(event.params.frameworkCreationParams.activationParamDefaultValues[i])
    }
    frameworkCreationParams.activationParamDefaultValues = activationParamDefaultValues;

    const linkParentParamVerifiers : Array<Bytes> = []
    for (let i = 0; i < event.params.frameworkCreationParams.linkParentParamVerifiers.length; i++) {
        linkParentParamVerifiers.push(event.params.frameworkCreationParams.linkParentParamVerifiers[i])
    }
    frameworkCreationParams.linkParentParamVerifiers = linkParentParamVerifiers;

    const linkParentParamDefaultValues : Array<Bytes> = []
    for (let i = 0; i < event.params.frameworkCreationParams.linkParentParamDefaultValues.length; i++) {
        linkParentParamDefaultValues.push(event.params.frameworkCreationParams.linkParentParamDefaultValues[i])
    }
    frameworkCreationParams.linkParentParamDefaultValues = linkParentParamDefaultValues;

    frameworkCreationParams.licenseUrl = event.params.frameworkCreationParams.licenseUrl;
    frameworkCreationParams.defaultNeedsActivation = event.params.frameworkCreationParams.defaultNeedsActivation;

    frameworkCreationParams.save()
    entity.save()
}

export function handlePolicyAddedToIpId(event: PolicyAddedToIpId): void {
    // // TODO
    let entity = new IPAToPolicy(
        event.params.ipId.toHexString() + "-" + event.params.policyId.toString(),
    )
    entity.ipId = event.params.ipId
    entity.policyId = event.params.policyId
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp

    entity.save()
}