// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Creator.sol";

contract Token is ERC20, Ownable {
    uint256 _totalSupply;

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 totalSupply
    ) ERC20(tokenName, tokenSymbol) {
        _totalSupply = totalSupply;
        _mint(tx.origin, totalSupply);
    }
}
