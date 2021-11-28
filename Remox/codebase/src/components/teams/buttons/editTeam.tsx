import { Dispatch, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useUpdateTeamMutation } from "../../../redux/api";
import { useAppDispatch } from "../../../redux/hooks";
import { changeError, changeSuccess } from "../../../redux/reducers/notificationSlice";
import { TeamInfoWithMembers } from "../../../types/sdk";


const EditTeam = (props: TeamInfoWithMembers & { onCurrentModal: Dispatch<boolean> }) => {

    const [updateTeam, { isLoading }] = useUpdateTeamMutation()
    const [input, setInput] = useState<string>('')
    const dispatch = useAppDispatch()


    return <div className="grid grid-rows-[25%,25%,50%] grid-cols-[80%] items-center justify-center h-[200px]">
        <div className="text-center self-end font-light">
            Team Name
        </div>
        <div className="place-self-center">
            <input type="text" defaultValue={props.title} onChange={(e) => setInput(e.target.value)} className="text-center px-3 rounded-md py-2 outline-none border-2 border-black border-opacity-50" required />
        </div>
        <div className="grid grid-cols-2 self-end gap-x-5">
            <button className="w-full py-3 border border-primary rounded-xl text-primary" onClick={() =>{
                props.onCurrentModal(false)
            }}>
                Close
            </button>
            <button className="w-full px-4 py-3 bg-primary text-white rounded-xl" onClick={async (e) => {
                try {
                    await updateTeam({ id: props.id, body: { title: input } }).unwrap()
                    dispatch(changeSuccess(true))
                    props.onCurrentModal(false)
                } catch (error) {
                    console.error(error)
                    dispatch(changeError(true))
                }
            }}>
                {isLoading ? <ClipLoader /> : 'Save'}
            </button>
        </div>
    </div>
}

export default EditTeam;