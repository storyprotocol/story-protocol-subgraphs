import {
  AccessControlUpdated as AccessControlUpdatedEvent,
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  IPOrgPendingOwnerSet as IPOrgPendingOwnerSetEvent,
  IPOrgRegistered as IPOrgRegisteredEvent,
  IPOrgTransferred as IPOrgTransferredEvent,
  Initialized as InitializedEvent,
  Upgraded as UpgradedEvent
} from "../generated/IPOrgController/IPOrgController"
import {
  AccessControlUpdated,
  AdminChanged,
  BeaconUpgraded,
  IPOrgPendingOwnerSet,
  IPOrgRegistered,
  IPOrgTransferred,
  Initialized,
  Upgraded
} from "../generated/schema"

export function handleAccessControlUpdated(
  event: AccessControlUpdatedEvent
): void {
  let entity = new AccessControlUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.accessControl = event.params.accessControl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beacon = event.params.beacon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPOrgPendingOwnerSet(
  event: IPOrgPendingOwnerSetEvent
): void {
  let entity = new IPOrgPendingOwnerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipOrg_ = event.params.ipOrg_
  entity.pendingOwner_ = event.params.pendingOwner_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPOrgRegistered(event: IPOrgRegisteredEvent): void {
  let entity = new IPOrgRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner_ = event.params.owner_
  entity.ipAssetOrg_ = event.params.ipAssetOrg_
  entity.name_ = event.params.name_
  entity.symbol_ = event.params.symbol_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPOrgTransferred(event: IPOrgTransferredEvent): void {
  let entity = new IPOrgTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipOrg_ = event.params.ipOrg_
  entity.prevOwner_ = event.params.prevOwner_
  entity.newOwner_ = event.params.newOwner_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
