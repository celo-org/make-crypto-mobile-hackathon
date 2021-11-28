// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract SuperChat {

  uint totalSuperchat; // the amount of donations
  address payable owner; // contract creator's address

  //contract settings
  constructor() {
    owner = payable(msg.sender); // setting the contract creator
  }

  //public function to make donate
  function donate() public payable {
    (bool success,) = owner.call{value: msg.value}("");
    require(success, "Failed to send money");
  }

  // public function to return total of supervhat received
  function getTotalSuperChat() view public returns(uint) {
    return totalSuperchat;
  }
}