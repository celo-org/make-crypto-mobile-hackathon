import { Dispatch } from "react";

const Success = ({ onClose, text = "Payment Successfully Completed", className }: { onClose: Dispatch<boolean>, text?: string, className?: string }) => {

    return <div className={`absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-10 py-5 shadow-xl gap-8 ${className}`}>
        <div className="flex justify-center relative">
            <div className="absolute -right-7 top-1 cursor-pointer text-gray-400" onClick={() => onClose(false)}>X</div>
            <img src="/success.svg" alt="" />
        </div>
        <div className="flex justify-center">{text}</div>
        <button className="px-16 py-4 text-white bg-primary font-bold shadow-xl rounded-xl" onClick={() => onClose(false)}>
            Close
        </button>
    </div>
}


export default Success;