//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";
import "./ubeswap-farming/contracts/StakingRewards.sol"; // does the ierc20 import too
import "./ubeswap/contracts/uniswapv2/interfaces/IUniswapV2Router02.sol";
import "./ubeswap/contracts/uniswapv2/interfaces/IUniswapV2Pair.sol";

contract FarmBot {
    mapping(address => uint256) public fpBalances; // maps address to "Farm Point" balances. todo eventually make private
    // FP balances ONLY changes on deposits/withdrawals, NOT when FarmBot claims rewards. This helps save gas.
    // NOTE: the thing that DOES change is the VALUE of an FP relative to an LP token

    uint256 public lpTotalBalance; // total number of LP tokens owned by Farm Bot
    uint256 public fpTotalBalance; // total number of "Farm Points" issued by Farm Bot

    IUniswapV2Pair public stakingToken = IUniswapV2Pair(0xe952fe9608a20f80f009a43AEB6F422750285638); // cUSD-CELO
    StakingRewards public farm = StakingRewards(0x734913751D7390c32410eD2c71Bb1d8210d7570B); // Alfajores farm for cUSD-CELO
    IERC20 public rewardsToken = IERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1); // cUSD address
    IERC20 public celoAddress = IERC20(0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9); // CELO address
    IUniswapV2Router02 public router = IUniswapV2Router02(0xE3D8bd6Aed4F159bc8000a9cD47CffDb95F96121); // Router address

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
        bool transferSuccess = stakingToken.transferFrom(msg.sender, address(this), _lpAmount);
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

        uint256 tokenBalance = stakingToken.balanceOf(address(this));
        if (_lpAmount > tokenBalance) {
            farm.withdraw(_lpAmount - tokenBalance);
        }

        bool transferSuccess = stakingToken.transfer(msg.sender, _lpAmount);
        require(transferSuccess, "Transfer failed, aborting withdrawal");
        fpBalances[msg.sender] -= _fpAmount;
        fpTotalBalance -= _fpAmount;
        lpTotalBalance -= _lpAmount;
    }

    function investInFarm() public {
        // todo eventually make private. The public function will do more: reap rewards, swap them, obtain LP tokens, and then this.
        uint256 tokenBalance = stakingToken.balanceOf(address(this));
        require(tokenBalance > 0, "Cannot invest in farm because tokenBalance is 0");
        stakingToken.approve(address(farm), tokenBalance);
        farm.stake(tokenBalance);
    }

    function claimRewards() public {
        // todo eventually make private
        farm.getReward();

	uint256 tokenBalance = rewardsToken.balanceOf(address(this));
	if (tokenBalance == 0) {
	    return;
	}

	// Figure out best-case scenario amount of CELO we can get for our cUSD
	uint256 halfTokens = tokenBalance / 2;
	uint112 _reserve0;
	uint112 _reserve1;
	(_reserve0, _reserve1, ) = stakingToken.getReserves();
	uint256 amountOut = router.getAmountOut(halfTokens, _reserve0, _reserve1); // Amount of CELO we get for half of our cUSD rewards

	// Approve the router to spend our cUSD
	rewardsToken.approve(address(router), halfTokens);
	// Swap, accounting for slippage
	address[] memory path = new address[](2);
	path[0] = address(rewardsToken);
	path[1] = address(celoAddress);
	uint[] memory amounts = router.swapExactTokensForTokens(halfTokens, amountOut*99/100, path, address(this), block.timestamp + 5);

	uint256 amountCusd = halfTokens; // Amount of cUSD we now have
	uint256 amountCelo = amounts[1]; // Amount of CELO we now have

	// Approve the router to spend the farmbot's cUSD/CELO to mint ULP
	rewardsToken.approve(address(router), amountCusd);
	celoAddress.approve(address(router), amountCelo);
	// Actually add liquidity
	router.addLiquidity(address(rewardsToken), address(celoAddress), amountCusd, amountCelo, amountCusd * 99 / 100, amountCelo * 99 / 100, address(this), block.timestamp + 5);

	// How much LP we have to re-invest
	uint256 lpBalance = stakingToken.balanceOf(address(this));
	stakingToken.approve(address(farm), lpBalance);

	// Actually reinvest and adjust the FP weights!!!
	farm.stake(lpBalance);
	lpTotalBalance += lpBalance;
    }
}
