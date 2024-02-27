import { PolicyInitialized } from "../generated/RoyaltyPolicyLAP/RoyaltyPolicyLAP";
import { RoyaltyPolicy, Transaction } from "../generated/schema";
import {Address, Bytes} from "@graphprotocol/graph-ts"

export function handleRoyaltyPolicyInitialized(event: PolicyInitialized): void {

    let entity = new RoyaltyPolicy(event.params.ipId);
    if (entity == null) {
        return;
    }

    let ancestorsVault : Address = event.params.ancestorsVault
    if (ancestorsVault.toHexString() != "0x16eF58e959522727588921A92e9084d36E5d3855"){
        entity.ancestorsVault = ancestorsVault
    }


    entity.splitClone = event.params.splitClone
    entity.royaltyStack = event.params.royaltyStack
    entity.targetRoyaltyAmount = event.params.targetRoyaltyAmount
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;

    let targetAncestors : Bytes[] = [];
    for (let i = 0; i < event.params.targetAncestors.length; i++) {
        targetAncestors.push(Bytes.fromByteArray(event.params.targetAncestors[i]))
    }
    entity.targetAncestors = targetAncestors

    entity.save();

    let trx = new Transaction(event.transaction.hash.toHexString())

    trx.txHash = event.transaction.hash.toHexString()
    trx.initiator = event.transaction.from
    trx.createdAt = event.block.timestamp
    trx.ipId = event.params.ipId
    trx.resourceId = event.address
    trx.actionType = "Create"
    trx.resourceType = "RoyaltyPolicy"
    trx.blockNumber = event.block.number;
    trx.blockTimestamp = event.block.timestamp;

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
