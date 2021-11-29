// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev Generates a simple ERC20 token
 *
 * Token is owned by address
 */
contract SimpleToken is ERC20 {
    constructor(
        address owner,
        uint256 initialSupply,
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) {
        _mint(owner, initialSupply);
    }
}
