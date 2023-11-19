import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  AccessControlUpdated,
  AdminChanged,
  BeaconUpgraded,
  IPOrgPendingOwnerSet,
  IPOrgRegistered,
  IPOrgTransferred,
  Initialized,
  Upgraded
} from "../generated/IPOrgController/IPOrgController"

export function createAccessControlUpdatedEvent(
  accessControl: Address
): AccessControlUpdated {
  let accessControlUpdatedEvent = changetype<AccessControlUpdated>(
    newMockEvent()
  )

  accessControlUpdatedEvent.parameters = new Array()

  accessControlUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "accessControl",
      ethereum.Value.fromAddress(accessControl)
    )
  )

  return accessControlUpdatedEvent
}

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createIPOrgPendingOwnerSetEvent(
  ipOrg_: Address,
  pendingOwner_: Address
): IPOrgPendingOwnerSet {
  let ipOrgPendingOwnerSetEvent = changetype<IPOrgPendingOwnerSet>(
    newMockEvent()
  )

  ipOrgPendingOwnerSetEvent.parameters = new Array()

  ipOrgPendingOwnerSetEvent.parameters.push(
    new ethereum.EventParam("ipOrg_", ethereum.Value.fromAddress(ipOrg_))
  )
  ipOrgPendingOwnerSetEvent.parameters.push(
    new ethereum.EventParam(
      "pendingOwner_",
      ethereum.Value.fromAddress(pendingOwner_)
    )
  )

  return ipOrgPendingOwnerSetEvent
}

export function createIPOrgRegisteredEvent(
  owner_: Address,
  ipAssetOrg_: Address,
  name_: string,
  symbol_: string
): IPOrgRegistered {
  let ipOrgRegisteredEvent = changetype<IPOrgRegistered>(newMockEvent())

  ipOrgRegisteredEvent.parameters = new Array()

  ipOrgRegisteredEvent.parameters.push(
    new ethereum.EventParam("owner_", ethereum.Value.fromAddress(owner_))
  )
  ipOrgRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "ipAssetOrg_",
      ethereum.Value.fromAddress(ipAssetOrg_)
    )
  )
  ipOrgRegisteredEvent.parameters.push(
    new ethereum.EventParam("name_", ethereum.Value.fromString(name_))
  )
  ipOrgRegisteredEvent.parameters.push(
    new ethereum.EventParam("symbol_", ethereum.Value.fromString(symbol_))
  )

  return ipOrgRegisteredEvent
}

export function createIPOrgTransferredEvent(
  ipOrg_: Address,
  prevOwner_: Address,
  newOwner_: Address
): IPOrgTransferred {
  let ipOrgTransferredEvent = changetype<IPOrgTransferred>(newMockEvent())

  ipOrgTransferredEvent.parameters = new Array()

  ipOrgTransferredEvent.parameters.push(
    new ethereum.EventParam("ipOrg_", ethereum.Value.fromAddress(ipOrg_))
  )
  ipOrgTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "prevOwner_",
      ethereum.Value.fromAddress(prevOwner_)
    )
  )
  ipOrgTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner_", ethereum.Value.fromAddress(newOwner_))
  )

  return ipOrgTransferredEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
