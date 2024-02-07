import {
  DisputeCancelled,
  DisputeRaised,
  DisputeResolved,
  DisputeJudgementSet,
  TagWhitelistUpdated,
  ArbitrationRelayerWhitelistUpdated,
  ArbitrationPolicyWhitelistUpdated
} from "../generated/DisputeModule/DisputeModule";
import { Dispute, Transaction } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts"

export function handleDisputeRaised(event: DisputeRaised): void {
  let entity = new Dispute(event.params.disputeId.toString());

  entity.arbitrationPolicy = event.params.arbitrationPolicy;
  entity.targetIpId = event.params.targetIpId;
  entity.targetTag = event.params.targetTag;
  entity.arbitrationPolicy = event.params.arbitrationPolicy;
  entity.initiator = event.params.disputeInitiator;
  entity.evidenceLink = event.params.linkToDisputeEvidence;
  entity.data = event.params.data;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  // let trx = new Transaction(event.transaction.hash.toHexString())
  //
  // trx.txHash = event.transaction.hash.toHexString()
  // trx.initiator = event.transaction.from
  // trx.createdAt = event.block.timestamp
  // trx.ipId = new Bytes(0)
  // trx.resourceId = event.address
  // trx.actionType = "Create"
  // trx.resourceType = "Dispute"
  //
  // trx.save()

}

export function handleDisputeCancelled(event: DisputeCancelled): void {
  let entity = Dispute.load(event.params.disputeId.toString());
  if (entity == null) {
    return;
  }

  entity.deletedAt = event.block.number;
  entity.data = event.params.data;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = new Bytes(0)
  trx.resourceId = event.address
  trx.actionType = "Cancel"
  trx.resourceType = "Dispute"

  trx.save()
}

export function handleDisputeJudgement(event: DisputeJudgementSet): void {
  let entity = Dispute.load(event.params.disputeId.toString());
  if (entity == null) {
    return;
  }

  if (event.params.decision) {
    entity.currentTag = entity.targetTag
  }

  entity.data = event.params.data;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = new Bytes(0)
  trx.resourceId = event.address
  trx.actionType = "Set"
  trx.resourceType = "Dispute"

  trx.save()
}

export function handleDisputeResolved(event: DisputeResolved): void {
  let entity = Dispute.load(event.params.disputeId.toString());
  if (entity == null) {
    return;
  }

  entity.deletedAt = event.block.number;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();

  let trx = new Transaction(event.transaction.hash.toHexString())

  trx.txHash = event.transaction.hash.toHexString()
  trx.initiator = event.transaction.from
  trx.createdAt = event.block.timestamp
  trx.ipId = new Bytes(0)
  trx.resourceId = event.address
  trx.actionType = "Resolve"
  trx.resourceType = "Dispute"

  trx.save()
}

export function handleTagWhitelistUpdated(event: TagWhitelistUpdated): void {

}

export function handleWhitelistArbitrationPolicy(event: ArbitrationPolicyWhitelistUpdated): void {

}

export function handleWhitelistArbitrationRelayer(event: ArbitrationRelayerWhitelistUpdated): void {

}
export function takeFirst15Chars(input: string): string {
  let result: string = "";

  // Iterate through the string and copy the first 10 characters
  for (let i: i32 = 0; i < 15 && i < input.length; i++) {
    result = result.concat(input.charAt(i));
  }

  return result;
}
