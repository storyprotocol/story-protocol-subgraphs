// import { IPAccountRegistered as IPAccountRegisteredEvent } from "../generated/IPRecordRegistry/IPRecordRegistry"
// import { IPAccountRegistered } from "../generated/schema"
//
// export function handleIPAccountRegistered(
//   event: IPAccountRegisteredEvent
// ): void {
//   let entity = new IPAccountRegistered(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.account = event.params.account
//   entity.implementation = event.params.implementation
//   entity.chainId = event.params.chainId
//   entity.tokenContract = event.params.tokenContract
//   entity.tokenId = event.params.tokenId
//
//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash
//
//   entity.save()
// }
