pragma solidity ^0.8.0;

import "./LockedToken.sol";

contract LockedCUSD is LockedToken {
    constructor(address tokenAddress, uint256 unlockingPeriod) LockedToken(tokenAddress, unlockingPeriod) {}
}