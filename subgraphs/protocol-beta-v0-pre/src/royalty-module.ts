import { RoyaltyPolicySet, RoyaltyPaid } from "../generated/RoyaltyModule/RoyaltyModule";
import { IPRoyalty, RoyaltyPay } from "../generated/schema";

export function handleRoyaltyPaid(event: RoyaltyPaid): void {
  const hash = takeFirst15Chars(event.transaction.hash.toHexString()) + takeFirst15Chars(event.logIndex.toHexString())

  let entity = new RoyaltyPay(hash);
  
  entity.receiverIpId = event.params.receiverIpId;
  entity.payerIpId = event.params.payerIpId;
  entity.sender = event.params.sender;
  entity.token = event.params.token;
  entity.amount = event.params.amount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}

export function handleRoyaltyPolicySet(event: RoyaltyPolicySet): void {
  let entity = new IPRoyalty(event.params.royaltyPolicy.toString())

  entity.royaltyPolicy = event.params.royaltyPolicy;
  entity.ipId = event.params.ipId;
  entity.data = event.params.data;
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