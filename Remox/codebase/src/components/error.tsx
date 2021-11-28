import { Dispatch } from "react";


const Error = ({ onClose }: { onClose: Dispatch<boolean> }) => {

    return <div className="absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-10 py-5 shadow-xl gap-8">
        <div className="flex justify-center relative">
            <div className="absolute -right-7 top-1 cursor-pointer text-gray-400" onClick={() => onClose(false)}>X</div>
            <img src="/icons/error.svg" width="200" alt="" />
        </div>
        <div>Something went wrong</div>
        <button className="px-16 py-4 text-white bg-primary font-bold shadow-xl" onClick={() => onClose(false)}>
            Close
        </button>
    </div>
}


export default Error;