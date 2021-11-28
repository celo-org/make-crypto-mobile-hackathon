// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC20.sol';

/**
 * @title Offer
 * @dev Offer to sell something on Fidi.Cash
 */
contract Offer {
  bool public active = true;

  address public coreAddress;
  address public tokenAddress;

  address public seller;

  modifier isActive() {
    require(active);
    _;
  }

  modifier sellerOnly() {
    require(msg.sender == seller);
    _;
  }

  constructor(address _tokenAddress, address _seller) {
    coreAddress = msg.sender;
    tokenAddress = _tokenAddress;
    seller = _seller;
  }

  function depositCollateral(uint256 collateral) public sellerOnly {
    ERC20 token = ERC20(tokenAddress);
    require(token.balanceOf(msg.sender) >= collateral);
    token.transferFrom(msg.sender, address(this), collateral);
  }

  function redeemCollateral() public sellerOnly {
    ERC20 token = ERC20(tokenAddress);
    token.transfer(msg.sender, token.balanceOf(address(this)));
  }

  function transferCollateral(address dealAddress, uint256 amount) public {
    ERC20 token = ERC20(tokenAddress);
    require(token.balanceOf(address(this)) >= amount);
    require(token.balanceOf(dealAddress) >= amount);

    token.transfer(dealAddress, amount);
  }

  function summary()
    public
    view
    returns (
      address,
      address,
      address,
      uint256,
      bool
    )
  {
    ERC20 token = ERC20(tokenAddress);
    return (
      coreAddress,
      tokenAddress,
      seller,
      token.balanceOf(address(this)),
      active
    );
  }
}
