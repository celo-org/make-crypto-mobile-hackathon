import { Dispatch, useState } from "react";
import { ClipLoader } from "react-spinners";

import { changeSuccess } from "../../../redux/reducers/notificationSlice";
import { useAppDispatch } from "../../../redux/hooks";

const Delete = ({ name, onCurrentModal, onDelete, onSuccess }: { name: string, onCurrentModal: Dispatch<boolean>, onDelete: () => Promise<void>, onSuccess?: Dispatch<boolean> }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    return <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-center text-xl">
            Delete {name}?
        </div>
        <div className="flex justify-center items-center space-x-4">
            <button className="border-2 border-red-500 text-red-500 w-[80px] rounded-xl h-[27px]" onClick={() => onCurrentModal(false)}>Close</button>
            <button className="border-2 bg-red-500 border-red-500 text-white w-[80px] rounded-xl h-[27px]" onClick={async () => {
                setLoading(true);
                try {
                    await onDelete()
                    //onSuccess(true)
                    dispatch(changeSuccess(true))
                    onCurrentModal(false)
                } catch (error) {
                    console.error(error)
                }
                setLoading(false)
            }}>{loading ? <ClipLoader size={20} /> : 'Delete'}</button>
        </div>
    </div>
}

export default Delete;