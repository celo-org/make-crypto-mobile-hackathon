import { useState, useEffect } from 'react'

const PhraseBar = ({ address, mnemonic = false, scanIcon = true }: { address: string, mnemonic?: boolean, scanIcon?: boolean }) => {
    const [data, setData] = useState('');
    const [see, setSee] = useState(false);
    useEffect(() => {
        if (mnemonic && !see) {
            const value = address.split(" ").reduce((a, c) => {
                return a += ` ${c.replace(/[A-Z]/gi, "*")}`
            })
            return setData(value)
        } else if (mnemonic) return setData(address);

        let value = address.startsWith("0x") ? address.slice(2) : address.replace(' ', '');
        value = value.split('').reduce((a, c, i) => {
            if (i > 0 && i % 4 === 0) a += ' ';
            return a + c;
        }, '')
        return setData(value)
    }, [see])

    return <div>
        <div className="bg-greylish bg-opacity-10 py-5 pl-2 pr-12 rounded-lg break-words relative" style={!mnemonic ? { inlineSize: "300px" } : { inlineSize: "420px" }}>
            <div className="font-light">{mnemonic ? data : data.toUpperCase()}</div>
            <div className="absolute -right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {mnemonic ?
                    <div className="bg-primary p-2 rounded-xl cursor-pointer" onClick={() => setSee(!see)}>
                        <img src={'/icons/see.svg'} width="15" height={15} alt="see" />
                    </div>
                    :
                    scanIcon ? <div className="bg-primary p-2 rounded-xl cursor-pointer">
                        <img src={'/icons/scanning.svg'} alt="scanning" />
                    </div> : null}

                <div className="bg-primary p-2 rounded-xl cursor-pointer" onClick={() => navigator.clipboard.writeText(address.trim())}>
                    <img src={'/icons/copy.svg'} alt="copy" />
                </div>
            </div>
        </div>

    </div>
}

export default PhraseBar;