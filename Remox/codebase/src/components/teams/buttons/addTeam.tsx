import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

import { useAppDispatch } from "../../../redux/hooks"
import { changeSuccess } from '../../../redux/reducers/notificationSlice'
import { useCreateTeamMutation } from "../../../redux/api";

const AddTeams = ({ onDisable }: { onDisable: React.Dispatch<boolean>}) => {

    const [createTeam, { data, error, isLoading }] = useCreateTeamMutation()

    const teamName = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const create = async () => {
        if (teamName.current && teamName.current.value.trim()) {
            try {
                await createTeam({ title: teamName.current.value.trim() }).unwrap();

                dispatch(changeSuccess(true))
                onDisable(false)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return <div className="flex flex-col justify-center space-y-10">
        <div className="grid grid-cols-2 items-center">
            <div>Team Name</div>
            <div>
                <input ref={teamName} type="text" className="border pl-3 w-full rounded-xl h-10 outline-none" />
            </div>
            {error && <div className="text-red-600"> Something went wrong</div>}
        </div>
        {/* <div className="grid grid-cols-2 items-center">
            <div>Currency to be used</div>
            <div>
                <Dropdown onSelect={setSelectedCoin} price={true} selected={selectedCoin} list={[{ name: "Celo", coinUrl: CoinsURL.CELO }, { name: "cUSD", coinUrl: CoinsURL.cUSD }]} />
            </div>
        </div> */}
        <div className="flex justify-center">
            <button onClick={create} className="px-14 py-2 text-white rounded-xl bg-primary font-light" disabled={isLoading}>
                {isLoading ? <ClipLoader /> : "Add Team"}
            </button>
        </div>

    </div>
}

export default AddTeams;