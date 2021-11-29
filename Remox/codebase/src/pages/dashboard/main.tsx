import { useState, useEffect, useContext, useMemo } from 'react';
import { CoinGeckoClient, CoinMarketChartResponse } from 'coingecko-api-v3';
import { ClipLoader } from 'react-spinners';
import CoinItem from '../../components/dashboard/main/coinitem';
import TransactionHistory from '../../components/dashboard/main/transactionHistory'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import storage, { selectStorage } from '../../redux/reducers/storage';
import { useGetBalanceQuery, useGetTransactionsQuery } from '../../redux/api';
import { SelectBalances, SelectCelo, SelectCeur, SelectCurrencies, SelectCusd, updateAllCurrencies, updateUserBalance } from '../../redux/reducers/currencies';
import { AltCoins, Coins, TransactionFeeTokenName } from '../../types/coins';
import { generate } from 'shortid';
import date from 'date-and-time';
import Web3 from 'web3'


interface Balance {
    amount: number,
    per_24?: number,
    percent: number,
    coins: AltCoins,
    reduxValue: number | undefined
}

const Main = () => {
    const dispatch = useAppDispatch()
    const storage = useAppSelector(selectStorage)


    const { data: transactions, error: transactionError, } = useGetTransactionsQuery(storage!.accountAddress)

    const currencies = useAppSelector(SelectCurrencies)
    const celo = (useAppSelector(SelectCurrencies)).CELO
    const cusd = (useAppSelector(SelectCurrencies)).cUSD
    const ceur = (useAppSelector(SelectCurrencies)).cEUR
    const ube = (useAppSelector(SelectCurrencies)).UBE
    const moo = (useAppSelector(SelectCurrencies)).MOO
    const mobi = (useAppSelector(SelectCurrencies)).MOBI
    const poof = (useAppSelector(SelectCurrencies)).POOF

    const balanceRedux = useAppSelector(SelectBalances)
    const celoBalance = (useAppSelector(SelectBalances)).CELO
    const cusdBalance = (useAppSelector(SelectBalances)).cUSD
    const ceurBalance = (useAppSelector(SelectBalances)).cEUR
    const ubeBalance = (useAppSelector(SelectBalances)).UBE
    const mooBalance = (useAppSelector(SelectBalances)).MOO
    const mobiBalance = (useAppSelector(SelectBalances)).MOBI
    const poofBalance = (useAppSelector(SelectBalances)).POOF

    const [percent, setPercent] = useState<number>()
    const [coin, setCoin] = useState<number>()
    const [balance, setBalance] = useState<string>()


    const [lastIn, setIn] = useState<number>()
    const [lastOut, setOut] = useState<number>();

    const [allInOne, setAllInOne] = useState<Balance[]>()

    const all = useMemo(() => {
        if (celoBalance !== undefined && cusdBalance !== undefined && ceurBalance !== undefined && ubeBalance !== undefined && mooBalance !== undefined && mobiBalance !== undefined && poofBalance !== undefined) {
            return {
                celo: celoBalance,
                cUSD: cusdBalance,
                cEUR: ceurBalance,
                UBE: ubeBalance,
                MOO: mooBalance,
                MOBI: mobiBalance,
                POOF: poofBalance
            }
        }
    }, [celoBalance, cusdBalance, ceurBalance, ubeBalance, mooBalance, mobiBalance, poofBalance])

    useEffect(() => {
        console.log(balanceRedux)
    }, [balanceRedux])

    const chart = useMemo(() => {
        if (celoBalance !== undefined && cusdBalance !== undefined && ceurBalance !== undefined && ubeBalance !== undefined && mooBalance !== undefined && mobiBalance !== undefined && poofBalance !== undefined && coin !== undefined) {
            const celoDeg = Math.floor((celoBalance.amount * 100) / coin * 3.6)
            const cusdDeg = Math.floor((cusdBalance.amount * 100) / coin * 3.6) + celoDeg;
            const ceurDeg = Math.floor((ceurBalance.amount * 100) / coin * 3.6) + cusdDeg;
            const ubeDeg = Math.floor((ubeBalance.amount * 100) / coin * 3.6) + ceurDeg;
            const mooDeg = Math.floor((mooBalance.amount * 100) / coin * 3.6) + ubeDeg;
            const mobiDeg = Math.floor((mobiBalance.amount * 100) / coin * 3.6) + mooDeg;
            const poofDeg = Math.floor((poofBalance.amount * 100) / coin * 3.6) + mobiDeg;

            return `conic-gradient(#fbce5c 0deg ${celoDeg}deg, #46cd85 ${celoDeg}deg ${cusdDeg}deg, #040404 ${cusdDeg}deg ${ceurDeg}deg, #6D619A ${ceurDeg}deg ${ubeDeg}deg, #3288ec ${ubeDeg}deg ${mooDeg}deg, #b0d2fc ${mooDeg}deg ${mobiDeg}deg, #7D72FC ${mobiDeg}deg ${poofDeg}deg)`
        }
    }, [celoBalance, cusdBalance, ceurBalance, ubeBalance, mooBalance, mobiBalance, poofBalance, coin, celo, cusd, ceur, ube, moo, mobi, poof])



    useEffect(() => {
        if (celoBalance && cusdBalance && ceurBalance && ubeBalance && mooBalance && mobiBalance && poofBalance) {

            const total = celoBalance.amount + cusdBalance.amount + ceurBalance.amount + ubeBalance.amount + mooBalance.amount + poofBalance.amount + mobiBalance.amount;
            const currencObj = Object.values(currencies)

            const per = currencObj.reduce((a, c) => {
                a += c.percent_24
                return a;
            }, 0)

            const result: number =
                (celoBalance.amount * celoBalance.reduxValue) + (cusdBalance.amount * cusdBalance.reduxValue) +
                (ceurBalance.amount * ceurBalance.reduxValue) + (ubeBalance.amount * ubeBalance.reduxValue) +
                (mooBalance.amount * mooBalance.reduxValue) + (mobiBalance.amount * mobiBalance.reduxValue) +
                (poofBalance.amount * poofBalance.reduxValue)

            setCoin(total)
            setBalance(result.toFixed(2))
            setPercent(per / currencObj.length)

        }
    }, [celoBalance, cusdBalance, ceurBalance, ubeBalance, mooBalance, mobiBalance, poofBalance])


    useEffect(() => {
        if (all) {
            setAllInOne(Object.values(all).sort((a, b) => b.percent.toLocaleString().localeCompare(a.percent.toLocaleString())).slice(0, 4))
        }
    }, [all])

    useEffect(() => {
        if (transactions) {
            let myin = 0;
            let myout = 0;
            transactions.result.forEach(t => {
                const coin = Coins[Object.entries(TransactionFeeTokenName).find(w => w[0] === t.tokenSymbol)![1]];
                const tTime = new Date(parseInt(t.timeStamp) * 1e3)
                if (tTime.getMonth() === new Date().getMonth()) {
                    if (t.from.toLowerCase() === storage?.accountAddress.toLowerCase()) {
                        myout += (parseFloat(Web3.utils.fromWei(t.value, 'ether')) * (currencies[coin.name]?.price ?? 0))
                    } else {
                        myin += (parseFloat(Web3.utils.fromWei(t.value, 'ether')) * (currencies[coin.name]?.price ?? 0))
                    }
                }
            })
            setIn(myin)
            setOut(myout)
        }
    }, [transactions])

    return <main className="grid grid-cols-1 xl:grid-cols-2 w-full gap-5">
        <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2 flex flex-col">
                <div className="flex justify-between pl-4 h-[30px]">
                    <div className="text-base text-greylish">Total Balance</div>
                    <div className="text-base text-greylish opacity-70">24h</div>
                </div>
                <div className="flex justify-between shadow-custom rounded-xl px-8 py-8">
                    <div className="text-4xl">
                        {balance || (balance !== undefined && parseFloat(balance) === 0) ? `$${balance}` : <ClipLoader />}
                    </div>
                    <div className="flex items-center text-3xl text-greylish opacity-70" style={
                        percent && percent > 0 ? { color: 'green' } : { color: 'red' }
                    }>
                        {percent ? `${percent.toFixed(2)}%` : <ClipLoader />}
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between pl-4">
                    <div className="text-base text-greylish">Money in last month</div>
                </div>
                <div className="flex justify-between shadow-custom rounded-xl px-8 py-4">
                    <div className="text-2xl opacity-80">
                        {balance || (balance !== undefined && parseFloat(balance) === 0) ? `+ $${lastIn?.toFixed(2)}` : <ClipLoader />}
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between pl-4">
                    <div className="text-base text-greylish">Money out last month</div>
                </div>
                <div className="flex justify-between shadow-custom rounded-xl px-8 py-4">
                    <div className="ttext-greylish opacity-80 text-2xl">
                        {balance || (balance !== undefined && parseFloat(balance) === 0) ? `- $${lastOut?.toFixed(2)}` : <ClipLoader />}
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div>Asset</div>
                <div>
                    {celoBalance !== undefined && cusdBalance !== undefined && coin !== undefined ? <div className="w-[200px] h-[200px] rounded-full relative" style={{
                        background: chart
                    }}>
                        <div className="w-[120px] h-[120px] bg-white left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                    </div> : null}
                </div>
            </div>
            {
                allInOne !== undefined ?
                    <div className="flex flex-col gap-5 overflow-hidden">
                        {allInOne.map((item, index) => {
                            return <CoinItem key={generate()} title={item.coins.name} coin={item.amount.toFixed(2)} usd={((item.reduxValue ?? 0) * item.amount).toFixed(2)} percent={(item.percent).toFixed(1)} rate={item.per_24} img={item.coins.coinUrl} />
                        })}
                    </div> : <ClipLoader />
            }
        </div>

        <div id="transaction" className="pb-14 pt-[30px]">
            {transactions ? <TransactionHistory transactions={transactions.result.slice(0, 4)} /> : <div className="flex justify-center"> <ClipLoader /></div>}
        </div>
    </main>
}

export default Main;