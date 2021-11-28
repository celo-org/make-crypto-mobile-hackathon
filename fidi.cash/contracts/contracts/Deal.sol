// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC20.sol';
import './Offer.sol';

/**
 * @title Deal
 * @dev Deal of exchanging something on Fidi.Cash
 */
contract Deal {
  bool public active = true;

  bool public fulfilled;

  address public coreAddress;
  address public tokenAddress;
  address public offerAddress;

  address public seller;
  address public buyer;

  uint256 public amount;
  uint256 public collateral;

  modifier isActive() {
    require(active);
    _;
  }

  modifier sellerOnly() {
    require(msg.sender == seller);
    _;
  }

  modifier buyerOnly() {
    require(msg.sender == buyer);
    _;
  }

  constructor(
    address _tokenAddress,
    address _offerAddress,
    address _buyer
  ) {
    coreAddress = msg.sender;
    tokenAddress = _tokenAddress;
    offerAddress = _offerAddress;
    buyer = _buyer;

    Offer offer = Offer(offerAddress);
    seller = offer.seller();
  }

  function deposit(uint256 _amount, uint256 _collateral) public buyerOnly {
    amount = _amount;
    collateral = _collateral;

    ERC20 token = ERC20(tokenAddress);
    require(token.balanceOf(msg.sender) >= amount);
    require(token.balanceOf(offerAddress) >= collateral);

    token.transferFrom(msg.sender, address(this), amount);

    Offer offer = Offer(offerAddress);
    offer.transferCollateral(address(this), collateral);
  }

  function fulfill() public sellerOnly {
    fulfilled = true;
  }

  function close() public buyerOnly {
    require(fulfilled);

    ERC20 token = ERC20(tokenAddress);
    token.transfer(seller, amount);
    token.transfer(buyer, collateral);

    active = false;
  }

  function summary()
    public
    view
    returns (
      address,
      address,
      address,
      address,
      address,
      uint256,
      uint256,
      uint256,
      bool
    )
  {
    ERC20 token = ERC20(tokenAddress);
    return (
      coreAddress,
      tokenAddress,
      offerAddress,
      seller,
      buyer,
      token.balanceOf(address(this)),
      amount,
      collateral,
      active
    );
  }
}
