// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Offer.sol';
import './Deal.sol';

/**
 * @title Fidi.Cash Core Contract
 * @dev Core contract for managing Fidi Offers and Deals
 */
contract FidiCore {
  event OfferCreated(address indexed seller, address offer);
  event DealCreated(address indexed buyer, address deal, address offer);

  function createOffer(address tokenAddress) public returns (address) {
    address seller = msg.sender;

    address offerAddress = address(new Offer(tokenAddress, seller));
    emit OfferCreated(seller, offerAddress);
    return offerAddress;
  }

  function createDeal(address tokenAddress, address offerAddress)
    public
    returns (address)
  {
    address buyer = msg.sender;

    address dealAddress = address(new Deal(tokenAddress, offerAddress, buyer));
    emit DealCreated(buyer, dealAddress, offerAddress);
    return dealAddress;
  }
}
