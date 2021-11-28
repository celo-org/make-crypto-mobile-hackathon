import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { AltCoins, Coins, CoinsName, CoinsURL, TransactionFeeTokenName } from "../../../types/coins";
import { DropDownItem } from "../../../types/dropdown";
import { TeamInfo } from "../../../types/sdk/Team/GetTeams";
import Dropdown from "../../dropdown";
import { ClipLoader } from "react-spinners";
import { useAppDispatch } from "../../../redux/hooks"
import { changeSuccess, changeError } from '../../../redux/reducers/notificationSlice'
import { useLazyGetTeamsQuery } from "../../../redux/api/team";
import { useAddMemberMutation } from "../../../redux/api/teamMember";


const AddMember = ({ onDisable }: { onDisable: React.Dispatch<boolean> }) => {

    const [triggerTeams, { data, error, isLoading }] = useLazyGetTeamsQuery()
    const [addMember, { isLoading: addMemberLoading, error: memberError }] = useAddMemberMutation();

    const [selected, setSelected] = useState<DropDownItem>({ name: "No Team", coinUrl: CoinsURL.None })
    const [selectedWallet, setSelectedWallet] = useState<DropDownItem>(Coins[CoinsName.CELO]);

    const dispatch = useAppDispatch()

    useEffect(() => {
        triggerTeams({ take: Number.MAX_SAFE_INTEGER })
    }, [])

    useEffect(() => {
        if (!data || (data && data.teams.length === 0)) {
            setSelected({ name: "No Team", coinUrl: CoinsURL.None })
        }
    })

    useEffect(() => {
        if (data && data.teams && data.teams.length > 0) {
            setSelected({ name: "Select Team", coinUrl: CoinsURL.None })
        }
    }, [data])


    const Submit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const target = e.target as HTMLFormElement;

        const { firstName, lastName, teamName, walletAddress, amount } = target;
        const firstNameValue = (firstName as HTMLInputElement).value
        const lastNameValue = (lastName as HTMLInputElement).value
        // const teamNameValue = (teamName as HTMLInputElement)?.value
        const walletAddressValue = (walletAddress as HTMLInputElement).value
        const amountValue = (amount as HTMLInputElement).value


        if (firstNameValue && lastNameValue && walletAddressValue && amountValue) {
            if (!Object.values(Coins).includes(selectedWallet as AltCoins)) {
                alert("Please, choose a wallet")
                return
            }
            if (selected === { name: "Select Team", coinUrl: CoinsURL.None }) {
                alert("Please, choose a team")
                return
            }

            if (selectedWallet.value && selected.id) {

                try {
                    await addMember({
                        name: `${firstNameValue} ${lastNameValue}`,
                        address: walletAddressValue.trim(),
                        currency: selectedWallet.value,
                        amount: amountValue.trim(),
                        teamId: selected.id
                    }).unwrap()

                    dispatch(changeSuccess(true))
                    onDisable(false)
                } catch (error) {
                    console.error(error)
                }
            }
        }
    }

    return <>
        <form onSubmit={Submit}>
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-4">
                    <div className="font-bold">Personal Details</div>
                    <div className="grid grid-cols-2 gap-x-10">
                        <div>
                            <input type="text" name="firstName" placeholder="First Name" className="border-2 pl-2 rounded-md outline-none h-[42px] w-full" required />
                        </div>
                        <div>
                            <input type="text" name="lastName" placeholder="Last Name" className="border-2 pl-2 rounded-md outline-none h-[42px] w-full" required />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="font-bold">Choose Team</div>
                    <div className="grid grid-cols-2 w-[85%] gap-x-10">
                        <div>
                            <Dropdown onSelect={setSelected} loader={isLoading} selected={selected} list={data?.teams && data.teams.length > 0 ? [...data.teams.map(w => { return { name: w.title, coinUrl: CoinsURL.None, id: w.id } })] : []} nameActivation={true} className="border-2 rounded-md" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="font-bold">Wallet Address</div>
                    <div>
                        <input type="text" name="walletAddress" className="h-[42px] w-full rounded-lg border-2 pl-2 outline-none" placeholder="Wallet Address" required />
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="font-bold">Currency and Amount</div>
                    <div className="grid grid-cols-2 w-[85%] gap-x-10">
                        <div>
                            <input type="number" name="amount" className="h-[42px] border-2 outline-none pl-4 rounded-md pr-4 w-full" placeholder="Amount" step="any" required />
                        </div>
                        <div>
                            {selectedWallet && <Dropdown className="rounded-md w-full" onSelect={setSelectedWallet} nameActivation={true} selected={selectedWallet} list={Object.values(Coins)} />}
                        </div>
                    </div>
                </div>
                {(error || memberError) && <div className="flex flex-col space-y-4 justify-center">
                    <div className="text-red-500">Something went wrong</div>
                </div>}
                <div className="flex justify-center">
                    <button className="px-8 py-3 bg-primary rounded-xl text-white">
                        {addMemberLoading ? <ClipLoader /> : "Add Person"}
                    </button>
                </div>
            </div>
        </form>
    </>
}

export default AddMember;