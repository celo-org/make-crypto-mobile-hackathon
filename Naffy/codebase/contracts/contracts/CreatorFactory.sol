// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Creator.sol";

contract CreatorFactory {
  mapping(address => address) public ownerToCreator;
  mapping(address => uint256) public addressToId;
  Creator[] public creators;

  event CreatorCreated(address _address, address _owner);

  function newCreator(address _cusd, address _ceur) external {
    require(ownerToCreator[msg.sender] == address(0), "Naffy: You already have a creator account");

    uint256 _id = getCreatorsLength();

    address _creator = _deployNewCreator(_cusd, _ceur);
    addressToId[_creator] = _id;
    ownerToCreator[msg.sender] = _creator;

    emit CreatorCreated(_creator, msg.sender);
  }

  function _deployNewCreator(address _cusd, address _ceur) internal returns (address) {
    Creator _creator = new Creator(msg.sender, _cusd, _ceur);
    creators.push(_creator);

    return address(_creator);
  }

  function getCreatorsLength() public view returns (uint256) {
    return creators.length;
  }
}
