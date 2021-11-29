import { useAppDispatch } from "../../redux/hooks"
import { setMenu } from "../../redux/reducers/toggles"
import {motion} from 'framer-motion'


const MobileMenu = ({ children }: { children: JSX.Element | JSX.Element[] | string }) => {
    const dispatch = useAppDispatch()
    return <>
        <div className="absolute w-screen h-screen z-50 bg-white bg-opacity-60" onClick={()=>{
            dispatch(setMenu(false))
        }}></div>
        <motion.div initial={{x: -500}} animate={{x: 0}} transition={{type: 'tween'}} exit={{x: -500}} className="w-[35vw] absolute -translate-x-50 h-full bg-white z-[100] border-r-2">
            <div className="h-full flex flex-col items-center justify-center">
                {children}
            </div>
        </motion.div>
    </>
}

export default MobileMenu