import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PhraseBar from '../phraseBar'
import { PassDataFromSetToPhrase } from '../../types/create'

// KeyPhrase Component
const KeyPhrase = ({ data }: { data: PassDataFromSetToPhrase }) => {
    const router = useHistory();
    return <section className="w-full h-screen flex flex-col items-center justify-center">
        <div className="text-primary text-3xl tracking-wide">
            Your New Remox Account
        </div>
        <div className="flex flex-col">
            <div className='grid grid-cols-2 py-14 border-b'>
                <div>
                    <h2>Public Address</h2>
                    <span className="text-greylish text-left">It’s like your username on Remox.<br />You can share this with friends.</span>
                </div>
                <div>
                    <PhraseBar address={data?.accountAddress} />
                </div>
            </div>
            <div className='grid grid-cols-2 py-14'>
                <div>
                    <h2> Address</h2>
                    <span className="text-greylish text-left">It’s like your username on Remox.<br />You can share this with friends.</span>
                </div>
                <div>
                    <PhraseBar mnemonic={true} address={data?.mnemonic} />
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center gap-10 pt-8">
            <button className="rounded-xl w-[150px] h-[50px] border-2 border-primary text-primary shadow-lg bg-white" onClick={() => router.goBack()}>Back</button>
            <button className="rounded-xl w-[150px] h-[50px] text-white shadow-lg bg-primary" onClick={() => { router.push("/dashboard") }}>Continue</button>
        </div>
    </section>
}

export default KeyPhrase;