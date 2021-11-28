import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TransactionType, TransactionDirection, TransactionStatus } from "../types/dashboard/transaction"

const TransactionItem = ({ type, direction, date, amountUSD, status, amountCoin, hash }: { hash: string, type: TransactionType, direction: TransactionDirection, date: string, amountUSD: string, amountCoin: string, status: TransactionStatus }) => {
    
    const [detect, setDetect] = useState(true);
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if(divRef.current && window.outerWidth / divRef.current.clientWidth > 3){
            setDetect(false)
        }
    },[])
    
    return <div ref={divRef} className={`grid ${detect ? 'grid-cols-[50%,45%,5%] md:grid-cols-[45%,25%,15%,15%] pl-5' : 'grid-cols-[1.5fr,1fr,1fr]'} min-h-[115px] py-6 border-b border-black `}>
        <div className="flex space-x-5">
            <div className="flex items-center justify-center">
                <div className="bg-greylish bg-opacity-10 w-[40px] h-[40px] flex items-center justify-center rounded-full">
                    {TransactionDirection.Out === direction ? <img src="/icons/uparrow.svg" alt="" className="w-[25px] h-[25px]" /> : <img src="/icons/uparrow.svg" className="rotate-180" alt="" />}
                </div>
            </div>
            <div className="flex flex-col items-start justify-between">
                <div className="text-greylish">
                    {type === TransactionType.QuickTransfer && <span> Quick Transfer </span>}
                    {type === TransactionType.IncomingPayment && <span> Incoming Transfer </span>}
                    {type === TransactionType.MassPayout && <span> Mass Payout </span>}
                </div>
                <div className="text-sm text-greylish">
                    {date}
                </div>
            </div>
        </div>
        <div className={`flex flex-col justify-between ${detect ? 'items-left':'items-center'} text-greylish`}>
            <div>
                {amountCoin}
            </div>
            <div className="text-sm">
                {amountUSD}
            </div>
        </div>
        <div className={`md:flex items-center hidden ${detect? 'justify-start':'justify-end'}`}>
            {TransactionStatus.Complated === status ? <span className="text-green-400">Complated</span> : null}
        </div>
        {detect &&
            <div className="flex flex-col justify-center cursor-pointer text-blue-400 items-end pr-5 md:pr-0 lg:pr-5">
                <Link to={`/dashboard/transactions/${hash}`}>View</Link>
            </div>
        }
    </div>
}

export default TransactionItem;