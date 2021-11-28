import { useContractKit } from '@celo-tools/use-contractkit';
import { useState, useCallback, useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { Link } from 'react-router-dom';
import Image from 'next/image';
import {
  Panel,
  PanelDescription,
  PanelHeader,
  Table,
  toast
} from '../../components';
import { tokens } from '../../constants';
import { Base } from '../../state';
import { formatAmount, ProofOfDeposit, EpochRewardsData } from '../../utils';
import { BigNumber } from 'bignumber.js';

export function Earn() {
  const {
    accountSummary,
    accountSummaryRef,
    balances,
  } = Base.useContainer();

  const { kit, address } = useContractKit();

  const [epochRewards, setEpochRewards] = useState<EpochRewardsData[]>([]);
  const [, setLoading, loadingRef] = useStateRef(false);

  const fetchEpochRewards = useCallback(async () => {
    if (loadingRef.current) {
      return;
    }
    setLoading(true);
    try {
      const pod = new ProofOfDeposit(kit, accountSummaryRef.current.address);
      setEpochRewards(await pod.getEpochRewardsData());
    } catch (e) {
      toast.error(`Unable to fetch epoch rewards ${e.message}`);
    } finally {
      setLoading(false);
      setTimeout(fetchEpochRewards, 1000);
    }
  }, [kit, address, accountSummary]);

  useEffect(() => {
    fetchEpochRewards();
  }, [fetchEpochRewards]);


  return (
    <>
      <Panel>
        <PanelHeader>Earn with Proof-of-Deposit</PanelHeader>
        <PanelDescription>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            In Proof-of-Deposit, you can earn passive rewards on your CELO, cUSD and/or cEUR.
            To begin you need to first locked your tokens, then you're free to vote for
            validator groups of your choosing.
          </p>
          <div>
            <dl className="grid grid-cols-1 rounded-lg bg-white dark:bg-gray-700 overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
              {Object.keys(balances)
                .map((ticker) => {
                  const token = tokens.find((t) => t.ticker === ticker);
                  return [
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-base font-medium text-gray-600 dark:text-gray-200">
                          Available {token.ticker}
                        </dt>
                        <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">     
                          <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-300">
                            <Image
                                height="18px"
                                width="18px"
                                src={`/tokens/${ticker}.png`}
                              />
                            <div className="px-2">
                              {formatAmount(balances[token.ticker].balance)}
                            </div>
                          </div>
                        </dd>
                      </div>
                  ];
                })}
            </dl>
          </div>
        </PanelDescription>
      </Panel>
        

      <Panel>
        <PanelHeader>Lockable Tokens</PanelHeader>
        <PanelDescription>
          The Average APY and Epoch Rewards for lockable tokens are calculated based on 1 CELO per epoch{' '}
          and 365 epochs per year with the rewards being divided amongst locked tokens in the following proportions:
          <ul className="list-inside list-disc mb-1">
            <li>
              CELO - 50%
            </li>
            <li>
              cUSD - 25%
            </li>
            <li>
              cEUR - 25%
            </li>
          </ul> 
          <p>
          The proportion of CELO epoch rewards paid to cUSD and cEUR are coverted into{' '}
          their respective currency via <a href="https://ubeswap.org/" className="text-blue-500" target="_blank">Ubeswap</a>. 
          </p>
        </PanelDescription>

        <div className="-mx-5">
          <Table
            headers={[
              '',
              'Ticker',
              'Average APY',
              'Epoch Rewards',
              'Total Votes',
              'Locked (Voting %)',
              'Unlocking (Ready %)',
            ]}
            noDataMessage="No validator groups found"
            loading={false}
            rows={Object.keys(balances)
              .map((ticker) => {
                const total_locked = balances[ticker].total_locked;
                const voting_pct = total_locked.minus(balances[ticker].nonvoting_locked).dividedBy(total_locked).times(100);
                const total_unlocking = balances[ticker].unlocking;
                const withdrawable_pct = total_unlocking.dividedBy(total_unlocking).times(100);
                const rewardData = epochRewards.find(d => d.ticker == ticker);
                const zero = new BigNumber(0);

                return [
                  <Link to={`/earn/${ticker}`}>
                    <span className="px-4 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-300 text-white dark:text-gray-800 transition  rounded">
                      Manage
                    </span>
                  </Link>,
                  <div className="flex items-center space-x-2">
                    <span style={{ minWidth: '20px' }}>
                      <Image
                        src={`/tokens/${ticker}.png`}
                        height={20}
                        width={20}
                        className="rounded-full"
                      />
                    </span>
                    <div>{ticker}</div>
                  </div>,
                  <div>
                    <span className="text-green-500 mr-1">
                      {(rewardData ? rewardData.apy : zero).toFixed(2)}
                    </span>
                    %
                  </div>,
                  <div>
                    <span className="text-green-500 mr-1">
                      {formatAmount(rewardData ? rewardData.epoch_rewards : zero)}
                    </span>
                  </div>,
                  <div className="font-semibold">
                    {formatAmount(rewardData ? rewardData.total_votes : zero)}
                  </div>,
                  <div className="font-semibold">
                    {formatAmount(total_locked)} ({voting_pct.isNaN() ? '0' : voting_pct.toFixed(0)} %)
                  </div>,
                  <div className="font-semibold">
                    {formatAmount(total_unlocking)} ({withdrawable_pct.isNaN() ? '0' : withdrawable_pct.toFixed(0)} %)
                  </div>,
              ];
            })}
          />
        </div>
      </Panel>

    </>
  );
}
