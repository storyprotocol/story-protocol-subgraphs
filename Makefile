compile_alpha_contracts:
	git submodule add -b main --force https://github.com/storyprotocol/protocol-contracts temp/protocol-contracts
	git submodule update --remote --merge
	cd temp/protocol-contracts && npm i
	cd ../..

	solc --pretty-json --base-path temp/protocol-contracts --include-path temp/protocol-contracts/node_modules/ --abi temp/protocol-contracts/contracts/modules/base/HookRegistry.sol -o subgraphs/v0-alpha/abis/tmp/HookRegistry
	solc --pretty-json --base-path temp/protocol-contracts --include-path temp/protocol-contracts/node_modules/ --abi temp/protocol-contracts/contracts/ip-org/IPOrgController.sol -o subgraphs/v0-alpha/abis/tmp/IPOrgController
	solc --pretty-json --base-path temp/protocol-contracts --include-path temp/protocol-contracts/node_modules/ --abi temp/protocol-contracts/contracts/modules/licensing/LicenseRegistry.sol -o subgraphs/v0-alpha/abis/tmp/LicenseRegistry
	solc --pretty-json --base-path temp/protocol-contracts --include-path temp/protocol-contracts/node_modules/ --abi temp/protocol-contracts/contracts/modules/licensing/LicensingModule.sol -o subgraphs/v0-alpha/abis/tmp/LicensingModule
	solc --pretty-json --base-path temp/protocol-contracts --include-path temp/protocol-contracts/node_modules/ --abi temp/protocol-contracts/contracts/modules/ModuleRegistry.sol -o subgraphs/v0-alpha/abis/tmp/ModuleRegistry
	solc --pretty-json --base-path temp/protocol-contracts --include-path temp/protocol-contracts/node_modules/ --abi temp/protocol-contracts/contracts/modules/registration/RegistrationModule.sol -o subgraphs/v0-alpha/abis/tmp/RegistrationModule
	solc --pretty-json --base-path temp/protocol-contracts --include-path temp/protocol-contracts/node_modules/ --abi temp/protocol-contracts/contracts/modules/relationships/RelationshipModule.sol -o subgraphs/v0-alpha/abis/tmp/RelationshipModule

	# Compiles only selected contract entitles
	echo ''"$$(jq --argjson entities "$$(jq -c '.' subgraphs/v0-alpha/abis/sdkEntities.json)" 'map(select(.name as $$name | $$entities | if type == "array" then index($$name) else false end))' subgraphs/v0-alpha/abis/tmp/HookRegistry/HookRegistry.abi)"'' > subgraphs/v0-alpha/abis/HookRegistry.json
	cp subgraphs/v0-alpha/abis/tmp/IPOrgController/IPOrgController.abi subgraphs/v0-alpha/abis/IPOrgController.json
	cp subgraphs/v0-alpha/abis/tmp/LicensingModule/LicensingModule.abi subgraphs/v0-alpha/abis/LicenseModule.json
	cp subgraphs/v0-alpha/abis/tmp/LicenseRegistry/LicenseRegistry.abi subgraphs/v0-alpha/abis/LicenseRegistry.json
	cp subgraphs/v0-alpha/abis/tmp/ModuleRegistry/ModuleRegistry.abi subgraphs/v0-alpha/abis/ModuleRegistry.json
	cp subgraphs/v0-alpha/abis/tmp/RegistrationModule/RegistrationModule.abi subgraphs/v0-alpha/abis/RegistrationModule.json
	cp subgraphs/v0-alpha/abis/tmp/RelationshipModule/RelationshipModule.abi subgraphs/v0-alpha/abis/RelationshipModule.json


	rm -rf temp
	rm -rf subgraphs/v0-alpha/abis/tmp
