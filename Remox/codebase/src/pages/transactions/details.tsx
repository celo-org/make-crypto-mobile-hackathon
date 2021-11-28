import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { generate } from "shortid";
import Web3 from "web3";
import Dropdown from "../../components/dropdown";
import TransactionItem from "../../components/transactionItem";
import { useLazyGetTransactionsQuery } from "../../redux/api";
import { useAppSelector } from "../../redux/hooks";
import { SelectCurrencies } from "../../redux/reducers/currencies";
import { selectStorage } from "../../redux/reducers/storage";
import { Coins, CoinsURL, TransactionFeeTokenName } from "../../types/coins";
import { TransactionDirection, TransactionStatus, TransactionType } from "../../types/dashboard/transaction";
import { DropDownItem } from "../../types/dropdown";
import transactions from "./transactions";
import lodash from "lodash";
import { Transactions } from "../../types/sdk";

const Details = () => {
    const storage = useAppSelector(selectStorage);
    const currencies = useAppSelector(SelectCurrencies)
    const params = useParams<{ id: string }>()

    const [totalAmount, setTotalAmount] = useState<number>();

    const [take, setTake] = useState(4)
    const [list, setList] = useState<lodash.Dictionary<[Transactions, ...Transactions[]]>>()
    const [trigger, { data: transactions, error: transactionError, isLoading }] = useLazyGetTransactionsQuery()

    useEffect(() => {
        trigger(storage!.accountAddress)
    }, [])

    useEffect(() => {
        if (transactions?.result) {
            const res = lodash.groupBy(transactions.result, lodash.iteratee('blockNumber'))
            setList(res)
            console.log(params)
        }

    }, [transactions?.result])


    useEffect(() => {
        if (list) {
            const total = lodash.round(list[params.id].reduce((a, c) => {
                const coin = Coins[Object.entries(TransactionFeeTokenName).find(w => w[0] === c.tokenSymbol)![1]]
                a += (currencies[coin.name]?.price ?? 0) * Number(Web3.utils.fromWei(c.value, 'ether'))
                return a;
            }, 0), 6)
            setTotalAmount(total)
        }
    }, [list])

    return <>
        <div>
            <div className="w-full shadow-custom px-5 py-14 rounded-xl flex flex-col">
                <div className="font-bold text-2xl">
                    Transaction Details
                </div>
                {list ? <div className="grid grid-cols-3 py-5 gap-14">
                    <Dropdown displayName="Transaction Hash" className="h-full bg-greylish bg-opacity-10" onSelect={(w: DropDownItem) => {
                        window.open(`https://explorer.celo.org/tx/${w.name}/token-transfers`, '_blank')
                    }} nameActivation={true} selected={{ name: list[params.id][0].hash, coinUrl: CoinsURL.None }} list={[
                        ...list[params.id].map(w => ({ name: w.hash, coinUrl: CoinsURL.None })),
                    ]} />
                    {TransactionDetailInput("Paid To", `${list[params.id].length} people`)}
                    {TransactionDetailInput("Total Amount", `${totalAmount} USD`)}
                    {TransactionDetailInput("Transaction Fee", `${list[params.id].reduce((a, c) => {
                        a += Number(Web3.utils.fromWei((Number(c.gasUsed) * Number(c.gasPrice)).toString(), 'ether'))
                        return a
                    }, 0)}`)}
                    {TransactionDetailInput("Created Date & Time", `${dateFormat(new Date(Number(list[params.id][0].timeStamp) * 1e3), 'dd/mm/yyyy hh:MM:ss')}`)}
                    {TransactionDetailInput("Status", "Completed")}
                    <Dropdown displayName="Wallet Address" className="h-[75px] bg-greylish bg-opacity-10" nameActivation={true} selected={{ name: list[params.id][0].from !== storage!.accountAddress ? list[params.id][0].from : list[params.id][0].to, coinUrl: CoinsURL.None }}
                        onSelect={() => { }}
                        list={[
                            ...list[params.id].map(w => ({ name: w.hash, coinUrl: CoinsURL.None })),
                        ]} />
                </div> : <ClipLoader />}
            </div>
        </div>
    </>
}

export default Details;


const TransactionDetailInput = (title: string, children: JSX.Element | JSX.Element[] | string) => {

    return <div className="bg-greylish bg-opacity-10 flex flex-col px-4 py-3 rounded-xl min-h-[75px]">
        <div className="text-sm text-greylish opacity-80">
            {title}
        </div>
        <div className="font-bold text-lg">
            {children}
        </div>
    </div>
}