// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "../mocks/AggregatorV3Interface.sol";

/**
 * @title SampleChainlink
 * @dev An example of a contract that uses the most popular Chainlink Reference Data
 * It is used for benchmarking gas costs
 */
contract SampleChainlink {

  AggregatorV3Interface internal priceFeed;

  /**
   * Network: Kovan
   * Aggregator: ETH/USD
   * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
   */
  constructor() public {
    priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
  }

  /**
   * Returns the latest price
   */
  function executeWithPrice(uint val) public returns(uint256) {
    (, int price, , ,) = priceFeed.latestRoundData();
    return uint256(price);
  }
  
}
