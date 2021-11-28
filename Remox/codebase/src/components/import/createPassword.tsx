import Input from "../input"
import { useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ClipLoader } from "react-spinners";
import { SyntheticEvent } from "react";
import { useCreatePasswordMutation } from "../../redux/api/account";
import { useDispatch } from "react-redux";
import { IStorage, selectStorage, setStorage } from "../../redux/reducers/storage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUnlock } from "../../redux/reducers/unlock";

const CreatePassword = ({ phrase }: { phrase: string }) => {
    const [createPassword, { isLoading }] = useCreatePasswordMutation();

    const dispatch = useAppDispatch()
    const router = useHistory();

    const storage = useAppSelector(selectStorage)
    const [isValid, setValid] = useState(false)


    const Submitted = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        if(!isValid) return;

        try {
            const data = await createPassword({ phrase: phrase.trim(), password: target["password"]?.value?.trim() }).unwrap()

            const obj: IStorage = {
                accountAddress: data!.accountAddress,
                encryptedPhrase: data!.encryptedPhrase,
                token: data!.token,
            };

            dispatch(setUnlock(true))
            dispatch(setStorage(JSON.stringify(obj)))

            // router.push('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (storage) {
            router.push('/dashboard')
        }
    }, [storage])

    return <div className="h-screen">
        <form onSubmit={Submitted} className="h-full">
            <section className="flex flex-col items-center  h-full justify-center gap-10">
                <div className="flex flex-col gap-4">
                    <div className="text-center text-3xl text-primary">Set Account Details</div>
                    <div className="text-center text-greylish tracking-wide font-light text-lg">This password encrypts your accounts on this device.</div>
                </div>
                <div className="grid grid-cols-2 gap-x-24 gap-y-8">
                    <Input title="Password" name="password" type="password" validation={setValid}/>
                </div>
                <div className="flex justify-center items-center gap-10 pt-8">
                    <button className="rounded-xl w-[150px] h-[50px] border-2 border-primary text-primary shadow-lg bg-white" onClick={() => router.push('/')}>Back</button>
                    <button type="submit" className="rounded-xl w-[150px] h-[50px] text-white shadow-lg bg-primary">{isLoading ? <ClipLoader /> : 'Set Password'}</button>
                </div>
            </section>
        </form>
    </div>
}

export default CreatePassword;