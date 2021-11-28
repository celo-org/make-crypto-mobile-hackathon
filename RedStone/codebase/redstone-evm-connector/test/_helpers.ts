import {ethers, network} from "hardhat";
import {BigNumber} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import * as sinon from "sinon";

export const toWei = ethers.utils.parseUnits;
export const fromWei = (val: BigNumber) => parseFloat(ethers.utils.formatEther(val));
export const fromWeiS = (val: BigNumber) => ethers.utils.formatEther(val);
export const toBytes32 = ethers.utils.formatBytes32String;

export type Second = number;

export const time = {
  increase: async (duration: Second) => {
    await network.provider.send("evm_increaseTime", [duration]);
    await network.provider.send("evm_mine");
  },
  duration: {
    years: (years: number): Second => {
      return 60 * 60 * 24 * 365 * years; //TODO: leap years..
    },
    months: (months: number): Second => {
      return 60 * 60 * 24 * 30 * months; // ofc. it is simplified..
    },
    days: (days: number): Second => {
      return 60 * 60 * 24 * days;
    },
    hours: (hours: number): Second => {
      return 60 * 60 * hours;
    },
    minutes: (minutes: number): Second => {
      return 60 * minutes;
    }
  }
}

export const getFixedGasSigners = async function (gasLimit: number) {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  signers.forEach(signer => {
    let orig = signer.sendTransaction;
    signer.sendTransaction = function (transaction) {
      transaction.gasLimit = BigNumber.from(gasLimit.toString());
      return orig.apply(signer, [transaction]);
    }
  });
  return signers;
};

export const syncTime = async function () {
  const now = Math.ceil(new Date().getTime() / 1000);
  try {
    await ethers.provider.send('evm_setNextBlockTimestamp', [now]);
  } catch (error) {
    //Skipping time sync - block is ahead of current time
  }
};


/**
 * this function allows to mock functions of a given module.
 * it returns a function, that allows to override default mocks.
 *
 * @param moduleToMock - name of the module to mock
 * @param defaultMockValuesForMock - default mock values, that can be overwritten by each test independently
 */
export function mockModule<T extends { [K: string]: any }>(
  moduleToMock: T, defaultMockValuesForMock?: Partial<{ [K in keyof T]: T[K] }>) {

  return (sandbox: sinon.SinonSandbox, returnOverrides?: Partial<{ [K in keyof T]: T[K] }>): void => {
    const allMockedFunctions = new Set(
      Object.keys(defaultMockValuesForMock || []).concat(Object.keys(returnOverrides || []))
    );

    allMockedFunctions.forEach((f) => {
      const fake: Partial<{ [K in keyof T]: T[K] }>[string] = returnOverrides?.hasOwnProperty(f)
        ? returnOverrides[f]
        : defaultMockValuesForMock!![f];

      sandbox.stub(moduleToMock, f).callsFake(fake as { (...args: unknown[]): unknown } /*some crap to make tsc happy*/);
    });
  };
}
