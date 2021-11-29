import { useRef, useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import Header from '../../layouts/home/header';
import { useSignInMutation } from '../../redux/api/account';
import { IStorage, selectStorage, setStorage } from '../../redux/reducers/storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUnlock } from '../../redux/reducers/unlock';
import { useAppSelector } from '../../redux/hooks';


const Login = ({ phrase }: { phrase: string }) => {
    const [signin, { isLoading }] = useSignInMutation()

    const dispatch = useDispatch()

    const [input, setInput] = useState<string>()
    const router = useHistory()
    const [incorrrect, setIncorrect] = useState(false)

    const storage : IStorage | null = useSelector(selectStorage)

    const Submitted = async () => {
        if (input && phrase) {
            setIncorrect(false)

            try {
                const data = await signin({ phrase: phrase.trim(), password: input.trim() }).unwrap()

                const obj: IStorage = {
                    accountAddress: data!.accountAddress,
                    encryptedPhrase: data!.encryptedPhrase,
                    token: data!.token,
                };

                dispatch(setUnlock(true))
                dispatch(setStorage(JSON.stringify(obj)))

            } catch (error) {
                console.error(error);
                setIncorrect(true);
            }

        }
    }

    useEffect(() => {
        if (storage) {
            router.push('/dashboard')
        }
    }, [storage])


    return <>
        <Header />
        <section className="flex flex-col justify-center items-center h-screen gap-8">
            <h2 className="text-3xl text-primary">Open Your Wallet</h2>
            <div className="flex flex-col gap-4 items-center">
                <div>Enter your password to open your wallet</div>
                <div className="flex justify-center"><input onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        Submitted()
                    }
                }} onChange={(e) => setInput(e.target.value)} type="password" autoComplete='new-password' className="bg-greylish bg-opacity-10 px-3 py-2 rounded-lg outline-none" /></div>
                {incorrrect && <div className="text-red-600">Password is Incorrect</div>}
                <div className="flex justify-center">
                    <button onClick={Submitted} className="bg-primary shadow-lg px-5 py-2 text-white rounded-lg">{isLoading ? <ClipLoader /> : 'Unlock'}</button>
                </div>
            </div>
        </section>
    </>
}

export default Login;