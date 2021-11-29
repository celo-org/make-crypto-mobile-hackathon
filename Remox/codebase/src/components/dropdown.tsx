import { IoIosArrowDown } from 'react-icons/io'
import { Dispatch, forwardRef, MutableRefObject, useEffect, useRef, useState } from 'react'
import { generate } from 'shortid'
import { DropDownItem } from '../types/dropdown'
import { MouseEventHandler } from 'react'
import { CoinsURL } from '../types/coins'
import { ClipLoader } from 'react-spinners'

const Li = forwardRef<HTMLLIElement, { children: Array<any> | any, onClick: MouseEventHandler, className: string }>(({ children, onClick, className }, ref) => <li ref={ref} onClick={onClick} className={`${className} text-left border px-3 py-2 bg-white hover:bg-gray-200 cursor-pointer`}>{children}</li>)

const Viewer = ({ displayName, name, address, coinUrl, className, disableAddressDisplay }: { displayName?: string, name: string, address?: string, coinUrl?: CoinsURL, className?: string, disableAddressDisplay?: boolean }) => <div className="flex flex-col">
    <div className="flex flex-col">
        {displayName && <div className="pl-2 items-center text-sm text-greylish opacity-80">
            {displayName}
        </div>}
        <div className="text-left flex space-x-2 items-center">
            <div><img src={coinUrl} className={coinUrl ? `w-[20px] h-[20px]` : ''} alt="" /></div>
            <div className={`${className ?? ''} font-normal truncate`} title={name}>{name}</div>
        </div>
    </div>
    {!disableAddressDisplay && <div className={`text-left text-[10px] text-gray-500`}>{!address?.startsWith('0x') ? address : address.split('').reduce((a, c, i, arr) => {
        return i < 10 || (arr.length - i) < 4 ? a + c : a.split('.').length - 1 < 6 ? a + '.' : a
    }, '')}</div>}
</div>

const Dropdown = ({ selected, list, nameActivation = false, onSelect, className, loader = false, disableAddressDisplay = false, parentClass = '', childClass = '', displayName }: { disableAddressDisplay?: boolean, parentClass?: string, className?: string, selected: DropDownItem, list: Array<DropDownItem>, nameActivation?: boolean, onSelect?: Dispatch<DropDownItem>, loader?: boolean, childClass?: string, displayName?: string }) => {
    const [isOpen, setOpen] = useState(false)
    const liRef = useRef<HTMLLIElement>()
    const [liHeight, setLiHeight] = useState(0)

    useEffect(() => {
        if (liRef.current && liHeight === 0) {
            setLiHeight(liRef.current.offsetHeight)
        }
    })

    return (
        <div className={`relative ${parentClass}`}>
            <div onClick={() => list?.length > 0 ? setOpen(!isOpen) : null} className={`flex ${className || ''} ${loader ? 'justify-center' : 'justify-between'} items-center border rounded-xl ${isOpen && 'rounded-b-none'} py-2 px-3 cursor-pointer`}>
                {!loader ? <div className="truncate">
                    {Viewer({ name: selected.name, address: selected?.address ?? selected?.amount, coinUrl: selected?.coinUrl, className: selected?.className, disableAddressDisplay: disableAddressDisplay, displayName })}
                </div> : <ClipLoader />}
                {list && list.length > 0 && <div>
                    <IoIosArrowDown className='transition' style={isOpen ? { transform: "rotate(180deg)" } : undefined} />
                </div>}
            </div>
            {isOpen && <div className="absolute left-0 bottom-0 translate-y-full z-10 w-full overflow-hidden">
                <ul id="ala" className="flex flex-col overflow-y-auto " style={list.length > 5 ?
                    { height: `${liHeight * 5}px` }
                    :
                    { height: 'auto' }
                }>
                    {list?.filter((w) => {
                        if (!nameActivation) {
                            return w?.address !== selected?.address
                        } else if (w.name) {
                            return w?.name !== selected?.name
                        } else if (w.id) {
                            return w?.id !== selected?.id
                        }

                    })?.map((w, i) => {
                        const obj: { ref?: any } = {}
                        if (i == 0) {
                            obj.ref = liRef
                        }
                        return <Li {...obj} key={generate()} className={childClass} onClick={() => { onSelect!(w); setOpen(false) }}>
                            {Viewer({ name: w?.name, address: w?.address ?? w?.amount, coinUrl: w?.coinUrl, className: w?.className, disableAddressDisplay })}
                        </Li>
                    }
                    )}
                </ul>
            </div>}
        </div>
    )
}

export default Dropdown;