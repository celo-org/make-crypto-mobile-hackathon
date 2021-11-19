//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "../../openzeppelin-solidity/contracts/Math.sol";
import "../../openzeppelin-solidity/contracts/SafeMath.sol";
import "../../openzeppelin-solidity/contracts/SafeERC20.sol";

import "./interfaces/IStakingRewards.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IUniswapV2Factory.sol";

contract FarmBot {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    mapping(address => uint256) private _balances;       // Balances of unstaked LP tokens held by the contract
    mapping(address => uint256) private _stakedBalances; // Balances of staked LP tokens stored in the StakingRewards contract
    mapping(address => uint256) private _rewards;        // Balances of claimed rewardsToken held by the contract

    address[] private _users;                            // List of users, used for iterating over above mappings. Functions as a set that cannot be removed from.
    mapping(address => bool); private _userExists;       // Used to check the existence of a user.

    uint256 public totalStaked;            // Total amount currently staked

    IStakingRewards public stakingRewards; // StakingRewards contract address
    IERC20 public rewardsToken;            // Farming reward token
    IUniswapV2Pair public stakingToken;    // Staked token for farming (UBE LP token)
    IUniswapV2Router public router;        // Ubeswap Router

    IERC20 public token0;                  // UBE LP token0
    IERC20 public token1;                  // UBE LP token1

    address[] public path0;                // Path to route rewardsToken to token0 when compounding
    address[] public path1;                // Path to route rewardsToken to token1 when compounding

    constructor(address _stakingRewards, address _router, address[] _path0, address[] _path1) {
        stakingRewards = IERC20(_stakingRewards);
        rewardsToken = IERC20(stakingRewards.rewardsToken);
        stakingToken = IUniswapV2Pair(stakingRewards.stakingToken);
        token0 = IERC20(stakingToken.token0);
        token1 = IERC20(stakingToken.token1);
        path0 = _pathA;
        path1 = _pathB;
        router = IUniswapV2Router(_router)
    }

    /* Autocompounding multi-user farm. Since all LP tokens from all users will be
     * staked in the same farm, whenever a user stakes or unstakes their own LP from the
     * farm, we need to claim the rewards for all users. We do this in order to avoid
     * issues with prorating rewards based on the *time* that user's LP has been in the farm.
     *
     * If we claim whenever the balance of LP in the farm changes, each user's "share" of the
     * bot's staked LP will not need to be prorated w.r.t. time, since all LP has been in the farm
     * for the same duration since the last claim event. All we need to do is keep track
     * of each user's fraction of the total staked LP; when we claim rewards, each
     * user is entitled to a portion of the reward proportional to their fraction of total staked LP.
     *
     * A user's rewards are only eligible for compounding if that user has staked LP. This is a subtle but probably
     * important point. Since we have to claim rewards for all users whenever the staked LP balance changes,
     * rewards will be claimed for a user when they unstake their LP. If that user's rewards are eligible for
     * compounding, they would be converted into LP and staked on the next call to `compound`, which is probably not
     * what they want. You can also imagine a scenario where a user unstakes their LP, with the intent to call withdrawLP
     * and withdrawRewards directly after. A malicious actor could spam `compound`, forcing their rewards to be compounded,
     * and all their LP to be re-staked. This avoids that issue. (Another way to avoid that would be to add another function
     * `unstakeAndWithdrawAll`, which unstakes LP, claims rewards, and sends LP and rewards back to the owner in a single call.)
     */

    // Deposit LP token into contract.
    function depositLP(uint256 amount) public {
        bool transferSuccess = stakingToken.transferFrom(msg.sender, address(this), amount);
        require(transferSuccess, "Transfer failed, aborting deposit");
        _balances[msg.sender] += amount;
        if (!(_userExists[msg.sender])) {
            _users.push(msg.sender)
        }
    }

    // Withdraw LP token from contract.
    function withdrawLP(uint256 amount) public {
        require(_balances[msg.sender] >= amount, "Must have non-zero balance to withdraw");
        bool transferSuccess = stakingToken.transfer(msg.sender, amount);
        require(transferSuccess, "Transfer failed, aborting withdrawal");
        _balances[msg.sender] -= amount;
    }

    // Stake all LP token into farm for one user. Before staking, we need to claim everyone's rewards.
    function stakeLP() public claim {
        stakeLPForAddress(msg.sender)
    }

    // Unstake all LP token from farm for one user. Before unstaking, we need to claim everyone's rewards.
    // If any rewards are claimed for this user, those rewards will not be eligible for future compounding.
    function unstakeLP() public claim {
        require(_stakedBalances[msg.sender] >= 0, "Must have non-zero staked balance to unstake");
        stakingToken.withdraw(_stakedBalances[msg.sender]);
        totalStaked -= _stakedBalances[msg.sender];
        _balances[msg.sender] += _stakedBalances[msg.sender]
        _stakedBalances[msg.sender] = 0;
    }

    // Withdraws all rewards for a user. A user will almost certainly have rewards to withdraw after calling unstakeLP.
    // Since having no staked LP precludes a user from compounding whatever rewards may have been claimed before unstaking,
    // this function allows the user to withdraw those rewards explicitly. For "safety", a user must unstake their LP
    // before withdrawing any remaining rewards (this check is probably not necessary).
    function withdrawRewards() public {
        require(_stakedBalances[msg.sender] == 0, "Must unstake LP before withdrawing rewards");
        require(_rewards[msg.sender] >= 0, "Must have non-zero rewards to withdraw");
        bool transferSuccess = rewardsToken.transfer(msg.sender, _rewards[msg.sender]);
        require(transferSuccess, "Transfer failed, aborting withdrawal");
        _rewards[msg.sender] = 0
    }

    // Claims all rewards for all users in the farm.
    modifier claim {
        uint256 rewards = stakingRewards.rewards(address(this));
        if (rewards > 0) {
            stakingRewards.getReward();
            for (uint i=0; i<_users.length; i++) {
                // Only allocate rewards to users who are staking LP (not strictly necessary).
                if (_stakedBalances[_users[i]] > 0) {
                    // Allocate a fraction of the claimed rewardsToken to each user proportional
                    // to their current share of the staked LP.
                    _rewards[_users[i]] += (_stakedBalances[_users[i]] * rewards) / totalStaked;
                }
            }
        }
    }

    // Stakes all LP for a given address. Used internally when compounding rewards.
    function stakeLPForAddress(address _address) private {
        require(_balances[_address] >= 0, "Must have non-zero balance to stake");
        stakingToken.stake(amount);
        _stakedBalances[_address] += _balances[_address];
        totalStaked += _balances[_address]
        _balances[_address] = 0;
    }

    // Gets the rewards held by this contract that are eligible for compounding.
    function getCompoundableRewards private returns (uint256) {
        uint256 compoundableRewards = 0;
        for (uint i=0; i<_users.length; i++) {
            // It is possible that a user has rewards, but no LP staked in the farm. If this is the case,
            // we should not count that user's rewards towards the amount available for compounding, since
            // they've explicitly removed their LP from the farm (presumably because they do not want to
            // autocompound anymore). This will commonly happen when a user calls `unstakeLP`; their LP
            // will be unstaked, but the claim modifier will have claimed whatever they were owed beforehand.
            if (_stakedBalances[_users[i]] > 0) {
                compoundableRewards += _rewards[_users[i]];
            }
        }
        return compoundableRewards;
    }

    // Compounds rewards for all users. Converts all rewardsToken held by the contract into
    // equal parts token0 and token1, exchanges for LP token, and stakes proportional LP for each user.
    function compound() public claim {
        // THE FOLLOWING IS PSEUDOCODE! the contract calls are much more complicated than this and
        // require additional bookkeeping/arguments/contract calls to work correctly.

        // Get the rewards held by this contract that are eligible for compounding. Not all rewards
        // are eligible, since we don't want to compound rewards for users who have withdrawn their
        // LP from the farm.
        uint256 compoundableRewards = getCompoundableRewards();

        // Split rewards in half
        uint256 halfRewards = compoundableRewards / 2;

        // Swap for token0
        uint256 amountToken0 = router.swapTokensForExactTokens(halfRewards, path0, address(this));
        // Swap for token1
        uint256 amountToken1 = router.swapTokensForExactTokens(halfRewards, path1, address(this));

        // Stake token0/token1 and get LP
        uint256 amountLP = router.addLiquidity(token0, token1, amountToken0, amountToken1, address(this));

        // Each user with LP staked is entitled to new LP equal to their share of
        // compound-eligible rewardsToken previously held by this contract.
        for (uint i=0; i<_users.length; i++) {
            // We must check that the user has a balance staked, since the denominator (compoundableRewards)
            // only takes into account users who are currently staking. Otherwise, not only will the calculation
            // be diluted by those not staking LP, but we would compound for users not eligible for compounding (those
            // with no staked LP).
            if (_stakedBalances[_users[i]] > 0) {
                _balances[_users[i]] += (_rewards[_users[i]] * amountLP) / compoundableRewards;
                _rewards[_users[i]] = 0;
            }
        }

        // Each user who had rewards AND staked LP should now have a non-zero balance. Stake their new LP
        // into the farm and perform bookkeeping. Note that the private stakeLPForAddress does not
        // call the claim modifier, since we claim at the beginning of the compound call. It's necessary
        // to claim at the beginning of this function, since we MUST claim for all users before changing
        // the amount of LP staked in the farm to avoid time-related prorating issues.

        // I think we can safely roll this into the above loop.
        for (uint i=0; i<_users.length; i++) {
            // Same check as above. The require in stakeLPForAddress will throw without this. This check also
            // enforces the semantics of "no staked LP" => "do not compound any rewards I might have".
            if (_stakedBalances[_users[i]] > 0) {
                stakeLPForAddress(_users[i]);
            }
        }
    }
}
