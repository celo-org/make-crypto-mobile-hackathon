import { useContractKit } from '@celo-tools/use-contractkit';
import { Address, eqAddress } from '@celo/base';
import { BigNumber } from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import useStateRef from 'react-usestateref';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Web3 from 'web3';
import Image from 'next/image';
import {
  Bold,
  CopyText,
  CustomSelectSearch,
  LockToken,
  Panel,
  PanelDescription,
  PanelGrid,
  PanelHeader,
  PanelWithButton,
  Table,
  toast,
  TokenInput,
} from '../../components';
import { tokens } from '../../constants';
import { Base } from '../../state';
import { formatAmount, truncate, truncateAddress, ProofOfDeposit, VotesForGroupData, GroupData } from '../../utils';


enum States {
  None,
  Activating,
  Revoking,
  Locking,
  Unlocking,
  Voting,
}


export function EarnToken() {
  const { token: tokenTicker } = useParams();
  const token = tokens.find(
    (t) =>
      t.ticker.toLowerCase() === ((tokenTicker as string) || '').toLowerCase()
  );

  const { kit, performActions, address } = useContractKit();
  const {
    accountSummary,
    accountSummaryRef,
    balances,
    track,
  } = Base.useContainer();

  const [state, setState] = useState(States.None);
  const [hasActivatablePendingVotes, setHasActivatablePendingVotes] = useState(false);
  const [groupVotes, setGroupVotes] = useState<VotesForGroupData[]>([]);
  const [groups, setGroups] = useState<GroupData[]>([]);

  const [voteAmount, setVoteAmount] = useState('');
  const [votingName, setVotingName] = useState('');
  const [votingAddress, setVotingAddress] = useState('');

  const [, setLoading, loadingRef] = useStateRef(false);
  const [adding, setAdding] = useState(false);

  const [sort, setSort] = useState({ property: 'score', desc: true });

  const sortFn = useCallback(
    (a, b) => {
      const propA = a[sort.property];
      const propB = b[sort.property];

      if (sort.desc) {
        return propB - propA;
      }
      return propA - propB;
    },
    [sort]
  );

  const activate = async () => {
    track('stake/activate');
    setState(States.Activating);
    try {
      await performActions(async (k) => {
        const pod = new ProofOfDeposit(k, address, token.ticker);
        await pod.activate();
      });
      toast.success('Votes activated');
    } catch (e) {
      toast.error(`Unable to activate votes ${e.message}`);
    }
    setState(States.None);
  };

  const vote = async () => {
    if (!votingAddress) {
      toast.error('Please select a validator group');
      return;
    }

    if (!voteAmount) {
      toast.error('Please enter an amount to stake');
      return;
    }

    track('stake/vote', { address: votingAddress, value: voteAmount });
    setState(States.Voting);
    try {
      await performActions(async (k) => {
        const pod = new ProofOfDeposit(k, address, token.ticker);
        await pod.vote(
          votingAddress,
          new BigNumber(Web3.utils.toWei(voteAmount))
        );
      });
      toast.success('Vote cast');

      setVoteAmount('');
      setVotingAddress('');
      setVotingName('');
    } catch (e) {
      toast.error(`Unable to vote ${e.message}`);
    } finally {
      setState(States.None);
    }
  };

  const revoke = async (groupAddress: string, value: string) => {
    track('stake/revoke', { address, value });
    setState(States.Revoking);
    try {
      await performActions(async (k) => {
        const pod = new ProofOfDeposit(k, address, token.ticker);
        await pod.revoke(groupAddress);
      });
      toast.success('Votes revoked');
    } catch (e) {
      toast.error(`Unable to revoke votes ${e.message}`);
    } finally {
      setState(States.None);
    }
  };

  const fetchVotingSummary = useCallback(async () => {
    if (loadingRef.current) {
      return;
    }
    setLoading(true);

    try {
      const pod = new ProofOfDeposit(kit, accountSummaryRef.current.address, token.ticker);   
  
      setGroupVotes(await pod.getVotesForGroupsData());
      setHasActivatablePendingVotes(await pod.hasActivatablePendingVotes());
      setGroups(await pod.getGroupsData());
    } catch (e) {
      toast.error(`Unable to fetch voting summary ${e.message}`);
    } finally {
      setLoading(false);
      setTimeout(fetchVotingSummary, 1000);
    }
  }, [kit, address, accountSummary]);

  useEffect(() => {
    fetchVotingSummary();
  }, [fetchVotingSummary]);

  const balance = balances[token.ticker];
  const total_locked = balance.total_locked;
  const voting_pct = total_locked.minus(balance.nonvoting_locked).dividedBy(total_locked).times(100);
  const total_unlocking = balance.unlocking;
  const withdrawable_pct = balance.withdrawable.dividedBy(total_unlocking).times(100);
  const voting = balance.total_locked.minus(balance.nonvoting_locked);

  return (
    <>
      <Panel>
        <PanelHeader>Earn with {token.ticker}</PanelHeader>
        <PanelDescription>
        Proof-of-deposit is based on the same mechanism as{' '}
        <a href="https://docs.celo.org/celo-codebase/protocol/proof-of-stake/locked-gold" className="text-blue-500">
          LockedGold
        </a>. As such, your {token.ticker} can be in one of the following states:
          <ul className="list-inside list-disc mb-1">
            <li>
              Available - part of your normal transferable balance.
            </li>
            <li>
              Locked Voting - either pending or active (only active earns passive rewards)
            </li>
            <li>
              Locked Non-Voting
            </li>
            <li>
              Unlocking - either pending or ready to withdraw
            </li>
          </ul>
          <p>
            <a href="https://github.com/yc5915/make-crypto-mobile-hackathon/blob/master/proof_of_deposit/codebase/contracts/contracts/LockedToken.sol" className="text-blue-500">
              Checkout LockedToken
            </a>{' '}(our modification of LockedGold) to see how we have made it compatible with any ERC20 token.
          </p>
        </PanelDescription>
        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-2"></p>

        <div>
          <dl className="grid grid-cols-1 rounded-lg bg-white dark:bg-gray-700 overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-base font-medium text-gray-600 dark:text-gray-200">
                Available
              </dt>
              <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">     
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-300">
                  <Image
                      height="18px"
                      width="18px"
                      src={`/tokens/${token.ticker}.png`}
                    />
                  <div className="px-2">
                    {formatAmount(balances[token.ticker].balance)}
                  </div>
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-base font-medium text-gray-600 dark:text-gray-200">
                Locked (Voting %)
              </dt>
              <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">     
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-300">
                  <Image
                      height="18px"
                      width="18px"
                      src={`/tokens/${token.ticker}.png`}
                    />
                  <div className="px-2">
                    {formatAmount(total_locked)} ({voting_pct.isNaN() ? '0' : voting_pct.toFixed(0)} %)
                  </div>
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-base font-medium text-gray-600 dark:text-gray-200">
                Unlocking (Ready %)
              </dt>
              <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">     
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-300">
                  <Image
                      height="18px"
                      width="18px"
                      src={`/tokens/${token.ticker}.png`}
                    />
                  <div className="px-2">
                    {formatAmount(total_unlocking)} ({withdrawable_pct.isNaN() ? '0' : withdrawable_pct.toFixed(0)} %)
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </Panel>

      <LockToken token={token}/>

      <Panel>
        <PanelGrid>
          <PanelHeader>Vote</PanelHeader>

          <>
            <PanelDescription>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                You currently have <Bold>{formatAmount(balance.nonvoting_locked)}</Bold>{' '}
                out of <Bold>{formatAmount(balance.total_locked)}</Bold> {token.ticker} locked and not yet voted with.
              </div>

              <div className="text-gray-600 dark:text-gray-400 text-sm">
                After voting for any group you must wait an epoch before activating your votes.
                Please ensure you check back here to activate any votes and start earning rewards.
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                You can vote for a maximum of 2 different groups.
              </div>
            </PanelDescription>

            {hasActivatablePendingVotes && (
              <div className="flex">
                <button onClick={activate} className="ml-auto secondary-button">
                  Activate All Pending Votes
                </button>
              </div>
            )}

            <div>
              <ul className="list-decimal list-inside">
                {groupVotes.map((gv) => {
                  const group = groups.find((g) => eqAddress(g.group, gv.group));
                  if (!group) {
                    return null;
                  }
                  return (
                    <li className="flex flex-col mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          {truncate(group.name, 30)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm inline-flex space-x-1">
                          <span>({truncateAddress(group.group)})</span>
                          <CopyText text={group.group} />
                        </span>
                      </div>

                      <div className="relative flex flex-col mt-2">
                        <span className="inline-flex items-center rounded-md text-xs font-medium text-indigo-600">
                          {formatAmount(group.active)} ACTIVE (
                          {group.active.dividedBy(voting).times(100).toFixed(0)}
                          )%
                        </span>
                        <span className="inline-flex items-center rounded-md text-xs font-medium text-blue-600 mt-1">
                          {formatAmount(group.pending)} PENDING (
                          {group.pending.dividedBy(voting).times(100).toFixed(0)}
                          )%
                        </span>
                        <div className="absolute right-0 top-0">
                          {group.active && (
                            <>
                              {state === States.Revoking ? (
                                <Loader
                                  type="TailSpin"
                                  color="white"
                                  height={'12px'}
                                  width="12px"
                                />
                              ) : (
                                <button
                                  className=" text-sm hover:text-gray-600 dark:text-gray-400"
                                  onClick={() =>
                                    revoke(group.group, group.active.toString())
                                  }
                                >
                                  Revoke
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {adding ? (
                <div className="mt-4">
                  <div className="flex flex-col md:flex-row md:space-x-4 items-center">
                    <div className="hidden sm:flex w-full">
                      <CustomSelectSearch
                        options={groups.map((g) => ({
                          value: g.group,
                          name: `${g.name} (${truncateAddress(g.group)})`,
                        }))}
                        placeholder="Choose a validator group"
                        value={votingAddress}
                        onChange={(a) => {
                          setVotingAddress(a);
                        }}
                      />
                    </div>
                    <div className="flex sm:hidden w-full">
                      <select
                        className="py-2 dark:bg-gray-750 rounded-md border border-gray-300 dark:border-gray-500 w-full"
                        value={votingName}
                        onChange={(e) => {
                          const address = e.target[
                            e.target.selectedIndex
                          ].getAttribute('data-address');
                          setVotingName(e.target.value);
                          setVotingAddress(address);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Please choose a validator group...
                        </option>

                        {groups.map((g) => (
                          <option
                            data-address={g.group}
                            value={`${truncate(g.name, 20)} (${truncateAddress(
                              g.group
                            )})`}
                          >
                            {`${truncate(g.name, 20)} (${truncateAddress(
                              g.group
                            )})`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-4 md:mt-0 w-full">
                      <TokenInput
                        value={voteAmount}
                        onChange={(e) => setVoteAmount(e)}
                        max={balance.nonvoting_locked.toString()}
                        token={token}
                      />
                    </div>
                    <button className="primary-button" onClick={vote}>
                      {state === States.Voting ? (
                        <Loader type="TailSpin" height={20} width={20} />
                      ) : (
                        'Vote'
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <button
                    onClick={() => setAdding(true)}
                    className="ml-auto rounded-md px-4 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-750 transition"
                  >
                    New vote
                  </button>
                </div>
              )}
            </div>
          </>
        </PanelGrid>
      </Panel>

      <Panel>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            Validator groups
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            The following validator groups along with their initial active votes are set{' '}
            when instantiating{' '}
            <a href="https://github.com/yc5915/make-crypto-mobile-hackathon/blob/master/proof_of_deposit/codebase/contracts/contracts/Election.sol" className="text-blue-500">
              our modified version of the Election smart contract
            </a>. Our truffle deployment script{' '}
            <a href="https://github.com/yc5915/make-crypto-mobile-hackathon/blob/master/proof_of_deposit/codebase/contracts/migrations/2_locked_tokens.js" className="text-blue-500">
              can be found here
            </a>.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            The further that a Group's Normalised Votes exceeds their Influence, the further that their APY decreases (for this particular token). 
          </p>
        </div>

        <div className="-mx-5">
          <Table
            headers={[
              { displayName: 'Name', sortableProperty: 'name' },
              { displayName: 'APY', sortableProperty: 'apy' },
              { displayName: 'Influence', sortableProperty: 'influence' },
              { displayName: 'Normalised Votes', sortableProperty: 'votes_normalised' },
              { displayName: 'Total Votes', sortableProperty: 'votes' },
              { displayName: 'Your Votes (Active)', sortableProperty: 'active' },
              { displayName: 'Your Votes (Pending)', sortableProperty: 'pending' },
            ]}
            onHeaderClick={(property, desc) => {
              setSort({ property, desc });
            }}
            sort={sort}
            loading={false}
            noDataMessage="No validator groups found"
            rows={groups.sort(sortFn).map(function (g) {
              const col = g.influence.lt(g.votes_normalised) ? "red" : "green";
              return [
                <div>
                  {!g.name ? (
                    <span className="italic">{truncateAddress(g.group)}</span>
                  ) : (
                    truncate(g.name, 20)
                  )}
                </div>,
                <div>
                    <span className={`text-${col}-500 mr-1`}>
                      {g.apy.toFixed(2)}
                    </span>
                    %
                </div>,
                <div>
                  <span className={`text-${col}-500 mr-1`}>
                    {formatAmount(g.influence)}
                  </span>
                </div>,
                <div>
                    <span className={`text-${col}-500 mr-1`}>
                      {formatAmount(g.votes_normalised)}
                    </span>
                </div>,
                <div>
                  {formatAmount(g.votes)}
                </div>,
                <div>
                  {formatAmount(g.active)}
                </div>,
                <div>
                  {formatAmount(g.pending)}
                </div>,
            ]
          })}
          />
        </div>
      </Panel>
    </>
  );
}
