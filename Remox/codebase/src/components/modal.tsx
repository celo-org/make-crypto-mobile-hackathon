import React, { useEffect } from "react";


const Modal = ({ children, onDisable }: { children?: JSX.Element | JSX.Element[], onDisable: React.Dispatch<React.SetStateAction<boolean>> }) => {
    useEffect(() => {
        document.querySelector('body')!.style.overflowY = "hidden"
        return () => {
            document.querySelector('body')!.style.overflowY = ""
        }
    }, [])
    return <>
        <div className="w-full h-full bg-white bg-opacity-60 absolute left-0 top-0" onClick={() => onDisable(false)} style={{
            top: `${window.scrollY}px`,
        }}>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white min-w-[33%] shadow-custom rounded-xl" style={{top: `${window.scrollY + (window.innerHeight/2)}px`}}>
            <div className="relative px-5 py-10">
                {children}
                <button onClick={() => onDisable(false)} className="absolute left-full top-0 translate-x-[-200%] translate-y-[25%] text-greylish opacity-45">
                    X
                </button>
            </div>
        </div>
    </>
}

export default Modal;