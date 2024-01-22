import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { IPAccountSet } from "../generated/schema"
import { IPAccountSet as IPAccountSetEvent } from "../generated/IPRecordRegistry/IPRecordRegistry"
import { handleIPAccountSet } from "../src/ip-record-registry"
import { createIPAccountSetEvent } from "./ip-record-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let ipId = Address.fromString("0x0000000000000000000000000000000000000001")
    let chainId = BigInt.fromI32(234)
    let tokenContract = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let newIPAccountSetEvent = createIPAccountSetEvent(
      ipId,
      chainId,
      tokenContract,
      tokenId
    )
    handleIPAccountSet(newIPAccountSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("IPAccountSet created and stored", () => {
    assert.entityCount("IPAccountSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "IPAccountSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ipId",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "IPAccountSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "chainId",
      "234"
    )
    assert.fieldEquals(
      "IPAccountSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenContract",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "IPAccountSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
