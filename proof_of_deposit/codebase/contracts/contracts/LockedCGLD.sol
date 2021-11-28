pragma solidity ^0.8.0;

import "./LockedToken.sol";

contract LockedCGLD is LockedToken {
    constructor(address tokenAddress, uint256 unlockingPeriod) LockedToken(tokenAddress, unlockingPeriod) {}
}