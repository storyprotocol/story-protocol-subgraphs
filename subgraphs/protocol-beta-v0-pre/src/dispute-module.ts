import {
  DisputeCancelled,
  DisputeRaised,
  DisputeResolved,
  DisputeJudgementSet,
  TagWhitelistUpdated
} from "../generated/DisputeModule/DisputeModule";
import { Dispute } from "../generated/schema";

export function handleDisputeRaised(event: DisputeRaised): void {
  let entity = new Dispute(event.params.disputeId.toString());
  
  entity.arbitrationPolicy = event.params.arbitrationPolicy;
  entity.targetIpId = event.params.targetIpId;
  entity.targetTag = event.params.targetTag;
  entity.arbitrationPolicy = event.params.arbitrationPolicy;
  entity.initiator = event.params.disputeInitiator;
  entity.data = event.params.data;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
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
}

export function handleDisputeJudgement(event: DisputeJudgementSet): void {
  let entity = Dispute.load(event.params.disputeId.toString());
  if (entity == null) {
    return;
  }

  entity.deletedAt = event.block.number;
  entity.data = event.params.data;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
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
}

export function takeFirst15Chars(input: string): string {
  let result: string = "";

  // Iterate through the string and copy the first 10 characters
  for (let i: i32 = 0; i < 15 && i < input.length; i++) {
    result = result.concat(input.charAt(i));
  }

  return result;
}
