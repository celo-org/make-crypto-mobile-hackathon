// contracts/yEURToken.sol
// SPDX-License-Identifier: MIT

/// @title simple yEUR token
/// @author Mael KREJCI
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YEURToken is ERC20, ERC20Burnable, ERC20Snapshot, Ownable {
    constructor() ERC20("yEURToken", "yEUR") {
        // Todo : remove premined for production
        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
