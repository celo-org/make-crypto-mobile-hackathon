// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "../mocks/MockStatePriceProvider.sol";
import "../message-based/InlinedPriceAware.sol";

/**
 * @title SampleInlinedPriceAware
 * @dev An example of a contract using message-based way of fetching data from RedStone
 * It has only a few dummy methods used to benchmark gas consumption
 * It extends InlinedPriceAware which in-lines signer address and maximum delay of price feed
 * to reduce the gas of every invocation (saving is ~4k gas)
 */
contract SampleInlinedMockPriceAware is InlinedPriceAware {

  MockStatePriceProvider mockStatePriceProvider = new MockStatePriceProvider();


  function execute(uint val) public returns(uint256) {
    return getPrice();
  }


  function executeWithPrice(uint val) public returns(uint256) {
    return getPriceFromMsg(bytes32("ETH"));
  }


  function getPriceFromMsgPublic(bytes32 symbol) public view returns(uint256) {
    return getPriceFromMsg(symbol);
  }


  function getPrice() internal view returns(uint256) {
    return mockStatePriceProvider.getPrice(bytes32("ETH"));
  }


  function getTime() public view returns(uint256) {
    return block.timestamp;
  }

}
