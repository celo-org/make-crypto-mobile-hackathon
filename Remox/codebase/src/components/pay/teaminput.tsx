import { Dispatch, forwardRef, MutableRefObject, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Coins } from "../../types/coins";
import { DropDownItem } from "../../types/dropdown";
import { Member } from "../../types/sdk";
import Dropdown from "../dropdown";


const TeamInput = (props: Member & { index: number, selectedId: string[], generalWallet: DropDownItem, setGeneralWallet: Dispatch<DropDownItem>, setSelectedId: Dispatch<string[]>, members: MutableRefObject<Array<Member & { selected: boolean }>> }) => {

    const [selectedWallet, setSelectedWallet] = useState<DropDownItem>({ name: Coins[props.currency].name, type: Coins[props.currency].value, value: Coins[props.currency].value, coinUrl: Coins[props.currency].coinUrl })

    useEffect(() => {
        if (props.generalWallet?.value) {
            setSelectedWallet({ name: Coins[props.generalWallet.value!].name, type: Coins[props.generalWallet.value!].value, coinUrl: Coins[props.generalWallet.value!].coinUrl, value: Coins[props.generalWallet.value!].value })
        }
    }, [props.generalWallet])

    useEffect(() => {
        if (selectedWallet && selectedWallet.value) {
            updateValue({ val: '', wallet: true })
        }
    }, [selectedWallet])

    const updateValue = ({ val, wallet = false }: { val: string, wallet?: boolean }) => {
        const arr = [...props.members.current]
        const newArr = arr.reduce<Array<Member & { selected: boolean }>>((a, e) => {
            if (e.id !== props.id) a.push(e)
            else {
                let newItem;
                if (wallet) {
                    newItem = { ...e, currency: selectedWallet.value! }
                } else {
                    newItem = { ...e, amount: val }
                }
                a.push(newItem)
            }
            return a;
        }, [])
        props.members.current = newArr
    }

    const updateTick = ({ tick }: { tick: boolean }) => {
        if (!tick) {
            props.setSelectedId(props.selectedId.filter(w => w !== props.id))
        } else {
            props.setSelectedId([...props.selectedId, props.id])
        }
    }

    return <>
        <div className="flex items-center">
            <input checked={props.selectedId.some(w => w === props.id)} className="relative cursor-pointer w-[20px] h-[20px] checked:before:absolute checked:before:w-full checked:before:h-full checked:before:bg-primary checked:before:block" type="checkbox" onChange={(e) => {
                updateTick({ tick: e.target.checked })
            }} />
            <h2 className={`text-black px-3 py-1 name__${props.index} text-sm`}>{props.name}</h2>
        </div>
        <div className="flex items-center">
            <h2 className={`text-black py-1 rounded-md address__${props.index} text-sm`}>{props.address}</h2>
        </div>
        <div className="flex border border-greylish rounded-md border-opacity-60">
            {!selectedWallet ? <ClipLoader /> : <Dropdown className="border-transparent text-sm" onSelect={setSelectedWallet} nameActivation={true} selected={selectedWallet} list={Object.values(Coins).map(w => ({ name: w.name, type: w.value, coinUrl: w.coinUrl, value: w.value }))} />}
            <input className="text-black py-1 outline-none mr-2 rounded-md w-full font-bold" placeholder="Amount" defaultValue={props.amount} type="number" name={`amount__${props.index}`} min="0" required step={'any'} onBlur={d => props.setSelectedId([...props.selectedId])} onChange={e => updateValue({ val: e.target.value })} />
        </div>
        <div></div>
    </>
}
export default TeamInput;