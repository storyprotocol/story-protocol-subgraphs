import {
  IPOrgRegistered as IPOrgRegisteredEvent,
  IPOrgTransferred as IPOrgTransferredEvent,
} from "../generated/IPOrgController/IPOrgController"
import {
 ModuleRegisterred 
} from "../generated/schema"
import {
  RegistrationModule 
} from "../generated/IPOrgController/RegistrationModule"
import {
  IPOrgRegistered,
  IPOrgTransferred,
} from "../generated/schema"
import { Address } from "@graphprotocol/graph-ts"

export function handleIPOrgRegistered(event: IPOrgRegisteredEvent): void {
  let entity = new IPOrgRegistered(
    event.params.ipAssetOrg_
  )
  entity.owner = event.params.owner_
  entity.ipOrgId = event.params.ipAssetOrg_
  entity.name = event.params.name_
  entity.symbol = event.params.symbol_

  let registrationModuleRecord = ModuleRegisterred.load(entity.ipOrgId.toHexString() + ":" + "REGISTRATION_MODULE")
  let registrationModuleContract = RegistrationModule.bind(Address.fromBytes(registrationModuleRecord!.moduleId))
  let ipAssetTypes = registrationModuleContract.getIPAssetTypes(Address.fromBytes(entity.ipOrgId))
  entity.ipAssetTypes = ipAssetTypes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPOrgTransferred(event: IPOrgTransferredEvent): void {
  let entity = new IPOrgTransferred(
    event.params.ipOrg_
  )
  entity.ipOrgId = event.params.ipOrg_
  entity.prevOwner = event.params.prevOwner_
  entity.newOwner = event.params.newOwner_

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}