import detectEthereumProvider from '@metamask/detect-provider';
import React, {useState} from 'react';
import {Button} from  'reactstrap'
import API from '../../api';
import TokensTable from './TokensTable'
import './styles.css';

let provider

const onError = (e) => {
    alert(e?.message)
}

const getAccountApiRequest = async () => {
    const account = await getUserAccount()
    if (!account) return undefined
    return {
        networkId: +window.ethereum.networkVersion,
        account
    }
}

const requestAccountAccess = async () => {
    return await provider.request({ method: 'eth_requestAccounts' })
}

const handleChainChanged = (_chainId) => {
    window.location.reload()
}

const getUserAccount = async () => {
    const result = await provider.request({ method: 'eth_accounts' }).catch((e) => {
        onError(e)
        return undefined
    })
    if (result?.length > 0) {
        return result?.[0]
    }
    onError(Error('Can not access Metamask accounts'))
    return undefined
}

const Wallet = () => {
    const [tableData, setTableData] = useState({})

    const onAccountChanged = async () => {
        const request = await getAccountApiRequest()
        const data = {
            address: request.account,
            networkId: request.networkId
        }
        const response = await API.get(`content/byAddress`, { params: data })
        if(response.data.message) {
            alert(response.data.message)
            return;
        }
        setTableData(response.data)
    }

    const initProviderListeners = () => {
        provider.on('chainChanged', handleChainChanged)
        provider.on('accountsChanged', onAccountChanged)
    }
    const onWalletConnecting = async () => {
        provider = await detectEthereumProvider()
        if (!provider) onError(Error('Can not access Metamask'))
        if (provider !== window.ethereum) {
            onError(Error('Do you have multiple wallets installed?'))
        }
        initProviderListeners()
        await requestAccountAccess()
        onAccountChanged()
    }

    return (
        <>
            {tableData.content
                ? <TokensTable data={tableData}/>
                : <div className='wallet-wrap'>
                    <div className='connect-content-wrap'>
                        <div className='logo' />
                        <Button
                            className='connect-btn'
                            onClick={() => onWalletConnecting()}>
                            Connect Your Wallet
                        </Button>
                    </div>
                </div>
            }
        </>

    );
}

export default Wallet;
