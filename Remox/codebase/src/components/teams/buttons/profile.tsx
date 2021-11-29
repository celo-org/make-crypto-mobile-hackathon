import { Dispatch } from "react";
import { Coins, CoinsNameVisual } from "../../../types/coins";
import { Member } from "../../../types/sdk";
import Avatar from '../../avatar'

const Profile = (props: Member & { teamName: string, onDeleteModal: Dispatch<boolean>, onCurrentModal: Dispatch<boolean>, onEditModal: Dispatch<boolean> }) => {

    return <>
        <div>
            <div className="text-xl font-bold pb-3">
                Personal Details
            </div>
            <div className="grid grid-cols-2 gap-y-10">
                <div className="flex flex-col space-y-3">
                    <div className="font-bold">Name</div>
                    <div>
                        <div className="flex space-x-2 items-center">
                            <Avatar name={props.name} />
                            <div>
                                {props.name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="font-bold">Team</div>
                    <div>
                        <div className="flex space-x-2 items-center">
                            <div>
                                {props.teamName}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="font-bold">Pay Amount</div>
                    <div>
                        <div className="flex space-x-2 items-center">
                            <div>
                                {props.amount}
                            </div>
                            <div>
                                <img width="20" height="20" src={Coins[props.currency].coinUrl} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <div className="font-bold">Wallet Address</div>
                    <div>
                        <div className="flex space-x-2 items-center">
                            <div className="text-xs">
                                {props.address}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center pt-10">
                <div className="grid grid-cols-2 gap-y-3 gap-x-5 justify-center">
                    <div className="col-span-2">
                        <button className="bg-primary px-6 py-3 rounded-xl text-white w-full">
                            Pay Now
                        </button>
                    </div>
                    <div>
                        <button className="bg-primary w-full rounded-xl text-white px-6 py-3" onClick={() => {
                            props.onEditModal(true)
                            props.onCurrentModal(false)
                        }}>
                            Edit
                        </button>
                    </div>
                    <div>
                        <button className="text-primary border border-primary w-full rounded-xl px-6 py-3" onClick={() => {
                            props.onDeleteModal(true)
                            props.onCurrentModal(false)
                        }}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Profile;