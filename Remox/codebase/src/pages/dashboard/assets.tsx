import { useSelector } from "react-redux";
import { generate } from "shortid";
import { IBalanceItem, SelectBalances } from "../../redux/reducers/currencies";


const Assets = () => {
    const selectBalance = useSelector(SelectBalances)
    return <>
        <div>
            <div className="font-semibold text-xl">Assets</div>
            <div className="w-full px-5 pt-4 pb-6 ">
                <div id="header" className="grid grid-cols-[25%,15%,15%,20%,12.5%,12.5%] px-8 py-5" >
                    <div className="">Assets</div>
                    <div className="">Balance</div>
                    <div className="">Ammount</div>
                    <div className="">USD Price</div>
                    <div className="">24h</div>
                    <div className="">% Assets</div>
                </div>
                <div className="pb-5 px-8 shadow-custom rounded-xl">
                    {Object.values(selectBalance).map((item: IBalanceItem, index) => {
                        return <div key={generate()} className="grid grid-cols-[25%,15%,15%,20%,12.5%,12.5%] border-b border-black py-5" >
                            <div className="flex space-x-3 items-center">
                                <div><img src={item.coins.coinUrl} width={30} height={30} alt="" /></div>
                                <div>{item.coins.name} </div>
                            </div>
                            <div>
                                $ {(item.amount * item.reduxValue).toFixed(2)}
                            </div>
                            <div>
                                {item.amount.toFixed(2)}
                            </div>
                            <div>
                                $ {item.reduxValue.toFixed(2)}
                            </div>
                            <div>
                               % {item.per_24.toFixed(2)}
                            </div>
                            <div>
                               % {item.percent.toFixed(2)}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>
}

export default Assets;