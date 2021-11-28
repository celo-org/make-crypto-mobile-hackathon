// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "../mocks/MockStatePriceProvider.sol";
import "../message-based/PriceAwareUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @title SamplePriceAware
 * @dev An example of a contract using a message-based way of fetching data from RedStone
 * It has only a few methods used to benchmark gas consumption
 * It extends PriceAware and allows changing trusted signer and message delay
 */
contract SamplePriceAwareUpgradeable is OwnableUpgradeable, PriceAwareUpgradeable {

  MockStatePriceProvider mockStatePriceProvider = new MockStatePriceProvider();


  function initialize() external initializer {
    __Ownable_init();
    __PriceAware_init();
  }


  function executeWithPrice(uint val) public returns(uint256) {
    return getPriceFromMsg(bytes32("IBM"));
  }

}
