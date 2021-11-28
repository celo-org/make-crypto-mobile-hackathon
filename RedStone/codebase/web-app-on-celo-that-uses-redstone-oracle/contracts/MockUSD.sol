//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockUSD is ERC20, Ownable {

    constructor () ERC20("USDC Mock", "USDC") { }

    
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
    
    
    function mint(address target, uint256 amount) external onlyOwner {
        super._mint(target, amount);
    }

}
