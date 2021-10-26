import { useContractKit } from '@celo-tools/use-contractkit';
import { tokens } from '../constants';
import { useCallback, useState } from 'react';
import { Base } from '../state';
import { formatAmount } from '../utils';
import { Panel } from './panel';
import { Table } from './table';
import Image from 'next/image';

export function Balances() {
  const [sort, setSort] = useState({ property: 'balance', desc: true });
  const { balances, fetchingBalances } = Base.useContainer();

  const sortFn = useCallback(
    (a, b) => {
      if (sort.property === 'balance') {
        const balanceA = balances[a];
        const balanceB = balances[b];

        if (sort.desc) {
          return balanceB.minus(balanceA).toNumber();
        }
        return balanceA.minus(balanceB).toNumber();
      }

      if (sort.desc) {
        return b.localeCompare(a);
      }
      return a.localeCompare(b);
    },
    [sort, balances]
  );

  return (
    <Panel>
      <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-200">
        Balances
      </h3>

      <div className="-mx-5">
        <Table
          headers={[
            { displayName: 'Token', sortableProperty: 'name' },
            { displayName: 'Balance', sortableProperty: 'balance' },
            { displayName: 'Value', sortableProperty: 'value' },
          ]}
          onHeaderClick={(property, desc) => {
            setSort({ property, desc });
          }}
          sort={sort}
          noDataMessage="No validator groups found"
          loading={fetchingBalances}
          rows={Object.keys(balances)
            .sort(sortFn)
            .map((ticker) => {
              const token = tokens.find((t) => t.ticker === ticker);
              return [
                <div className="flex items-center space-x-2">
                  <Image
                    height="25px"
                    width="25px"
                    src={`/tokens/${ticker}.png`}
                  />
                  <div className="spacey-y-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      {ticker}
                    </div>
                    <div className="text-xs ">{token.name}</div>
                  </div>
                </div>,
                <span className={''}>{formatAmount(balances[ticker])}</span>,
                <span className={''}>Coming soon...</span>,
              ];
            })}
        />
      </div>
    </Panel>
  );
}
