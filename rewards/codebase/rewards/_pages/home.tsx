import { Link as InternalLink } from 'react-router-dom';
import { Balances, Panel, PanelDescription, PanelHeader } from '../components';

function Link({ url, children }: { url: string; children: any }) {
  const className = 'text-blue-500 underline';
  if (url.startsWith('https://')) {
    return (
      <a href={url} target="_blank" className={className}>
        {children}
      </a>
    );
  }

  return (
    <InternalLink to={url}>
      <a className={className}>{children}</a>
    </InternalLink>
  );
}

export function Dashboard() {
  return (
    <>
      <Panel>
        <div className="flex justify-between space-x-3">
          <div>
            <PanelHeader>Welcome to RewPay</PanelHeader>
            <PanelDescription>
              RewPay is decentralized employee rewards and payments platform on Celo.
            </PanelDescription>
          </div>
          <div className="">
            <div className="text-lg text-gray-500 font-light whitespace-nowrap">
              Net Worth
            </div>
            <div className="text-3xl">$0.00</div>
          </div>
        </div>

        {/* <div className="text-gray-600 dark:text-gray-400 text-sm leading-7">
          <p className="mb-1">Get started right now by:</p>

          <ul className="list-inside list-disc mb-1">
            <li>
              Swapping tokens with <Link url="/swap">Ubeswap</Link>
            </li>
            <li>
              Providing liquidity on <Link url="/lend">Moola Market</Link>
            </li>
            <li>
              <Link url="/earn">Staking</Link> your CELO for passive rewards
            </li>
            <li>
              <Link url="/vote">Voting</Link> on Celo governance proposals
            </li>
            <li>
              <Link url="/stream">Streaming</Link> money in realtime.
            </li>
          </ul>

          <p>
            For any questions hop into the{' '}
            <Link url="https://chat.celo.org">Celo Discord</Link> and look for
            the channel <Link url="https://chat.celo.org">#plockfi</Link>.
          </p>
        </div> */}
      </Panel>

      <Balances />
    </>
  );
}
