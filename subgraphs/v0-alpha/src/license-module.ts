import { Bytes } from "@graphprotocol/graph-ts"
import {
  IpOrgLicensingFrameworkSet as IpOrgLicensingFrameworkSetEvent 
} from "../generated/LicenseModule/LicenseModule"
import {
  IPOrgLicenseParam,
  Transaction,
} from "../generated/schema"

export function handleIpOrgLicenseParamSet(event: IpOrgLicensingFrameworkSetEvent): void {
  let entity = new IPOrgLicenseParam(
    event.params.ipOrg
  )
  entity.frameworkId = event.params.frameworkId
  entity.url = event.params.url
  entity.licensorConfig = event.params.licensorConfig

  const paramTags: Array<string> = []
  const paramValues: Array<Bytes> = []
  entity.length = event.params.values.length
  for (let i = 0; i < event.params.values.length; i++) {
    paramTags.push(event.params.values[i].tag.toHexString())
    paramValues.push(event.params.values[i].value)
  }
  entity.paramTags = paramTags
  entity.paramValues = paramValues

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Index the transaction
  let transaction = new Transaction(event.transaction.hash)
  transaction.initiator = event.transaction.from 
  transaction.ipOrgId = event.params.ipOrg
  transaction.resourceId = event.params.ipOrg.toHexString()
  transaction.resourceType = "License" 
  transaction.actionType = "Configure"

  transaction.blockNumber = event.block.number
  transaction.blockTimestamp = event.block.timestamp
  transaction.transactionHash = event.transaction.hash

  transaction.save()
}