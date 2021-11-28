pragma solidity ^0.8.0;

interface ILockedToken {
  function getERC20Address() external view returns (address);
  function incrementNonvotingAccountBalance(address, uint256) external;
  function decrementNonvotingAccountBalance(address, uint256) external;
  function getAccountTotalLockedToken(address) external view returns (uint256);
  function getTotalLockedToken() external view returns (uint256);
  function getPendingWithdrawals(address) external view returns (uint256[] memory, uint256[] memory);
  function getTotalPendingWithdrawals(address) external view returns (uint256);
  function lock(uint256) external;
  function unlock(uint256) external;
  function relock(uint256, uint256) external;
  function withdraw(uint256) external;
}