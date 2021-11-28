pragma solidity ^0.8.0;

// The modifications to this file are the object of the following patent applications: EP20275088.1, GB2016187.3, GB2016186.5.

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./interfaces/ILockedToken.sol";
import "./interfaces/IElection.sol";


abstract contract LockedToken is ILockedToken, ReentrancyGuard
{
    using SafeMath for uint256;
    using Address for address payable; // prettier-ignore

    struct PendingWithdrawal {
        // The value of the pending withdrawal.
        uint256 value;
        // The timestamp at which the pending withdrawal becomes available.
        uint256 timestamp;
    }

    // NOTE: This contract does not store an account's locked token that is being used in electing
    // validators.
    struct Balances {
        // The amount of locked token that this account has that is not currently participating in
        // validator elections.
        uint256 nonvoting;
        // token that has been unlocked and will become available for withdrawal.
        PendingWithdrawal[] pendingWithdrawals;
    }

    mapping(address => Balances) internal balances;

    uint256 public totalNonvoting;
    uint256 public unlockingPeriod;
    address public erc20Address;
    IERC20 public erc20; 
    address public electionAddress;
    IElection private election;

    event UnlockingPeriodSet(uint256 period);
    event TokenLocked(address indexed account, uint256 value);
    event TokenUnlocked(address indexed account, uint256 value, uint256 available);
    event TokenRelocked(address indexed account, uint256 value);
    event TokenWithdrawn(address indexed account, uint256 value);

    /**
    * @param _erc20Address The address of the ERC20 smart contract (e.g. CUSD, CGLD).
    * @param _unlockingPeriod The unlocking period in seconds.
    */
    constructor(address _erc20Address, uint256 _unlockingPeriod) {
        erc20Address = _erc20Address;
        erc20 = IERC20(_erc20Address);
        unlockingPeriod = _unlockingPeriod;
        emit UnlockingPeriodSet(_unlockingPeriod);
    }

    /**
    * @notice Gets address of the ERC20 smart contract.
    */
    function getERC20Address() external view returns (address) {
        return erc20Address;
    }

    /**
    * @notice Set address of election smart contract.
    */
    function setElection(address _electionAddress) public {
        electionAddress = _electionAddress;
        election = IElection(_electionAddress);
    }

    /**
    * @notice Locks token to be used for voting.
    */
    function lock(uint256 amount) external nonReentrant {
        require(amount <= erc20.allowance(msg.sender, address(this)), "insufficient allowance");

        erc20.transferFrom(msg.sender, address(this), amount);

        _incrementNonvotingAccountBalance(msg.sender, amount);
        emit TokenLocked(msg.sender, amount);
    }

    /**
    * @notice Increments the non-voting balance for an account.
    * @param account The account whose non-voting balance should be incremented.
    * @param value The amount by which to increment.
    * @dev Can only be called by the registered Election smart contract.
    */
    function incrementNonvotingAccountBalance(address account, uint256 value) external
    {
        require(msg.sender == electionAddress, "only election contract");
        _incrementNonvotingAccountBalance(account, value);
    }

    /**
    * @notice Decrements the non-voting balance for an account.
    * @param account The account whose non-voting balance should be decremented.
    * @param value The amount by which to decrement.
    * @dev Can only be called by the registered "Election" smart contract.
    */
    function decrementNonvotingAccountBalance(address account, uint256 value) external
    {
        require(msg.sender == electionAddress, "only election contract");
        _decrementNonvotingAccountBalance(account, value);
    }

    /**
    * @notice Increments the non-voting balance for an account.
    * @param account The account whose non-voting balance should be incremented.
    * @param value The amount by which to increment.
    */
    function _incrementNonvotingAccountBalance(address account, uint256 value) private {
        balances[account].nonvoting = balances[account].nonvoting.add(value);
        totalNonvoting = totalNonvoting.add(value);
    }

    /**
    * @notice Decrements the non-voting balance for an account.
    * @param account The account whose non-voting balance should be decremented.
    * @param value The amount by which to decrement.
    */
    function _decrementNonvotingAccountBalance(address account, uint256 value) private {
        balances[account].nonvoting = balances[account].nonvoting.sub(value);
        totalNonvoting = totalNonvoting.sub(value);
    }

    /**
    * @notice Unlocks token that becomes withdrawable after the unlocking period.
    * @param value The amount of token to unlock.
    */
    function unlock(uint256 value) external nonReentrant {
        // require(getAccounts().isAccount(msg.sender), "Unknown account");
        Balances storage account = balances[msg.sender];
        // Prevent unlocking token when voting on governance proposals so that the token cannot be
        // used to vote more than once.
        // require(!getGovernance().isVoting(msg.sender), "Account locked");
        // uint256 balanceRequirement = getValidators().getAccountLockedTokenRequirement(msg.sender);
        // require(
        //     balanceRequirement == 0 ||
        //     balanceRequirement <= getAccountTotalLockedtoken(msg.sender).sub(value),
        //     "Trying to unlock too much token"
        // );
        require(0 <= getAccountTotalLockedToken(msg.sender).sub(value));
        _decrementNonvotingAccountBalance(msg.sender, value);
        uint256 available = block.timestamp.add(unlockingPeriod);
        // CERTORA: the slot containing the length could be MAX_UINT
        account.pendingWithdrawals.push(PendingWithdrawal(value, available));
        emit TokenUnlocked(msg.sender, value, available);
    }

    /**
    * @notice Relocks token that has been unlocked but not withdrawn.
    * @param index The index of the pending withdrawal to relock from.
    * @param value The value to relock from the specified pending withdrawal.
    */
    function relock(uint256 index, uint256 value) external nonReentrant {
        // require(getAccounts().isAccount(msg.sender), "Unknown account");
        Balances storage account = balances[msg.sender];
        require(index < account.pendingWithdrawals.length, "Bad pending withdrawal index");
        PendingWithdrawal storage pendingWithdrawal = account.pendingWithdrawals[index];
        require(value <= pendingWithdrawal.value, "Requested value larger than pending value");
        if (value == pendingWithdrawal.value) {
            deletePendingWithdrawal(account.pendingWithdrawals, index);
        } else {
            pendingWithdrawal.value = pendingWithdrawal.value.sub(value);
        }
        _incrementNonvotingAccountBalance(msg.sender, value);
        emit TokenRelocked(msg.sender, value);
    }

    /**
    * @notice Withdraws token that has been unlocked after the unlocking period has passed.
    * @param index The index of the pending withdrawal to withdraw.
    */
    function withdraw(uint256 index) external nonReentrant {
        // require(getAccounts().isAccount(msg.sender), "Unknown account");
        Balances storage account = balances[msg.sender];
        require(index < account.pendingWithdrawals.length, "Bad pending withdrawal index");
        PendingWithdrawal storage pendingWithdrawal = account.pendingWithdrawals[index];
        require(block.timestamp >= pendingWithdrawal.timestamp, "Pending withdrawal not available");
        uint256 value = pendingWithdrawal.value;
        deletePendingWithdrawal(account.pendingWithdrawals, index);
        require(value <= erc20.balanceOf(address(this)), "Inconsistent balance"); // Modified
        erc20.transfer(msg.sender, value); // Modified
        emit TokenWithdrawn(msg.sender, value);
    }

    /**
    * @notice Returns the total amount of locked token in the system. Note that this does not include
    *   token that has been unlocked but not yet withdrawn.
    * @return The total amount of locked token in the system.
    */
    function getTotalLockedToken() external view returns (uint256) {
        return totalNonvoting.add(election.getTotalVotes(address(this)));
    }

    /**
    * @notice Returns the total amount of locked token not being used to vote in elections.
    * @return The total amount of locked token not being used to vote in elections.
    */
    function getNonvotingLockedToken() external view returns (uint256) {
        return totalNonvoting;
    }

    /**
    * @notice Returns the total amount of locked token for an account.
    * @param account The account.
    * @return The total amount of locked token for an account.
    */
    function getAccountTotalLockedToken(address account) public view returns (uint256) {
        uint256 total = balances[account].nonvoting;
        return total.add(election.getTotalVotesByAccount(address(this), account));
    }

    /**
    * @notice Returns the total amount of non-voting locked token for an account.
    * @param account The account.
    * @return The total amount of non-voting locked token for an account.
    */
    function getAccountNonvotingLockedToken(address account) external view returns (uint256) {
        return balances[account].nonvoting;
    }

    /**
    * @notice Returns the pending withdrawals from unlocked token for an account.
    * @param account The address of the account.
    * @return The value and timestamp for each pending withdrawal.
    */
    function getPendingWithdrawals(address account) external view returns (uint256[] memory, uint256[] memory)
    {
        // require(getAccounts().isAccount(account), "Unknown account");
        uint256 length = balances[account].pendingWithdrawals.length;
        uint256[] memory values = new uint256[](length);
        uint256[] memory timestamps = new uint256[](length);
        for (uint256 i = 0; i < length; i = i.add(1)) {
            PendingWithdrawal memory pendingWithdrawal = (balances[account].pendingWithdrawals[i]);
            values[i] = pendingWithdrawal.value;
            timestamps[i] = pendingWithdrawal.timestamp;
        }
        return (values, timestamps);
    }

    /**
    * @notice Returns the total amount to withdraw from unlocked token for an account.
    * @param account The address of the account.
    * @return Total amount to withdraw.
    */
    function getTotalPendingWithdrawals(address account) external view returns (uint256) {
        uint256 pendingWithdrawalSum = 0;
        PendingWithdrawal[] memory withdrawals = balances[account].pendingWithdrawals;
        for (uint256 i = 0; i < withdrawals.length; i = i.add(1)) {
            pendingWithdrawalSum = pendingWithdrawalSum.add(withdrawals[i].value);
        }
        return pendingWithdrawalSum;
    }

    /**
    * @notice Deletes a pending withdrawal.
    * @param list The list of pending withdrawals from which to delete.
    * @param index The index of the pending withdrawal to delete.
    */
    function deletePendingWithdrawal(PendingWithdrawal[] storage list, uint256 index) private {
        list[index] = list[list.length - 1];
        list.pop();
    }
}