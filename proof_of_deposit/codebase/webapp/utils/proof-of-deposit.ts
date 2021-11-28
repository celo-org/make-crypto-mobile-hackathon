import ElectionABI from './abis/Election.json';
import { BigNumber } from 'bignumber.js';
import { Address, eqAddress } from '@celo/base';
import { AddressUtils } from '@celo/utils';
import { locked_tokens, tokens, Celo, Token, LockedToken } from '../constants';
import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import ERC20 from './abis/ERC20.json';


const electionAddress = ElectionABI.networks["44787"].address;
const totalEpochRewards = new BigNumber(Web3.utils.toWei("1"));
const epochs_per_year = new BigNumber("365");

function calcAPY(epochRewards: BigNumber, votes: BigNumber) : BigNumber {
  return epochs_per_year.times(epochRewards).div(votes).times(100);
}

export interface VotesForGroupData {
  group: string;
  pending: BigNumber;
  active: BigNumber;
}

export interface GroupData extends VotesForGroupData {
  name: string;
  influence: BigNumber;
  epoch_rewards: BigNumber;
  votes: BigNumber;
  votes_normalised: BigNumber;
  apy: BigNumber
}

export interface EpochRewardsData {
  ticker: string;
  epoch_rewards: BigNumber; 
  apy: BigNumber;
  total_votes: BigNumber;
}


export class ProofOfDeposit {
  contract : Contract;
  kit;
  token: Token;
  lockedToken : LockedToken;
  account : Address;

  constructor(kit, account: Address, tokenTicker: string = "") {
    this.kit = kit;
    this.token = tokens.find(t => t.ticker == tokenTicker);
    this.lockedToken = locked_tokens[tokenTicker];
    this.account = account;
    this.contract = new kit.web3.eth.Contract(
      ElectionABI.abi as any,
      electionAddress
    );
  }

  private async _findLesserAndGreaterAfterVote(groupAddress: Address, value: BigNumber) {
    let currentVotes = await this._getTotalVotesForEligibleValidatorGroups();
    let selectedGroup = currentVotes.find((votes) => eqAddress(votes.address, groupAddress));

    let voteTotal = selectedGroup ? selectedGroup.votes.plus(value) : value;
    let greaterKey = "0x0000000000000000000000000000000000000000";
    let lesserKey = "0x0000000000000000000000000000000000000000";
    // This leverages the fact that the currentVotes are already sorted from
    // greatest to lowest value
    for (let _i = 0, currentVotes_1 = currentVotes; _i < currentVotes_1.length; _i++) {
        let vote = currentVotes_1[_i];
        if (!eqAddress(vote.address, groupAddress)) {
            if (vote.votes.isLessThanOrEqualTo(voteTotal)) {
                lesserKey = vote.address;
                break;
            }
            greaterKey = vote.address;
        }
    }
    return { lesser: lesserKey, greater: greaterKey };
  }

  private async _setAllowance(erc20: Contract, receipient: Address, allowance: string, min_allowance: string) {
    const _min_allowance = new BigNumber(min_allowance); 
    const _allowance = new BigNumber(await erc20.methods.allowance(this.account, receipient).call());
    if (_allowance.lt(_min_allowance)) { 
      const tx = await this.kit.sendTransactionObject(
        await erc20.methods.approve(receipient, allowance),
        { from: this.account }
      );         
      await tx.waitReceipt(); 
    }
  }

  private async _getTotalVotesForEligibleValidatorGroups(){
    let currentVotes = await this.contract.methods.getTotalVotesForEligibleValidatorGroups(this.lockedToken.address).call();
    return currentVotes[0].map((g, i) => {
      return {
        address: g,
        name: `Group ${g.slice(-1).toUpperCase()}`,
        votes: new BigNumber(currentVotes[1][i])
      }
    })
  }

  public async getGroupsVotedForByAccount() : Promise<Address[]> {
    if (eqAddress(this.account, AddressUtils.NULL_ADDRESS)) {
      return [];
    } else {
      return await this.contract.methods.getGroupsVotedForByAccount(this.lockedToken.address, this.account).call();
    }
  }
  
  public async activate(){
    let groups = await this.getGroupsVotedForByAccount();
    let isActivatable = await Promise.all(
      groups.map(function (g) { 
        return this.contract.methods.hasActivatablePendingVotes(this.lockedToken.address, this.account, g).call(); 
      }, this)
    );
    let groupsActivatable = groups.filter(function (_, i) { return isActivatable[i]; });
    const txs = await Promise.all(
      groupsActivatable.map(function (g) { 
        const txObject = this.contract.methods.activate(this.lockedToken.address, g);
        return this.kit.sendTransactionObject(txObject, { from: this.account });
      }, this)
    );
    await Promise.all(txs.map(tx => tx.waitReceipt()));
  }

  public async vote(groupAddress: Address, value: BigNumber){
    const _a = await this._findLesserAndGreaterAfterVote(groupAddress, value), lesser = _a.lesser, greater = _a.greater;
    const txObject = await this.contract.methods.vote(this.lockedToken.address, groupAddress, value.toFixed(0), lesser, greater);
    const tx = await this.kit.sendTransactionObject(txObject, { from: this.account });
    await tx.waitReceipt();
  }

  private async _revokePending(groupAddress: Address, value: BigNumber){
    let groups = await this.getGroupsVotedForByAccount()
    let index = groups.indexOf(groupAddress);
    let _a = await this._findLesserAndGreaterAfterVote(groupAddress, value.times(-1)), lesser = _a.lesser, greater = _a.greater;
    let txObject = await this.contract.methods.revokePending(this.lockedToken.address, groupAddress, value.toFixed(0), lesser, greater, index);
    return this.kit.sendTransactionObject(txObject, { from: this.account });
  }

  private async _revokeActive(groupAddress: Address, value: BigNumber){
    let groups = await this.getGroupsVotedForByAccount();
    let index = groups.indexOf(groupAddress);
    let _a = await this._findLesserAndGreaterAfterVote(groupAddress, value.times(-1)), lesser = _a.lesser, greater = _a.greater;
    let txObject = await this.contract.methods.revokeActive(this.lockedToken.address, groupAddress, value.toFixed(0), lesser, greater, index);
    return this.kit.sendTransactionObject(txObject, { from: this.account });
  }

  public async revoke(groupAddress: Address){
    const vote = await this._getVotesForGroup(groupAddress);
    let revokes = [];
    if (vote.pending.gt(0)){
      revokes.push(await this._revokePending(groupAddress, vote.pending));
    }
    if (vote.active.gt(0)){
      revokes.push(await this._revokeActive(groupAddress, vote.active));
    }
    const txs = await Promise.all(revokes);
    await Promise.all(txs.map(tx => tx.waitReceipt()));
  }

  public async withdraw() {
    const lockederc20 = new this.kit.web3.eth.Contract(
        this.lockedToken.contract.abi,
        this.lockedToken.address
    );
    
    const pendingWithdrawals = await lockederc20.methods.getPendingWithdrawals(this.account).call();
    const currentTime = Math.round(new Date().getTime() / 1000);

    let txObjects = [];
    for (let i = pendingWithdrawals[0].length - 1; i >= 0; i--) {
      let time = new BigNumber(pendingWithdrawals[1][i]);
      if (time.isLessThan(currentTime)) {
        let txObject = await lockederc20.methods.withdraw(i);
        txObjects.push(this.kit.sendTransactionObject(txObject, { from: this.account }));
      }
    }

    const txs = await Promise.all(txObjects);
    await Promise.all(txs.map(tx => tx.waitReceipt()));
  }

  public async unlock(amount: string) {
    const lockederc20 = new this.kit.web3.eth.Contract(
        this.lockedToken.contract.abi,
        this.lockedToken.address
    );

    const txObject = await lockederc20.methods.unlock(Web3.utils.toWei(amount));
    const tx = await this.kit.sendTransactionObject(txObject, { from: this.account });
    await tx.waitReceipt();
  }

  public async lock(amount: string) {
    const erc20 = new this.kit.web3.eth.Contract(
        ERC20 as any,
        this.token.address
    );
    const lockederc20 = new this.kit.web3.eth.Contract(
        this.lockedToken.contract.abi,
        this.lockedToken.address
    );

    const _amount = Web3.utils.toWei(amount);
    await this._setAllowance(erc20, this.lockedToken.address, _amount, _amount);
    
    const txObject = await lockederc20.methods.lock(_amount);
    const tx = await this.kit.sendTransactionObject(txObject, { from: this.account });
    await tx.waitReceipt();
  }

  public async hasActivatablePendingVotes() : Promise<boolean> {
    let groups = await this.getGroupsVotedForByAccount();
    let isActivatable = await Promise.all(
      groups.map(g => this.contract.methods.hasActivatablePendingVotes(this.lockedToken.address, this.account, g).call(), this)
    );
    return isActivatable.some(function (a) { return a; });
  }

  public async distributeEpochRewards() {
    // set cgld allowance if necessary
    const cgld = new this.kit.web3.eth.Contract(
      ERC20 as any,
      Celo.address
    );       
    await this._setAllowance(cgld, electionAddress, Web3.utils.toWei("1000"), totalEpochRewards.toFixed(0));

    // get data to pass to distributeEpochRewards. This will ultimately be done by the VM
    const lockedAddresses = tokens.map(t => locked_tokens[t.ticker].address);
    const epochRewardData = await Promise.all(lockedAddresses.map(
        a => this.contract.methods.getGroupsEpochRewardsFromActiveVotes(a, totalEpochRewards.toFixed(0), false).call()
    ))

    // epochRewardData [groups, influence, groupsEpochRewards, epochRewards]
    const groups = epochRewardData.map(r => r[0]);
    const groupsEpochRewards = epochRewardData.map(r => r[2]);
    const epochRewards = epochRewardData.map(r => r[3]);

    const tx = await this.kit.sendTransactionObject(
      await this.contract.methods.distributeEpochRewards(
        lockedAddresses, groups, groupsEpochRewards, epochRewards
      ), 
      { from: this.account, gas: 10000000 }
    );
    await tx.waitReceipt();
  }

  public async getEpochRewardsData() : Promise<EpochRewardsData[]> {
    const lockedAddresses = tokens.map(t => locked_tokens[t.ticker].address);
    const [epochRewards, totalVotes] = await Promise.all([
      Promise.all(
        lockedAddresses.map(a => this.contract.methods.getEpochRewards(a, totalEpochRewards.toFixed(0), true).call())
      ),
      Promise.all(
        lockedAddresses.map(a => this.contract.methods.getTotalVotes(a).call())
      )
    ]);
    
    return tokens.map((t, i) => {
      const epoch_rewards = new BigNumber(epochRewards[i]);
      const total_votes = new BigNumber(totalVotes[i]);
      return {
        ticker: t.ticker,
        epoch_rewards,
        total_votes,
        apy: calcAPY(epoch_rewards, total_votes)
      }
    })
  }

  public async getTotalVotes() : Promise<BigNumber> {
    return new BigNumber(await this.contract.methods.getTotalVotes(this.lockedToken.address).call());
  }

  private async _getVotesForGroup(groupAddress: Address) : Promise<VotesForGroupData> {
    let pending = await this.contract.methods.getPendingVotesForGroupByAccount(
      this.lockedToken.address, groupAddress, this.account
    ).call();
    let active = await this.contract.methods.getActiveVotesForGroupByAccount(
      this.lockedToken.address, groupAddress, this.account
    ).call();
    return {
        group: groupAddress,
        pending: new BigNumber(pending),
        active: new BigNumber(active),
    }
  }

  public async getVotesForGroupsData() : Promise<VotesForGroupData[]> {
    return await Promise.all<VotesForGroupData>(
      (await this.getGroupsVotedForByAccount())
      .map(g => this._getVotesForGroup(g), this)
    );
  }

  public async getGroupsData() : Promise<GroupData[]> {
    const accountVotesData = await this.getVotesForGroupsData();
    const [epochRewardData, votesData] = await Promise.all([
      this.contract.methods.getGroupsEpochRewardsFromTotalVotes(this.lockedToken.address, totalEpochRewards.toFixed(0), true).call(),
      this.contract.methods.getGroupsTotalVotesNormalised(this.lockedToken.address).call(),
    ]);

    // epochRewardData [groups, influence, groupsEpochRewards, epochRewards]
    let groupData = epochRewardData[0].map((g, i) => {
      const a = accountVotesData.find(d => eqAddress(g, d.group));
      return {
          ...(a ? a : {
            active: new BigNumber(0),
            pending: new BigNumber(0),
          }),
          group: g,
          name: `Group ${g.slice(-1).toUpperCase()}`,
          influence: new BigNumber(epochRewardData[1][i]), 
          epoch_rewards: new BigNumber(epochRewardData[2][i])
        }  
    })
    // votesData [groups, votes, normalised_votes]
    groupData = votesData[0].map((g, i) => {
      const d = groupData.find(d => eqAddress(g, d.group));
      const votes = new BigNumber(votesData[1][i]);
      const votes_normalised = new BigNumber(votesData[2][i]);
      const apy = calcAPY(d.epoch_rewards, votes);
      return {
        ...d,
        votes, 
        votes_normalised,
        apy
      }
    })

    return groupData;
  }
}