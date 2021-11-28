pragma solidity ^0.8.0;

interface IElection {
  function vote(address, address, uint256, address, address) external returns (bool);
  function activate(address, address) external returns (bool);
  function revokeActive(address, address, uint256, address, address, uint256) external returns (bool);
  function revokeAllActive(address, address, address, address, uint256) external returns (bool);
  function revokePending(address, address, uint256, address, address, uint256) external returns (bool);
   function distributeEpochRewards(
    address[] memory,
    address[][] memory,
    uint256[][] memory,
    uint256[] memory
  ) external;

  // view functions
  function getTotalVotes(address) external view returns (uint256);
  function getActiveVotes(address) external view returns (uint256);
  function getTotalVotesByAccount(address, address) external view returns (uint256);
  function getPendingVotesForGroupByAccount(address, address, address) external view returns (uint256);
  function getActiveVotesForGroupByAccount(address, address, address) external view returns (uint256);
  function getTotalVotesForGroupByAccount(address, address, address) external view returns (uint256);
  function getActiveVoteUnitsForGroupByAccount(address, address, address) external view returns (uint256);
  function getTotalVotesForGroup(address, address) external view returns (uint256);
  function getActiveVotesForGroup(address, address) external view returns (uint256);
  function getPendingVotesForGroup(address, address) external view returns (uint256);
  
  function getGroupsTotalVotesNormalised(address) external view returns (address[] memory, uint256[] memory, uint256[] memory);
  function getGroupsActiveVotesNormalised(address) external view returns (address[] memory, uint256[] memory, uint256[] memory);
  function getGroupTotalVotesNormalised(address, address) external view returns (uint256, uint256);
  function getGroupActiveVotesNormalised(address, address) external view returns (uint256, uint256);
  function getGroupsInfluenceFromTotalVotes() external view returns (address[] memory, uint256[] memory);
  function getGroupsInfluenceFromActiveVotes() external view returns (address[] memory, uint256[] memory);
  function getGroupInfluenceFromTotalVotes(address) external view returns (uint256);
  function getGroupInfluenceFromActiveVotes(address) external view returns (uint256);

  function getGroupsEpochRewardsFromTotalVotes(address, uint256, bool)
    external view returns (address[] memory, uint256[] memory, uint256[] memory, uint256);
  function getGroupsEpochRewardsFromActiveVotes(address, uint256, bool)
    external view returns (address[] memory, uint256[] memory, uint256[] memory, uint256);

  function getGroupEligibility(address, address) external view returns (bool);
  function getEpochRewards(address, uint256, bool) external view returns (uint256);
  function getGroupsVotedForByAccount(address, address) external view returns (address[] memory);
  function getEligibleValidatorGroups(address) external view returns (address[] memory);
  function getTotalVotesForEligibleValidatorGroups(address)
    external
    view
    returns (address[] memory, uint256[] memory);
  function hasActivatablePendingVotes(address, address, address) external view returns (bool);
}