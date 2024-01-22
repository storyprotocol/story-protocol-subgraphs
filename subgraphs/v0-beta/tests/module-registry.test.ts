import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ModuleAdded } from "../generated/schema"
import { ModuleAdded as ModuleAddedEvent } from "../generated/ModuleRegistry/ModuleRegistry"
import { handleModuleAdded } from "../src/module-registry"
import { createModuleAddedEvent } from "./module-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let name = "Example string value"
    let module = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newModuleAddedEvent = createModuleAddedEvent(name, module)
    handleModuleAdded(newModuleAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ModuleAdded created and stored", () => {
    assert.entityCount("ModuleAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ModuleAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "ModuleAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "module",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
