import { Signer } from "ethers"
import { Provider } from "@ethersproject/providers"
import { CeloContract, RegisteredContracts } from './CeloContracts'
import { Registry } from "../contracts/Registry"
import { Registry__factory } from "../contracts/factories/Registry__factory"


// Registry contract is always predeployed to this address
const REGISTRY_CONTRACT_ADDRESS = '0x000000000000000000000000000000000000ce10';

export declare type Address = string;


const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const stripProxy = (contract: CeloContract) => contract.replace('Proxy', '') as CeloContract
/**
 * Celo Core Contract's Address Registry
 */
export class AddressRegistry {
    private readonly registry: Registry
    private readonly cache: Map<CeloContract, Address> = new Map()
    

    constructor(signer: Signer | Provider) {
        this.cache.set(CeloContract.Registry, REGISTRY_CONTRACT_ADDRESS)
        this.registry = Registry__factory.connect(REGISTRY_CONTRACT_ADDRESS, signer)
    }

    /**
     * Get the address for a `CeloContract`
     */
    async addressFor(contract: CeloContract): Promise<Address> {
        if (!this.cache.has(contract)) {
            const address = await this.registry.getAddressForString(stripProxy(contract))
            if (!address || address === NULL_ADDRESS) {
                throw new Error(`Failed to get address for ${contract} from the Registry`)
            }
            this.cache.set(contract, address)
        }
        const cachedAddress = this.cache.get(contract)!
        return cachedAddress
    }

    /**
  * Get the address mapping for known registered contracts
  */
    async addressMapping() {
        const allContracts = await this.addressMappingWithNotDeployedContracts()
        const contracts: Map<CeloContract, string> = new Map()
        allContracts.forEach((value, key) => (value ? contracts.set(key, value) : undefined))
        return contracts
    }

    private async addressMappingWithNotDeployedContracts(notDeployedValue?: string) {
        const contracts: Map<CeloContract, string | undefined> = new Map()
        await Promise.all(
            RegisteredContracts.map(async (r) => {
                try {
                    const address = await this.addressFor(r)
                    contracts.set(r, address)
                } catch {
                    contracts.set(r, notDeployedValue)
                }
            })
        )
        return contracts
    }

}
