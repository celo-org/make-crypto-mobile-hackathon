// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CreatorFactory.sol";

contract Naffy is CreatorFactory {
  function getCreatorByAddress(address _creator) public view returns (Creator) {
    return creators[addressToId[_creator]];
  }
}
