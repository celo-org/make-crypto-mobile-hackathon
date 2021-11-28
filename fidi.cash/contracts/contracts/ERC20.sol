// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract ERC20 {
  function balanceOf(address _who) public view virtual returns (uint256);

  function transfer(address _to, uint256 _value) public virtual returns (bool);

  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  ) public virtual returns (bool);
}
