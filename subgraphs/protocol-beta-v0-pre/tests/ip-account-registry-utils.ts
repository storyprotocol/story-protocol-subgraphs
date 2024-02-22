import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { IPAccountRegistered } from "../generated/IPAccountRegistry/IPAccountRegistry"

export function createIPAccountRegisteredEvent(
  account: Address,
  implementation: Address,
  chainId: BigInt,
  tokenContract: Address,
  tokenId: BigInt
): IPAccountRegistered {
  let ipAccountRegisteredEvent = changetype<IPAccountRegistered>(newMockEvent())

  ipAccountRegisteredEvent.parameters = new Array()

  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )
  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "chainId",
      ethereum.Value.fromUnsignedBigInt(chainId)
    )
  )
  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )
  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return ipAccountRegisteredEvent
}
