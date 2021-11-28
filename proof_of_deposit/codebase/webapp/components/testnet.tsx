import { PanelWithButton } from '../components';

export function TestNetNotice() {

  return (
      <PanelWithButton>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            NOTICE: This is a Proof of Concept Deployed on Alfajores Testnet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-2">
            We <b>STRONGLY RECOMMEND</b> connecting using a <b>PLAINTEXT PRIVATE KEY</b> for the best experience!
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-2">
            You can generate a random private key and get some funds via the buttons below.
          </p>
        </div>

        <div>
            <button
              className="ml-auto primary-button"
            >
              <a href="https://celo.org/developers/faucet" target="_blank">
                Fund your Account
              </a>
            </button>
            {'    '}
            <button
              className="ml-auto primary-button"
            >
              <a href="https://vanity-eth.tk/" target="_blank">
                Generate a Private Key
              </a>
            </button>
          </div>
      </PanelWithButton>
  );
}
