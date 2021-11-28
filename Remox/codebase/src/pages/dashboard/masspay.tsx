import { useState, useRef, useEffect, useContext, useCallback, SyntheticEvent } from "react";
import Dropdown from "../../components/dropdown";
import { generate } from 'shortid'
import { useHistory } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import Success from "../../components/success";
import Error from "../../components/error";
import { DropDownItem } from "../../types/dropdown";
import { Member, MultipleTransactionData } from "../../types/sdk";
import { useGetBalanceQuery, useLazyGetTeamsWithMembersQuery, useSendCeloMutation, useSendStableTokenMutation, useSendMultipleTransactionsMutation, useSendAltTokenMutation } from "../../redux/api";
import { selectStorage } from "../../redux/reducers/storage";
import TeamInput from "../../components/pay/teaminput";
import { AltCoins, AltcoinsList, Coins, CoinsName, CoinsURL, StableTokens, TransactionFeeTokenName } from "../../types/coins";
import { useAppSelector } from "../../redux/hooks";
import lodash from "lodash";
import { IBalanceItem, SelectBalances } from "../../redux/reducers/currencies";


const MassPay = () => {

    const storage = useAppSelector(selectStorage)
    const balance = useAppSelector(SelectBalances)
    const router = useHistory();

    const { data } = useGetBalanceQuery()
    const [sendCelo] = useSendCeloMutation()
    const [sendStableToken] = useSendStableTokenMutation()
    const [sendMultiple] = useSendMultipleTransactionsMutation()
    const [sendAltcoin] = useSendAltTokenMutation()

    const [currentBalances, setCurrentBalances] = useState<IBalanceItem[]>();
    const [selectedBalances, setSelectedBalances] = useState<JSX.Element[]>();
    const [selectedBalanceResult, setSelectedBalanceResult] = useState<JSX.Element[]>();



    const [getTeams, { data: teams, error: teamsError, isLoading: teamLoading }] = useLazyGetTeamsWithMembersQuery()


    const [isPaying, setIsPaying] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [isError, setError] = useState(false)


    const [selectedWallet, setSelectedWallet] = useState<DropDownItem>();
    const [selectedTeam, setSelectedTeam] = useState<DropDownItem>();
    const [selectedPeople, setPeople] = useState();

    const resMember = useRef<Array<Member & { selected: boolean }>>([])
    const [members, setMembers] = useState<Member[]>();
    const [selectedId, setSelectedId] = useState<string[]>([]);

    const [list, setList] = useState<Array<DropDownItem>>([]);


    useEffect(() => {
        getTeams({ take: Number.MAX_SAFE_INTEGER })
    }, [])


    useEffect(() => {
        if (data) {
            setSelectedWallet({ name: "Set all to", address: "" })
            const coins = Object.values(Coins).map((coin: AltCoins) => ({
                name: `${parseFloat(data[coin.responseName]).toFixed(3)} ${coin.name}`,
                type: coin.value,
                value: coin.value,
                coinUrl: coin.coinUrl,
                amount: data[coin.responseName]
            }))
            setList(coins)
        }
    }, [data])

    useEffect(() => {
        if (teams && teams.teams.length) {
            setSelectedTeam({ name: teams.teams[0].title, address: teams.teams[0].id })
        }
    }, [teams])

    useEffect(() => {
        if (teams && teams.teams.length && selectedTeam && selectedTeam.address) {
            resMember.current = teams.teams.find(w => w.id === selectedTeam.address)!.teamMembers.map(w => ({ ...w, selected: false }))
            setMembers(teams.teams.find(w => w.id === selectedTeam.address)!.teamMembers)
        }
    }, [selectedTeam, teams])

    const Submit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result: Array<MultipleTransactionData> = []

        const mems = resMember.current.filter(w => selectedId.includes(w.id))

        if (mems.length) {
            for (let index = 0; index < mems.length; index++) {
                result.push({
                    toAddress: mems[index].address,
                    amount: mems[index].amount,
                    tokenType: mems[index].currency
                })
            }
        }

        setIsPaying(true)

        try {
            if (result.length === 1) {
                if (result[0].tokenType === CoinsName.CELO) {
                    await sendCelo({
                        toAddress: result[0].toAddress,
                        amount: result[0].amount,
                        phrase: storage!.encryptedPhrase
                    }).unwrap

                } else if (result[0].tokenType === CoinsName.cUSD || result[0].tokenType === CoinsName.cEUR) {
                    await sendStableToken({
                        toAddress: result[0].toAddress,
                        amount: result[0].amount,
                        phrase: storage!.encryptedPhrase,
                        stableTokenType: StableTokens[(result[0].tokenType)]
                    }).unwrap()
                } else {
                    await sendAltcoin({
                        toAddress: result[0].toAddress,
                        amount: result[0].amount,
                        phrase: storage!.encryptedPhrase,
                        altTokenType: AltcoinsList[(result[0].tokenType as AltcoinsList)]
                    }).unwrap()
                }
            }
            else {
                const arr: Array<MultipleTransactionData> = result.map(w => ({
                    toAddress: w.toAddress,
                    amount: w.amount,
                    tokenType: w.tokenType
                }))

                await sendMultiple({
                    multipleAddresses: arr,
                    phrase: storage!.encryptedPhrase
                }).unwrap()
            }
            setSuccess(true);

        } catch (error) {
            console.error(error)
            setError(true)
        }

        setIsPaying(false);
    }

    useEffect(() => {
        if (selectedId && selectedId.length && balance) {
            const result = lodash.groupBy(resMember.current.filter(w => selectedId.includes(w.id)), "currency");
            const currenBalanceArr: IBalanceItem[] = []
            Object.entries(result).forEach(([key, value]) => {
                Object.entries(balance).forEach(([key2, value2]) => {
                    if (key.toLowerCase() === key2.toLowerCase() && value2 !== undefined) {
                        currenBalanceArr.push(value2)
                    }
                })
            })

            const bal = Object.entries(result).map(([key,value]) => {
                if(!balance[Coins[key as TransactionFeeTokenName].name]?.reduxValue) return <></>
                const amount = value.reduce((a,c)=>a+=parseFloat(c.amount),0)
                return <div className="flex flex-col space-y-3">
                    <div>{amount} {Coins[key as TransactionFeeTokenName].name}</div>
                    <div className="text-black opacity-50">{(amount * balance[Coins[key as TransactionFeeTokenName].name]!.reduxValue).toFixed(2)} USD</div>
                </div>
            })

            const selectedAmount = Object.entries(result).map(([key,value]) => ({coin: key, value: value.reduce((a,c)=>a+=parseFloat(c.amount),0)}))

            const balanceRes = currenBalanceArr?.map(w => {
                if(!balance[w.coins.name]?.reduxValue) return <></>
                return <div className="flex flex-col space-y-3">
                    <div>{(w.amount - (selectedAmount.find(s=>s.coin === w.coins.name || s.coin === w.coins.feeName)?.value??0)).toFixed(2)} {w.coins.name}</div>
                    <div className="text-black opacity-50">{((w.amount - (selectedAmount.find(s=>s.coin === w.coins.name || s.coin === w.coins.feeName)?.value??0)) * balance[w.coins.name]!.reduxValue).toFixed(2)} USD</div>
                </div>
            })

            setCurrentBalances(currenBalanceArr)
            setSelectedBalances(bal)
            setSelectedBalanceResult(balanceRes)
        

        }
    }, [selectedId, balance])

    return <div>
        <form onSubmit={Submit}>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-[85vw] min-h-[75vh]">
                    <div className="w-full">
                        <div>Mass Payout</div>
                    </div>
                    <div className=" h-auto shadow-xl border flex flex-col gap-10 py-10">
                        {!teamLoading && teams && teams.teams.length === 0 ? <div className="flex justify-center">No Team Yet. Please, first, create a team</div> : <><div className="flex flex-col pl-12 pr-[25%] gap-10">
                            <div className="flex flex-col space-y-3">
                                <span className="text-left font-semibold">Paying From</span>
                                <div className="grid grid-cols-4 gap-x-10">
                                    {!(teams && selectedTeam) ? <ClipLoader /> : <Dropdown className="h-full" disableAddressDisplay={true} onSelect={setSelectedTeam} nameActivation={true} selected={selectedTeam} list={teams.teams.map(w => ({ name: w.title, address: w.id }))} />}
                                    {!(data && selectedWallet) ? <ClipLoader /> : <Dropdown onSelect={setSelectedWallet} nameActivation={true} selected={selectedWallet} list={list} disableAddressDisplay={true} />}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between py-4 items-center">
                                    <span className="text-left font-semibold">Team Details</span>
                                    <div className="flex space-x-2 items-center">
                                        <input type="checkbox" className="relative cursor-pointer w-[20px] h-[20px] checked:before:absolute checked:before:w-full checked:before:h-full checked:before:bg-primary checked:before:block" onChange={(e) => {
                                            if (e.target.checked) setSelectedId(resMember.current.map(w => w.id))
                                            else setSelectedId([])
                                        }} />
                                        <button type="button">
                                            Select All
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[25%,45%,25%,5%] gap-5">
                                    <div className="font-semibold">Name</div>
                                    <div className="font-semibold">Address</div>
                                    <div className="font-semibold">Disbursement</div>
                                    <div></div>
                                    {teams && resMember && selectedTeam && selectedTeam.address && members && members.length > 0 ? resMember.current.map((w, i) => <TeamInput generalWallet={selectedWallet!} setGeneralWallet={setSelectedWallet} selectedId={selectedId} setSelectedId={setSelectedId} key={generate()} index={i} {...w} members={resMember} />) : 'No Member Yet'}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-y-3 px-5">
                                <div className="font-semibold text-sm opacity-60">Current Balance</div>
                                <div className="font-semibold text-sm opacity-60">Current Amount To Send</div>
                                <div className="font-semibold text-sm opacity-60">Selected People</div>
                                <div className="font-semibold text-sm opacity-60">Balance After Transaction</div>
                                {selectedId.length === 0 && <div className="col-span-4 text-center pt-5">No Selected Member Yet</div>}
                                {selectedId.length > 0 && currentBalances && selectedBalances && selectedBalances.length > 0 && currentBalances.length > 0 &&
                                    <>
                                        <div className={'flex flex-col space-y-5'}>
                                            {
                                                currentBalances.map((w) => {
                                                    return <div className="flex flex-col space-y-3">
                                                        <div>
                                                            {w.amount.toFixed(2)} {w.coins.name}
                                                        </div>
                                                        <div className="text-black opacity-50">
                                                            {(w.amount * w.reduxValue).toFixed(2)} USD
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="flex flex-col space-y-5">
                                            {
                                                selectedBalances
                                            }
                                        </div>
                                        <div className="text-black opacity-50 text-sm">
                                            {selectedId.length} people
                                        </div>
                                        <div className={'flex flex-col space-y-5'}>
                                            {selectedBalanceResult}
                                        </div>
                                    </>}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-left">Description (Optional)</span>
                                <div className="grid grid-cols-1">
                                    <textarea className="border-2 rounded-xl" name="description" id="" cols={30} rows={5}></textarea>
                                </div>
                            </div>
                        </div>
                            <div className="flex justify-center">
                                <div className="grid grid-cols-2 w-[400px] justify-center gap-5">
                                    <button type="button" className="border-2 border-primary px-3 py-2 text-primary rounded-lg" onClick={() => router.goBack()}>Close</button>
                                    <button type="submit" className="bg-primary px-3 py-2 text-white flex items-center justify-center rounded-lg">{isPaying ? <ClipLoader /> : 'Pay'}</button>
                                </div>
                            </div> </>}
                    </div>
                </div>
            </div>
        </form>
        {isSuccess && <Success onClose={setSuccess} />}
        {isError && <Error onClose={setError} />}
    </div>

}

export default MassPay;