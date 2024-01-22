import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  IPAccountSet,
  IPRegistered,
  IPResolverSet
} from "../generated/IPRecordRegistry/IPRecordRegistry"

export function createIPAccountSetEvent(
  ipId: Address,
  chainId: BigInt,
  tokenContract: Address,
  tokenId: BigInt
): IPAccountSet {
  let ipAccountSetEvent = changetype<IPAccountSet>(newMockEvent())

  ipAccountSetEvent.parameters = new Array()

  ipAccountSetEvent.parameters.push(
    new ethereum.EventParam("ipId", ethereum.Value.fromAddress(ipId))
  )
  ipAccountSetEvent.parameters.push(
    new ethereum.EventParam(
      "chainId",
      ethereum.Value.fromUnsignedBigInt(chainId)
    )
  )
  ipAccountSetEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )
  ipAccountSetEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return ipAccountSetEvent
}

export function createIPRegisteredEvent(
  ipId: Address,
  chainId: BigInt,
  tokenContract: Address,
  tokenId: BigInt,
  resolver: Address
): IPRegistered {
  let ipRegisteredEvent = changetype<IPRegistered>(newMockEvent())

  ipRegisteredEvent.parameters = new Array()

  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam("ipId", ethereum.Value.fromAddress(ipId))
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "chainId",
      ethereum.Value.fromUnsignedBigInt(chainId)
    )
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromAddress(resolver))
  )

  return ipRegisteredEvent
}

export function createIPResolverSetEvent(
  ipId: Address,
  resolver: Address
): IPResolverSet {
  let ipResolverSetEvent = changetype<IPResolverSet>(newMockEvent())

  ipResolverSetEvent.parameters = new Array()

  ipResolverSetEvent.parameters.push(
    new ethereum.EventParam("ipId", ethereum.Value.fromAddress(ipId))
  )
  ipResolverSetEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromAddress(resolver))
  )

  return ipResolverSetEvent
}
