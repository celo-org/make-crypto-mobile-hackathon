import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import Header from '../layouts/home/header'
import Set from '../components/create/set'
import KeyPhrase from '../components/create/phrase'
import { PassDataFromSetToPhrase } from '../types/create'

const Create = () => {
    const [order, setOrder] = useState<number>(0);
    const [data, setData] = useState<PassDataFromSetToPhrase>();
    useEffect(() => {
        if (data) {
            setOrder(order + 1);
        }
    }, [data, order])
    return <div className="h-screen w-full">
        <Header />
        {order === 0 ? <Set setData={setData} /> : <KeyPhrase data={data!} />}
    </div>
}




export default Create;