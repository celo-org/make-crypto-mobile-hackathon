//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";
import "./ubeswap-farming/contracts/StakingRewards.sol"; // does the ierc20 import too

contract FarmBot {
    mapping(address => uint256) public fpBalances; // maps address to "Farm Point" balances. todo eventually make private
    // FP balances ONLY changes on deposits/withdrawals, NOT when FarmBot claims rewards. This helps save gas.
    // NOTE: the thing that DOES change is the VALUE of an FP relative to an LP token

    uint256 public lpTotalBalance; // total number of LP tokens owned by Farm Bot
    uint256 public fpTotalBalance; // total number of "Farm Points" issued by Farm Bot

    address public tokenAddress = 0xf3098223845F37Ffe4B3A066F2D38A0587317269; // mcUSD-Celo
    StakingRewards public farm = StakingRewards(0x299f31f48D4667a6f68E4331dB05212d57Cc7f80); // alfajores farm for mcUSD-Celo

    function getFpAmount(uint256 _lpAmount) public view returns (uint256) {
        // todo check the rounding on this at some point...
        if (lpTotalBalance == 0) {
            return _lpAmount;
        } else {
            return _lpAmount * fpTotalBalance / lpTotalBalance;
        }
    }

    function deposit(uint256 _lpAmount) public {
        // todo might need a lock on this
        bool transferSuccess = IERC20(tokenAddress).transferFrom(msg.sender, address(this), _lpAmount);
        require(transferSuccess, "Transfer failed, aborting deposit");

        uint256 _fpAmount = this.getFpAmount(_lpAmount);
        fpTotalBalance += _fpAmount;
        lpTotalBalance += _lpAmount;
        fpBalances[msg.sender] += _fpAmount;
        investInFarm();
    }

    function withdraw(uint256 _lpAmount) public {
        // todo might need a lock on this
        uint256 _fpAmount = this.getFpAmount(_lpAmount);
        require(fpBalances[msg.sender] >= _fpAmount, "Cannot withdraw more than the total balance of the owner");

        uint256 tokenBalance = IERC20(tokenAddress).balanceOf(address(this));
        if (_lpAmount > tokenBalance) {
            farm.withdraw(_lpAmount - tokenBalance);
        }

        bool transferSuccess = IERC20(tokenAddress).transfer(msg.sender, _lpAmount);
        require(transferSuccess, "Transfer failed, aborting withdrawal");
        fpBalances[msg.sender] -= _fpAmount;
        fpTotalBalance -= _fpAmount;
        lpTotalBalance -= _lpAmount;
    }

    function investInFarm() public {
        // todo eventually make private. The public function will do more: reap rewards, swap them, obtain LP tokens, and then this.
        uint256 tokenBalance = IERC20(tokenAddress).balanceOf(address(this));
        require(tokenBalance > 0, "Cannot invest in farm because tokenBalance is 0");
        IERC20(tokenAddress).approve(address(farm), tokenBalance);
        farm.stake(tokenBalance);
    }
}
