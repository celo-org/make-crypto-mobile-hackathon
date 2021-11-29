import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { generate } from "shortid";
import Web3 from "web3";
import TransactionItem from "../../components/transactionItem";
import { useLazyGetTransactionsQuery } from "../../redux/api";
import { useAppSelector } from "../../redux/hooks";
import { SelectCurrencies } from "../../redux/reducers/currencies";
import { selectStorage } from "../../redux/reducers/storage";
import { Coins, TransactionFeeTokenName } from "../../types/coins";
import { TransactionDirection, TransactionStatus, TransactionType } from "../../types/dashboard/transaction";
import { CSVLink } from "react-csv";
import lodash from "lodash";
import { Transactions as transactionType } from "../../types/sdk";


const Transactions = () => {
    const storage = useAppSelector(selectStorage);
    const currencies = useAppSelector(SelectCurrencies)

    const [take, setTake] = useState(4)
    const [trigger, { data: transactions, error: transactionError, isLoading }] = useLazyGetTransactionsQuery()
    const [list, setList] = useState<lodash.Dictionary<[transactionType, ...transactionType[]]>>()

    useEffect(() => {
        trigger(storage!.accountAddress)
        const interval = setInterval(() => {
            trigger(storage!.accountAddress)
        }, 15000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (transactions?.result) {
            const res = lodash.groupBy(transactions.result, lodash.iteratee('blockNumber'))
            console.log(res)
            setList(res)
        }

    }, [transactions?.result])

    return <>
        <div>
            <div className="w-full shadow-custom px-5 pt-4 pb-6 rounded-xl">
                <div id="header" className="grid grid-cols-[50%,45%,5%] md:grid-cols-[45%,25%,15%,15%] border-b border-black pb-5 pl-5" >
                    <div className="font-semibold">Recent Transactions</div>
                    <div className="font-semibold">Total Amount</div>
                    <div className="font-semibold hidden md:block">Status</div>
                    <div className="place-self-end ">
                        {transactions && <CSVLink className="font-normal px-5 py-1 rounded-md cursor-pointer bg-greylish bg-opacity-20 flex items-center justify-center xl:space-x-5" filename={"remox_transactions.csv"} data={transactions.result.map(w => ({
                            'Sent From:': w.from,
                            'Amount:': parseFloat(Web3.utils.fromWei(w.value, 'ether')).toFixed(4) + ` ${Coins[Object.entries(TransactionFeeTokenName).find(s => s[0] === w.tokenSymbol)![1]].name}`,
                            'To:': w.to,
                            'Date': dateFormat(new Date(parseInt(w.timeStamp) * 1e3), "mediumDate")
                        }))}>
                            <div className={'hidden xl:block'}>Export</div>
                            <img src="/icons/downloadicon.svg" alt="" />
                        </CSVLink>}
                    </div>

                </div>
                <div>
                    {!isLoading && list ? Object.values(list).reverse().slice(0, take).map((transaction) => {
                        let amount, coin, coinName, direction, date, amountUSD, surplus, type, hash;
                        if (transaction.length === 1) {
                            const tx = transaction[0];
                            hash = tx.blockNumber
                            amount = parseFloat(Web3.utils.fromWei(tx.value, 'ether')).toFixed(2)
                            coin = Coins[Object.entries(TransactionFeeTokenName).find(w => w[0] === tx.tokenSymbol)![1]];
                            coinName = coin.name;
                            direction = tx.from.trim().toLowerCase() === storage!.accountAddress.trim().toLowerCase() ? TransactionDirection.Out : TransactionDirection.In
                            date = dateFormat(new Date(parseInt(tx.timeStamp) * 1e3), "mediumDate")
                            amountUSD = (currencies[coin.name]?.price ?? 0) * parseFloat(parseFloat(Web3.utils.fromWei(tx.value, 'ether')).toFixed(4))
                            surplus = direction === TransactionDirection.In ? '+' : '-'
                            type = direction === TransactionDirection.In ? TransactionType.IncomingPayment : TransactionType.QuickTransfer
                        } else {
                            const tx = transaction;
                            hash = tx[0].blockNumber
                            amount = parseFloat(Web3.utils.fromWei(tx.reduce((a, c) => a + parseFloat(c.value), 0).toString(), 'ether')).toFixed(2)
                            coinName = tx.reduce((a, item, index, arr) => {
                                const coin = Coins[Object.entries(TransactionFeeTokenName).find(w => w[0] === item.tokenSymbol)![1]].name
                                if (!a.includes(coin)) {
                                    a += `${coin}, `;
                                }

                                return a
                            }, '')
                            if (coinName.includes(','))
                                coinName = coinName.slice(0, -2);
                            direction = TransactionDirection.Out
                            date = dateFormat(new Date(parseInt(tx[0].timeStamp) * 1e3), "mm/dd/yyyy hh:MM:ss")
                            amountUSD = tx.reduce((a, c) => {
                                const coin = Coins[Object.entries(TransactionFeeTokenName).find(w => w[0] === c.tokenSymbol)![1]]
                                a += (currencies[coin.name]?.price ?? 0) * parseFloat(parseFloat(Web3.utils.fromWei(c.value, 'ether')).toFixed(4))
                                return a;
                            }, 0)
                            surplus = '-'
                            type = TransactionType.MassPayout
                        }
                        return <TransactionItem key={generate()} hash={hash} amountCoin={`${amount} ${coinName}`} type={type} direction={direction} date={date} amountUSD={`${surplus}${amountUSD.toFixed(3)}$`} status={TransactionStatus.Complated} />

                    }) : <div className="text-center"><ClipLoader /></div>}
                </div>
                {list && take < 100 && take < Object.values(list).length && <div className="flex justify-center py-4">
                    <button className="text-primary px-5 py-3 rounded-xl border border-primary" onClick={() => {
                        if (100 - take < 4) {
                            setTake(100 - (100 - take))
                        } else {
                            setTake(take + 4 < 100 ? take + 4 : 100)
                        }
                    }}>
                        Load More
                    </button>
                </div>}
            </div>
        </div>
    </>
}

export default Transactions;