import { PanelWithButton, PanelDescription, PanelHeader } from '../components';
import Image from 'next/image';


export function AboutOurTech() {
  return (
    <>
      <PanelWithButton>
        <div className="justify-between space-x-3">
          <div>
            <PanelHeader>The Untapped Potential of Blockchain's Incentive Mechanism</PanelHeader>
            <PanelDescription>
              <b>Block rewards comprise minted CELO and fees from the entire on-chain economy.</b>
              <p>What are the implications if there was a way to "stake" stablecoins?? It will create a{' '}
              significant market for the stablecoins! (and may be the biggest by far!)</p>
              <br></br>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                Introducing Proof-of-Deposit
              </h3>
              <div style={{ position: 'relative', width: '100%', height: '350px' }}>
                <Image layout='fill' objectFit='contain' src={`/images/pod.png`}/>
              </div>
            </PanelDescription>
          </div>
        </div>

        <button
          className="ml-auto primary-button"
        >
          <a href="http://files.cambridgecryptographic.com/whitepapers/risk_free_v0.4.pdf" target="_blank">
            Read Our Whitepaper
          </a>
        </button>
      </PanelWithButton>

      <PanelWithButton>
        <div className="justify-between space-x-3">
          <div>
            <PanelHeader>Amplifying MarketCap of CELO and Stablecoins</PanelHeader>
            <PanelDescription>
              <b>A positive feedback loop of demand:</b>
              <ul className="list-inside list-disc mb-1">
                <li>
                  An increase in price of CELO means APY on cUSD deposits also increases.
                </li>
                <li>
                  Market forces will deposit more cUSD to bring increased APY back to equilibrium (e.g. from 6% to 5%)
                </li>
                <li>
                  Increased demand for depositing cUSD generates demand for CELO <i>(as part of stablecoin mechanism)</i>
                </li>
                <li>
                  Increased demand for CELO increases price of CELO <i>(looping back to the start!)</i>
                </li>
              </ul>
              <div style={{ position: 'relative', width: '100%', height: '350px' }}>
                <Image layout='fill' objectFit='contain' src={`/images/amplified.png`}/>
              </div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                How Much Amplification?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                We extended the MarketCap Model from <a href="https://celo.org/papers/stability" className="text-blue-500">
                  Celo's stability analysis
                </a> to include <b>"savings"</b>: a new source of demand for CELO that stems from depositing stablecoins in order to earn passive APY.
              </p>
              <iframe width="100%" height="350" scrolling="no" src="//plotly.com/~ying_chan/1.embed"></iframe>
            </PanelDescription>
          </div>
        </div>

        <button
          className="ml-auto primary-button"
        >
          <a href="http://files.cambridgecryptographic.com/whitepapers/marketcap_model_v0.1.pdf" target="_blank">
            Read Our Analysis
          </a>
        </button>
      </PanelWithButton>

      <PanelWithButton>
        <div className="justify-between space-x-3">
          <div>
            <PanelHeader>A Market Determined Risk-Free Rate: Peer-to-Peer Digital Cash</PanelHeader>
            <PanelDescription>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                Digital cash is, of course, intrinsically mobile-first. However, most projects have all{' '}
                but abandoned the original aim of blockchain technology: provision of peer-to-peer digital cash.{' '}
                Though at the time of writing a great many nation states are racing to deploy digital currency (CBDC),{' '}
                these projects are, as a rule, centralised.  
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                The risk free interest rate plays fundamental role in the economy. Before now, it has not been{' '}
                possible for a market to provide a risk-free rate. After-all if a borrower cannot take risk in{' '}
                order to generate profit with money loaned to them, why would they offer any interest in return? 
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                <b>Proof-of-deposit</b> is able to provide a risk-free rate in a decentralised setting, and, when{' '}
                combined with constraints on the expansion of the base monetary base, this enables central banks to{' '}
                limit their own discretion over monetary policy. One major benefit of this technology is that less{' '}
                credible and/or smaller nation states will be able to secure improve terms from international creditors.  
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                We emphasise that our scheme cannot be replicated in a centralised setting, such as that which is{' '}
                the basis of most current CBDC designs.  
              </p>

              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                A Decentralised CBDC: Monetary Policy With Configurable Discretion
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                Ideally, a nation state would prefer to issue and borrow in its own currency, since this is less{' '}
                brittle state-of-affairs, providing greater flexibility, for example, to stimulate their economy{' '}
                during a downturn. However, for some nation states, this option is not available because the{' '}
                international sovereign bond market demands unfeasibly high rates to compensate for the perceived{' '}
                lack of credible monetary policy (e.g. risk of inflation). This can can pressurise the state into dollarisation. 
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                A digital currency deployed on a decentralised blockchain can allow nation states to credibly{' '}
                commit to monetary policy with configurable discretion, in a way that is publicly verifiable:
              </p>
              <ul className="list-inside list-disc mb-1">
                <li>
                  <b>Example</b> <i>(Expansion of monetary base)</i>. A Central Bank can limit their rate of issuance{' '}
                  via a smart contract that enforces a cap on the quantity of (currency) tokens that can be minted{' '}
                  per year (say). Alternatively, the Central Bank can allow the market to control the supply via a{' '}
                  stability mechanism and constrain themselves via limits on the minting of collateral.
                </li>
                <li>
                  <b>Example</b> <i>(Counter-cyclical risk-free rate)</i>. In this case, we cannot simply hardcode a{' '}
                  rule to pick the appropriate rate for a complex system such as an economy. <b>Proof-of-Deposit</b> can{' '}
                  be implemented to create a prediction market on whether an economy is growing at a sustainable rate,{' '}
                  incentivising nodes to offer a high risk-free rate when they deem the economy to be "overheating".
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                Remarkably, choosing to limit discretion can greatly strengthen the de facto independence of a central{' '}
                bank. Among other things, incomplete independence is understood to give rise to a long term down trend in{' '}
                interest rates which eventually results in interest rates hitting zero, whereupon the effectiveness of{' '}
                monetary policy is severely impaired [see our paper summary for detail].  
              </p>
            </PanelDescription>
          </div>
        </div>

        <button
          className="ml-auto primary-button"
        >
          <a href="http://files.cambridgecryptographic.com/whitepapers/configurable_discretion_v0.1.pdf" target="_blank">
            Read Our Summary
          </a>
        </button>
      </PanelWithButton>
    </>
  );
}
