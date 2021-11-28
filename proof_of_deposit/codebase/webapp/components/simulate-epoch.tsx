import { useContractKit } from '@celo-tools/use-contractkit';
import Loader from 'react-loader-spinner';
import { useState } from 'react';
import { toast } from '../components';
import { ProofOfDeposit } from '../utils';
import { PanelWithButton } from './panel';

enum States {
  None,
  Distributing
}

export function SimulateEpochRewards() {
  const { address, performActions } = useContractKit();
  const [state, setState] = useState(States.None);

  const distribute = async () => {
    setState(States.Distributing);
    try {
      await performActions(async (k) => {   
        const pod = new ProofOfDeposit(k, address);
        await pod.distributeEpochRewards();
      });
      toast.success('Rewards distributed');
    } catch (e) {
      toast.error(`Unable to distribute rewards ${e.message}`);
    } finally {
      setState(States.None);
    }
  };

  return (
    <PanelWithButton>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
          Simulate Epoch Rewards
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
          By pressing the button, your wallet will transfer 1 CELO to the election smart contract,{' '}
          whereupon it will be divided amongst lockable tokens as a simulated epoch reward.
        </p>
      </div>

      <button
        className="ml-auto primary-button"
        onClick={distribute}
      >
        {state === States.Distributing ? (
          <Loader type="TailSpin" height={20} width={20} />
        ) : (
          'Distribute 1 CELO'
        )}          
      </button>
    </PanelWithButton>
  );
}
