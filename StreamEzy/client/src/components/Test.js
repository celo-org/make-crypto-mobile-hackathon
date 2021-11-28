import React, { useState } from 'react'
import * as IPFS from 'ipfs-core'
import title from '../assets/title.svg' 

function Test() {
    const [data, setdata] = useState(null)
    const load = async () => {
        const ipfs = await IPFS.create()
        // const mkdir = await ipfs.files.mkdir('/ankit/rastogi/1')
        // const mkdir = await ipfs.files.mkdir('/rathin/1/2/3/4/5/6/7/8/9',{parents:true})
        const dirStat = await ipfs.files.stat('/')
        // const remove = await ipfs.files.rm('/rathin/1/2/3/4/5/6/7/8/9', { recursive: true })
        console.log(dirStat.cid.toString());
    }
    return (
        <div style={{marginTop:"4.4rem",marginLeft:"68px"}}>
            <button onClick={()=>load()}>Load</button>
        </div>
    )
}

export default Test
