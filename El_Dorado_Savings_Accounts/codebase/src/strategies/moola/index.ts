import { ERC20__factory, MoolaLendingPoolAddressProvider__factory, MoolaMToken__factory } from "../../contracts"
import { MoolaLendingPool__factory } from "../../contracts/factories/MoolaLendingPool__factory"
import { IChainProvider } from "../../IChainProvider"
import { CeloTransactionRequest, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { BigNumber, BigNumberish } from 'ethers'
import { NativeTokenId, sendTransaction } from "../../celo/SignTransaction"
import { formatEther, formatUnits, parseEther, parseUnits } from "@ethersproject/units"

export class MoolaClient {

    constructor(private readonly celo: {
        addressProvider: string
    },
        private readonly provider: IChainProvider) {
        if (!celo.addressProvider) throw new Error('CELO_MOOLA_ADDRESS_PROVIDER not set')
    }

    /**
     * Keeps a ratio of the wallet in the protocol, taking the total user's balance of a token into account
     * @param depositedRatio What % of the total balance (deposited + wallet) should be deposited
     * @param wallet  Instance of a Celo Wallet (Signer capable)
     * @param token atoken capable.
     * @returns results
     */
    async processBalances(depositedRatio: number, wallet: CeloWallet, token: NativeTokenId): Promise<{ wallet: BigNumber, deposited: BigNumber }> {
        const EIGHTTEN_ZEROS = BigNumber.from('10').pow('18')
        const ZERO = BigNumber.from('0')

        expect(EIGHTTEN_ZEROS.toString().length).toBe(19)
        /**
         * Protocol setup
         */
        const addressProvider = MoolaLendingPoolAddressProvider__factory.connect(this.celo.addressProvider, wallet)
        const lendingPool = MoolaLendingPool__factory.connect(await addressProvider.getLendingPool(), wallet)


        /**
         * ERC20 Asset
         */
        const erc20TokenAddress = await this.provider.getTokenContractAddress(token, wallet);
        const erc20 = ERC20__factory.connect(erc20TokenAddress, wallet);
        const decimals = await erc20.decimals()

        /**
         * mToken = aToken
         */
        const assetReserveData = await lendingPool.getReserveData(erc20TokenAddress)
        const mTokenAddress = assetReserveData.aTokenAddress
        const mToken = MoolaMToken__factory.connect(mTokenAddress, wallet);


        /**
         * Balances
         */
        const walletBalance = await erc20.balanceOf(wallet.address)
        //const aTokenScaledBalance = await mToken.scaledBalanceOf(wallet.address)
        const aTokenBalance = await mToken.balanceOf(wallet.address)
        //const aTokenScaleIndex = aTokenBalance.eq('0') ? ZERO : aTokenBalance.mul(EIGHTTEN_ZEROS).div(aTokenScaledBalance)//NOTE: index with 18 zeros /// TODO: need to confirm this, which one is which
        const totalBalance = walletBalance.add(aTokenBalance /*aTokenScaledBalance*/)

        //console.log('aTokenScaleIndex', aTokenScaleIndex.toString())
        /**
         * Calculate which direction to go
         */

        const targetDepositedBalance = totalBalance.mul(depositedRatio * 10000).div(10000)

        const depositAmount = targetDepositedBalance.gt(aTokenBalance) ? targetDepositedBalance.sub(aTokenBalance) : ZERO

        const withdrawDifference = targetDepositedBalance.lt(aTokenBalance) ? aTokenBalance.sub(targetDepositedBalance) : ZERO
        const withdrawAmount = withdrawDifference//aTokenScaleIndex.eq('0') ? ZERO : withdrawDifference.mul(EIGHTTEN_ZEROS).div(aTokenScaleIndex)



        console.log('Wallet Balance', formatEther(walletBalance))
        console.log('Deposited balance', formatEther(aTokenBalance))
        //console.log('Deposited balance scaled', formatEther(aTokenScaledBalance))
        console.log('Total', formatEther(totalBalance))
        console.log('Ratio', depositedRatio)
        console.log('Target Deposited', formatEther(targetDepositedBalance))
        console.log('Deposit amount', formatEther(depositAmount))
        console.log('Withdraw amount', formatEther(withdrawAmount))


        const gasPrice = await wallet.getGasPrice(erc20TokenAddress)
        const gasLimit = 3000000

        // console.log('gasLimit', gasLimit)
        // console.log('gasPrice', gasPrice.toString())

        const sendTX = (txRequest: CeloTransactionRequest) => {
            return sendTransaction(this.provider.getProvider(), wallet, txRequest, {
                gasLimit: gasLimit.toString(),
                gasPrice: gasPrice.toString(),
                feeTokenAddress: erc20TokenAddress,
            }, true)
        }

        if (depositAmount.gt(parseUnits('1', decimals))) {
            await this.allow(erc20TokenAddress, lendingPool.address, wallet, walletBalance)
            console.log('Starting deposit TX', formatUnits(depositAmount, decimals))
            const depositTx = await lendingPool.populateTransaction.deposit(erc20TokenAddress, depositAmount, wallet.address, '0', {
                gasLimit: gasLimit,
                gasPrice: gasPrice,
            })

            const { txResponse, txReceipt } = await sendTX(depositTx)
        }

        if (withdrawAmount.gt(parseUnits('1', decimals))) {
            console.log('Starting withdraw TX', formatUnits(withdrawAmount, decimals))
            const withdrawTX = await lendingPool.populateTransaction.withdraw(erc20TokenAddress, withdrawAmount, wallet.address, {
                gasLimit: gasLimit,
                gasPrice: gasPrice,
            })

            const { txResponse, txReceipt } = await sendTX(withdrawTX)
        }


        return {
            wallet: await erc20.balanceOf(wallet.address),
            deposited: await mToken.balanceOf(wallet.address)
        }

    }

    async allow(erc20Address: string, spender: string, signer: CeloWallet, amount: BigNumberish) {
        const erc20 = ERC20__factory.connect(erc20Address, signer)
        const allowance = await erc20.allowance(signer.address, spender)
        const newAllow = (BigNumber.from(amount)).mul(10)
        if (allowance.lt(newAllow)) {
            const gasPrice = await signer.getGasPrice(erc20Address)
            console.log('Increasing allowance', await erc20.name(), allowance.toString(), '=>', newAllow.toString())
            const approveTX = await erc20.approve(spender, newAllow, { gasPrice: gasPrice })
            await approveTX.wait()
        }
    }
}