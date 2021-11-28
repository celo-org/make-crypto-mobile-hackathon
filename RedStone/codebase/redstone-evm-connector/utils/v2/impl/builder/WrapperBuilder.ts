import {Contract} from "ethers";
import {EthersContractWrapperBuilder} from "./EthersContractWrapperBuilder";
import {MockableEthersContractWrapperBuilder} from "./MockableEthersContractWrapperBuilder";

/**
 * Putting "wrap" and "mock" methods directly in EthersContractWrapper or EtherContractWrapperList
 * was causing https://stackoverflow.com/a/44727578
 */
export default class WrapperBuilder {
  static wrap<T extends Contract>(contract: T): EthersContractWrapperBuilder<T> {
    return new EthersContractWrapperBuilder(contract, "full");
  }

  static mock<T extends Contract>(contract: T): MockableEthersContractWrapperBuilder<T> {
    return new MockableEthersContractWrapperBuilder(contract, "full");
  }

  static wrapLite<T extends Contract>(contract: T): EthersContractWrapperBuilder<T> {
    return new EthersContractWrapperBuilder(contract, "lite");
  }

  static mockLite<T extends Contract>(contract: T): MockableEthersContractWrapperBuilder<T> {
    return new MockableEthersContractWrapperBuilder(contract, "lite");
  }
}
