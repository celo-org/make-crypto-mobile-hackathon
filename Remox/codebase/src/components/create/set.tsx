import React, { useMemo, useRef, useContext, FormEvent, Dispatch } from 'react';
import Input from '../input'
import { useHistory } from 'react-router-dom'
import { generate } from 'shortid'
import { AccountCreate } from '../../types/sdk';
import { SyntheticEvent } from 'react';
import { PassDataFromSetToPhrase } from '../../types/create'
import { useDispatch } from 'react-redux';
import { setStorage } from '../../redux/reducers/storage';
import { useAccountCreateMutation } from '../../redux/api/account';

// SET Component
const Set = ({ setData }: { setData: Dispatch<PassDataFromSetToPhrase> }) => {

    const [createAccount, { isLoading}] = useAccountCreateMutation()

    const dispatch = useDispatch()

    const router = useHistory()

    const list = useMemo<Array<{ title: string, type?: string, name: string }>>(() => [
        { title: "First Name", name: "userName" }, { title: "Last Name", name: "surname" },
        { title: "Organization Name", name: "companyName" }, { title: "Password", name: "password", type: "password" },
    ], [])

    const create = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement

        if (target["password"].value !== target["repeatPassword"].value) return

        const inputData: AccountCreate = {
            userName: target["userName"].value,
            surname: target["surname"].value,
            companyName: target["companyName"].value,
            password: target["password"].value,
        }

        try {
            const data = await createAccount(inputData).unwrap()

            const obj = {
                accountAddress: data.accountAddress,
                encryptedPhrase: data.encryptedPhrase,
                token: data.token,
                userName: inputData.userName,
                surname: inputData.surname,
                companyName: inputData.companyName,
            };

            dispatch(setStorage(JSON.stringify(obj)))

            const pass: PassDataFromSetToPhrase = {
                accountAddress: data.accountAddress,
                mnemonic: data.mnemonic,
            }

            setData(pass)
        } catch (error) {
            console.error(error)
        }
    }

    return <form onSubmit={create} className="h-full">
        <section className="flex flex-col items-center  h-full justify-center gap-10">
            <div className="flex flex-col gap-4">
                <div className="text-3xl text-primary">Set Account Details</div>
                <div className="text-greylish tracking-wide font-light text-lg">This password encrypts your accounts on this device.</div>
            </div>
            <div className="grid grid-cols-3 gap-x-24 gap-y-8">
                {list.map(w => <Input key={generate()} {...w} />)}
            </div>
            <div className="flex justify-center items-center gap-10 pt-8">
                <button className="rounded-xl w-[150px] h-[50px] border-2 border-primary text-primary shadow-lg bg-white" onClick={() => router.push('/')}>Back</button>
                <button type="submit" className="rounded-xl w-[150px] h-[50px] text-white shadow-lg bg-primary">Set Account</button>
            </div>
        </section>
    </form>
}


export default Set;