import { useContractKit } from '@celo-tools/use-contractkit';
import { eqAddress } from '@celo/base/lib/address';
import { newReleaseGold } from '@celo/contractkit/lib/generated/ReleaseGold';
import { ReleaseGoldWrapper } from '@celo/contractkit/lib/wrappers/ReleaseGold';
import BigNumber from 'bignumber.js';
import { add, format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import GrantFactory from '../utils/abis/ERC20Vestable.json';
// import {
//   buildStyles,
//   CircularProgressbarWithChildren,
// } from 'react-circular-progressbar';
import Loader from 'react-loader-spinner';
import Web3 from 'web3';
import {
  Input,
  Panel,
  PanelDescription,
  PanelGrid,
  PanelHeader,
  PanelWithButton,
  toast,
} from '../components';
import { Base } from '../state';
import { formatAmount } from '../utils';
// import { deployReleaseCelo } from '../utils/deploy-release-celo';
import Image from 'next/image';

class GradientSVG extends React.Component {
  render() {
    // @ts-ignore
    let { startColor, endColor, idCSS, rotation } = this.props;

    let gradientTransform = `rotate(${rotation})`;

    return (
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={idCSS} gradientTransform={gradientTransform}>
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
      </svg>
    );
  }
}

enum States {
  None = 'None',
  Deploying = 'Deploying',
  Connecting = 'Connecting',
  Withdrawing = 'Withdrawing',
}

const DateToDays = (date: Date) => {
  const days = date.getTime() / 1000;
  const daysFromEpoch = Math.floor(days / 86400);
  return daysFromEpoch;
};

const DaysToDate = (days: number) => {
  const d = days * 86400 * 1000;
  const date = new Date(d);
  return date;
};

const defaultConfig = {
  beneficiary: '',
  start: DateToDays(new Date()),
  duration: '',
  cliffDuration: '',
  interval: '',
	isRevocable: false,
  amount: '',
};

export function NewGrant() {
  const { address, kit, performActions } = useContractKit();
  const { track, isGrantor } = Base.useContainer();

  const [state, setState] = useState(States.None);
  //const [streamAddress, setStreamAddress] = useState('');

  const [config, setConfig] = useState(defaultConfig);

  const update = (property: string, value: any) =>
    setConfig((c) => ({ ...c, [property]: value }));

  // const [stream, setStream] = useState<{
  //   released: BigNumber;
  //   total: BigNumber;
  //   withdrawn: BigNumber;
  //   locked: BigNumber;
  //   unlocked: BigNumber;
  //   address: string;
  //   withdrawable: boolean;
  // } | null>(null);

  // const connect = useCallback(
  //   async (rgAddress: string) => {
  //     track('stream/view');
  //     setState(States.Connecting);

  //     try {
  //       const rgw = new ReleaseGoldWrapper(
  //         kit as any,
  //         newReleaseGold(kit.connection.web3 as any, rgAddress)
  //       );
  //       const accounts = await kit.contracts.getAccounts();
  //       const [
  //         total,
  //         withdrawn,
  //         released,
  //         locked,
  //         unlocked,
  //         beneficiary,
  //       ] = await Promise.all([
  //         rgw.getTotalBalance(),
  //         rgw.getTotalWithdrawn(),
  //         rgw.getCurrentReleasedTotalAmount(),
  //         rgw.getRemainingLockedBalance(),
  //         rgw.getRemainingUnlockedBalance(),
  //         rgw.getBeneficiary(),
  //       ]);

  //       let withdrawable = false;
  //       if (eqAddress(beneficiary, address)) {
  //         withdrawable = true;
  //       }
  //       try {
  //         if (eqAddress(await accounts.signerToAccount(beneficiary), address)) {
  //           withdrawable = true;
  //         }
  //       } catch (e) {}

  //       setStream({
  //         total,
  //         withdrawn,
  //         released,
  //         locked,
  //         unlocked,
  //         address: rgAddress,
  //         withdrawable,
  //       });
  //     } catch (e) {
  //       toast.error(e.message);
  //     } finally {
  //       setState(States.None);
  //     }
  //   },
  //   [kit]
  // );

  // const onSubmit = async(event: React.FormEvent) => {
	// 	event.preventDefault();
	// 	if (account && grantFactoryContract) {
	// 		setLoadingSpinner(true);
	// 		try {
	// 			console.log('grantVestingTokens');
	// 			 const ret = await grantFactoryContract.methods
	// 				.CreateGrant(
	// 					beneficiary,
	// 					new Unit(vestingAmount).asOne().toWei(),
	// 					startDay,
	// 					duration,
	// 					cliffDuration,
	// 					interval,
	// 					isRevocable)
	// 				.send({
	// 					from: account,
	// 					value: new Unit(vestingAmount).asOne().toWei(),
	// 					// gasLimit: '10000001',
	// 					// gasPrice: new hmy.utils.Unit('10').asGwei().toWei(),
	// 					//gasPrice: 1000000000, gasLimit: 6721900,
	// 					gasPrice: 1000000000,
	// 					gasLimit: 31000000,
	// 			});
	// 			console.log(ret);

	// 			toast.success('Transaction done', {
	// 				onClose: async () => {
	// 					await fetchBalance(account);
	// 				},
	// 			});
	// 			setBeneficiary("");
	// 			setVestingAmount("");
	// 			setStartDay("");
	// 			setDuration("");
	// 			setCliffDuration("");
	// 			setInterval("");
	// 			setIsRevocable(false);
	// 			setStartDate(new Date());
	// 		} catch (error) {
	// 			//toast.error(error); // TODO fix
	// 			console.error(error);
	// 		}
	// 		setLoadingSpinner(false);
			
	// 	} else {
	// 		toast.error('Connect your wallet');
	// 	}
	// };


  const getGrants = async () => {
    try {
      const grantFactory = new kit.web3.eth.Contract(
        GrantFactory as any,
        "0x96d468A7Ce643f36c2b823b4068837d5b0913909"
      );
      const grantsResponse =
				await grantFactory.methods.GetDeployedGrants(address).call();
      console.log("Grants: ", grantsResponse);
    } catch (e) {
      toast.error(e.message);
    }

  }
  const deploy = async () => {
    // if (config.end.getTime() < config.start.getTime()) {
    //   toast.error('End date must be after start date');
    //   return;
    // }

    if (!config.amount || !config.beneficiary) {
      toast.error('Missing parameters');
      return;
    }

    track('stream/deploy', { amount: config.amount });

    setState(States.Deploying);

    try {
      await performActions(async (k) => {
        const grantFactory = new kit.web3.eth.Contract(
          GrantFactory as any,
          "0x96d468A7Ce643f36c2b823b4068837d5b0913909"
        );
        const g = await kit.contracts.getGoldToken();
        const gas = await kit.contracts.getGasPriceMinimum();
        const ret = await grantFactory.methods.CreateGrant(
						config.beneficiary,
            new BigNumber(Web3.utils.toWei(config.amount)),
						config.start,
						config.duration,
						config.cliffDuration,
						config.interval,
						config.isRevocable)
					.send({
						from: address,
						value: new BigNumber(Web3.utils.toWei(config.amount)),
						gasPrice: await gas.getGasPriceMinimum(g.address),
				});
				console.log(ret);
      });
      toast.success('Transaction succeeded');
      setConfig(defaultConfig);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setState(States.None);
    }
  };

  // const withdraw = async () => {
  //   setState(States.Withdrawing);
  //   track('stream/withdraw');

  //   try {
  //     await performActions(async (k) => {
  //       const rgw = new ReleaseGoldWrapper(
  //         k as any,
  //         newReleaseGold(kit.connection.web3 as any, stream.address)
  //       );
  //       await rgw
  //         .withdraw(stream.released.minus(stream.withdrawn))
  //         .sendAndWaitForReceipt({ from: k.defaultAccount });
  //     });
  //     connect(stream.address);
  //     toast.success('Withdrawn');
  //   } catch (e) {
  //     toast.error(e.message);
  //   } finally {
  //     setState(States.None);
  //   }
  // };

  const processStartDate = (date: Date) => {
		let daysFromEpoch = DateToDays(date);
		update("start", String(daysFromEpoch));
  };

  

  // const innerRingValue = stream
  //   ? (stream.withdrawn.toNumber() / stream.total.toNumber()) * 100
  //   : 0;
  // const outerRingValue = stream
  //   ? (stream.released.toNumber() / stream.total.toNumber()) * 100
  //   : 0;
  // const releasedPercent = stream
  //   ? stream.released.dividedBy(stream.total).multipliedBy(100).toFixed(0)
  //   : '0';

  return (
    <>
      <Panel>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            Create a new grant
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-2">
            With Plock you can stream funds to recipients for realtime payments.
            This allows recipients to claim their funds on an ongoing basis as
            soon as it becomes available to them.
          </p>
          {/* <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-2">
            Plock enables this functionality via{' '}
            <a
              href="https://docs.celo.org/celo-owner-guide/release-gold"
              className="text-blue-500"
              target="_blank"
            >
              ReleaseCelo
            </a>{' '}
            if you'd like to read more about how it works.
          </p> */}
        </div>
      </Panel>

      {isGrantor && (
				<PanelWithButton>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
              New Grant
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Create a new vesting plan
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="company_website"
                  className="block text-sm font-medium "
                >
                  Beneficiary
                </label>
                <div className="mt-1">
                  <Input
                    type="text"
                    value={config.beneficiary}
                    onChange={(e) => update('beneficiary', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium ">
                  Vesting Amount
                </label>
                <div className="mt-1">
                  <Input
                    type="text"
                    value={config.amount}
                    onChange={(e) => update('amount', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium ">
                  Start Date
                </label>
                <div className="mt-1">
                  <Input
                    type="date"
                    id="start"
                    name="start"
                    value={format(DaysToDate(Number(config.start)), 'yyyy-MM-dd')}
                    onChange={(e) => processStartDate(new Date(e.target.value))}
                    //onChange={(e) => update('start', new Date(e.target.value))}
                    //min="2020-05-01"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="about" className="block text-sm font-medium ">
                  Duration
                </label>
                <div className="mt-1">
                  <Input
                    type="text"
                    value={config.duration}
                    onChange={(e) => update('duration', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="about" className="block text-sm font-medium ">
                  Cliff Duration
                </label>
                <div className="mt-1">
                  <Input
                    type="text"
                    value={config.cliffDuration}
                    onChange={(e) => update('cliffDuration', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="about" className="block text-sm font-medium ">
                  Interval
                </label>
                <div className="mt-1">
                  <Input
                    type="text"
                    value={config.interval}
                    onChange={(e) => update('interval', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="about" className="block text-sm font-medium ">
                  Is Revocable
                </label>
                <div className="mt-1">
                  <Input
                    type="checkbox"
                    checked={config.isRevocable}
                    onChange={(e) => update('isRevocable', e.target.checked)}
                    //placeholder="0"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        <button
          onClick={deploy}
          disabled={state === States.Deploying}
          className="ml-auto primary-button"
        >
          {state === States.Deploying ? (
            <Loader type="TailSpin" height={24} width={24} color="white" />
          ) : (
            'Create Grant'
          )}
        </button>
      </PanelWithButton>)}

      {!isGrantor && (<Panel>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            You have to register grantor
          </h3>
        </div>
      </Panel>)}
      <button
          onClick={getGrants}
          //disabled={state === States.Deploying}
          className="ml-auto primary-button"
      >
        Create Grant
        </button>
      {/* <Panel>
        <PanelGrid>
          <div>
            <PanelHeader>View</PanelHeader>
            <PanelDescription>
              Enter the address of a stream to get an overview of it and
              withdraw funds.
            </PanelDescription>
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="company_website"
                className="block text-sm font-medium "
              >
                Stream address
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <Input
                  type="text"
                  value={streamAddress}
                  onChange={(e) => setStreamAddress(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => connect(streamAddress)}
              disabled={state === States.Connecting}
              className="ml-auto primary-button"
            >
              {state === States.Connecting ? (
                <Loader type="TailSpin" height={24} width={24} color="white" />
              ) : (
                'View'
              )}
            </button>
            {stream && (
              <div className="flex flex-col my-2">
                <GradientSVG
                  // @ts-ignore
                  startColor="#60A5FA"
                  endColor="#1E40AF"
                  rotation="90"
                  idCSS="outer"
                />

                <GradientSVG
                  // @ts-ignore
                  startColor="#B45309"
                  endColor="#FCD34D"
                  rotation="90"
                  idCSS="inner"
                />

                <div className="md:px-24">
                  <CircularProgressbarWithChildren
                    value={outerRingValue}
                    strokeWidth={5}
                    className="OuterCircularProgressbar"
                    styles={buildStyles({
                      trailColor: '#D1D5DB',
                    })}
                  >
                    <div style={{ width: '84%' }}>
                      <CircularProgressbarWithChildren
                        strokeWidth={5}
                        value={innerRingValue}
                        className="InnerCircularProgressbar"
                        styles={buildStyles({
                          trailColor: '#D1D5DB',
                        })}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span className="mb-4">
                            <Image
                              height="40px"
                              width="40px"
                              src="/tokens/CELO.png"
                            />
                          </span>

                          <div className="text-2xl md:text-4xl font-medium text-gray-900 dark:text-gray-200 mb-2">
                            {formatAmount(stream.released)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className=" md:text-xl">
                              / {formatAmount(stream.total)} CELO total
                            </span>
                          </div>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>

                {stream.withdrawable &&
                  stream.released
                    .minus(stream.withdrawn)
                    .gt(Web3.utils.toWei('1', 'ether')) && (
                    <button
                      onClick={withdraw}
                      className="mt-2 ml-auto secondary-button"
                    >
                      Withdraw Remaining
                    </button>
                  )}
              </div>
            )}
          </div>
        </PanelGrid>
      </Panel> */}
    </>
  );
}
