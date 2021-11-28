import { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useAddMemberMutation, useLazyGetMemberQuery, useLazyGetTeamsQuery, useUpdateMemberMutation } from "../../../redux/api";
import { changeSuccess } from "../../../redux/reducers/notificationSlice";
import { Coins, CoinsName, CoinsURL } from "../../../types/coins";
import { DropDownItem } from "../../../types/dropdown";
import { Member } from "../../../types/sdk";
import Dropdown from "../../dropdown";


const EditMember = (props: Member & { onCurrentModal: Dispatch<boolean> }) => {
    const dispatch = useDispatch()

    const [triggerTeam, { data, error, isLoading }] = useLazyGetTeamsQuery()

    const [getMembers, { data: member, isLoading: memberLoading, isFetching }] = useLazyGetMemberQuery()

    const [updateMember, { isLoading: updateLoading }] = useUpdateMemberMutation()

    const [selectedTeam, setSelectedTeam] = useState<DropDownItem>({ name: "No Team", coinUrl: CoinsURL.None })
    const [selectedWallet, setSelectedWallet] = useState<DropDownItem>({ name: '', type: Coins[props.currency].value, value: Coins[props.currency].value, id: Coins[props.currency].value, coinUrl: Coins[props.currency].coinUrl });

    useEffect(() => {
        triggerTeam({ take: Number.MAX_SAFE_INTEGER })
        getMembers(props.id)
    }, [])

    useEffect(() => {
        if (member && data) {
            setSelectedTeam({ name: data.teams.find(w => w.id === member.teamId)!.title, coinUrl: CoinsURL.None, id: member.teamId })
        }
    }, [member, data])

    const Submit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { memberName, amount, address } = e.target as HTMLFormElement;

        if (memberName && amount && address && selectedWallet && selectedTeam) {
            if (!selectedWallet.value) {
                alert("Please, choose a Celo wallet")
                return
            }
            if (!selectedTeam.id) {
                alert("Please, choose a team")
                return
            }
            const memberNameValue = (memberName as HTMLInputElement).value
            const amountValue = (amount as HTMLInputElement).value
            const addressValue = (address as HTMLInputElement).value

            const member: Member = {
                id: props.id,
                name: memberNameValue,
                address: addressValue,
                amount: amountValue,
                currency: selectedWallet.value,
                teamId: selectedTeam.id
            }

            try {
                await updateMember(member).unwrap()
                dispatch(changeSuccess(true))
            } catch (error) {
                console.error(error)
            }

        }
    }

    return <>
        <div>
            {!memberLoading && !isFetching && member ? <form onSubmit={Submit}>
                <div className="text-xl font-bold pb-3">
                    Personal Details
                </div>
                <div className="grid grid-cols-2 gap-y-10">
                    <div className="flex flex-col space-y-3">
                        <div className="font-bold">Name</div>
                        <div className="flex space-x-2 items-center w-3/4">
                            <input name="memberName" type="text" defaultValue={member!.name} className="w-full border-2 border-black border-opacity-50 outline-none rounded-md px-3 py-2" required />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="font-bold">Team</div>
                        <div>
                            <div className="flex space-x-2 items-center w-3/4">
                                <Dropdown onSelect={setSelectedTeam} parentClass="w-full" loader={isLoading} selected={selectedTeam} list={data?.teams && data.teams.length > 0 ? [...data.teams.map(w => { return { name: w.title, coinUrl: CoinsURL.None, id: w.id } })] : []} nameActivation={true} className="border-2 rounded-md w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="font-bold">Pay Amount</div>
                        <div>
                            <div className="flex space-x-2 items-center  w-3/4 border border-black rounded-md border-opacity-50">
                                <div>
                                    {!selectedWallet ? <ClipLoader /> : <Dropdown onSelect={setSelectedWallet} className="border-none" nameActivation={true} selected={selectedWallet} list={Object.values(Coins).map(w => ({ name: "", type: w.value, value: w.value, coinUrl: w.coinUrl, id: w.value }))} />}
                                </div>
                                <div>
                                    <input name="amount" type="number" defaultValue={member!.amount} className="w-full outline-none pr-3" required step={'any'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="font-bold">Wallet Address</div>
                        <div className="flex space-x-2 items-center w-3/4">
                            <input name="address" type="text" defaultValue={member!.address} className="w-full text-xs border border-black border-opacity-50 outline-none rounded-md px-3 py-2" required />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center pt-10">
                    <div className="flex justify-center">
                        <div>
                            <button className="bg-primary w-full rounded-md text-white px-6 py-3">
                                {updateLoading ? <ClipLoader /> : "Save"}
                            </button>
                        </div>
                    </div>
                </div> </form>
                : <div className="flex justify-center"> <ClipLoader /></div>}
        </div>
    </>
}

export default EditMember;