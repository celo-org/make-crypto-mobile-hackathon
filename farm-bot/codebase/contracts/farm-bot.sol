//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract FarmBot {
    mapping(address => uint256) private _balances;

    address public tokenAddress;

    constructor(address _tokenAddress) {
        console.log("Deploying a FarmBot with token:", _tokenAddress);
        tokenAddress = _tokenAddress;
    }

    function deposit(uint256 amount) public {
        // todo might need a lock on this
        bool transferSuccess = IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        require(transferSuccess, "Transfer failed, aborting deposit");
        _balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public {
        // todo might need a lock on this
        require(_balances[msg.sender] >= amount, "Only the owner can withdraw");
        bool transferSuccess = IERC20(tokenAddress).transfer(msg.sender, amount);
        require(transferSuccess, "Transfer failed, aborting withdrawal");
        _balances[msg.sender] -= amount;
    }
}
