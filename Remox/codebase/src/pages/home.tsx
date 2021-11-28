import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectStorage } from "../redux/reducers/storage";


const Home = () => {
    const storage = useSelector(selectStorage)


    return <>
        <section className="flex justify-center items-center w-full h-screen">
            <div className="w-[800px] h-[600px] bg-[#eeeeee] bg-opacity-40 flex flex-col justify-center items-center gap-14">
                <div className="w-[400px] flex flex-col items-center justify-center gap-10">
                    <img src="/logo.png" alt="" className="w-full"/>
                    <span className="font-light text-greylish">All-in-One Tool For Crypto Treasury Management</span>
                </div>
                <div className="flex flex-col gap-5">
                    <Link to={storage ? { pathname: '/dashboard' } : { pathname: '/import' }} className="text-center">
                        <button className="border-2 bg-white text-primary border-primary shadow-xl px-8 py-3 rounded-xl">Enter App</button>
                    </Link>
                    <Link to="/create" className="text-center">
                        <button className="border-2 bg-primary text-white shadow-xl px-8 py-3 rounded-xl">Create Account</button>
                    </Link>
                </div>
            </div>
        </section>
    </>

};

export default Home;