 
import {
    SET_CURRENCY_TYPE,
    SET_CRYPTO_WALLET,
    SET_FIAT_WALLET,
    SET_CRYPTO_TRANSFERENCE,
    SET_FIAT_TRANSFERENCE,
    CLEAR_WALLET,
    SET_PIX_WALLET_PHONE,
    SET_PIX_WALLET_EMAIL,
    SET_PIX_WALLET_CPF_CNPJ,
    SET_PIX_WALLET_RANDOMKEY,
    SET_PIX_TRANSFERENCE,
    SET_ORIGIN_WALLET
} from './'

export const setActiveCurrency = currency => ({
    type: SET_CURRENCY_TYPE,
    payload: currency,
});

export const setOriginWallet = wallet => ({
    type: SET_ORIGIN_WALLET,
    payload: wallet,
});

export const setCryptoWallet = (id, address) => ({
    type: SET_CRYPTO_WALLET,
    payload: {
        id: id,
        address: address,
        },
});



export const setFiatWallet = (phone) => ({
    type: SET_FIAT_WALLET,
    payload: {
        phone: phone, 
    }
});
 
export const setPixWalletPhone = (id, phone) => ({
    type: SET_PIX_WALLET_PHONE,
    payload: {
        id: id,
        key: phone
    }
});

export const setPixWalletEmail = (id, email) => ({
    type: SET_PIX_WALLET_EMAIL,
    payload: {
        id: id,
        key: email
    }
});

export const setPixWalletCPFCNPJ = (id, cpf_cnpj) => ({
    type: SET_PIX_WALLET_CPF_CNPJ,
    payload: {
        id: id,
        key: cpf_cnpj
    }
});

export const setPixWalletRandomkey = (id, randomkey) => ({
    type: SET_PIX_WALLET_RANDOMKEY,
    payload: {
        id: id,
        key: randomkey
    }
});
 
export const setFiatTransference = (CPF, pixType, amount) => ({
    type: SET_FIAT_TRANSFERENCE,
    payload: {
        CPF: CPF, 
        ammount: amount,
        pixType: pixType,
        }
});

export const setPixTransference = (amount, pix_account, price, identifier) => ({
    type: SET_PIX_TRANSFERENCE,
    payload: {
        amount: amount,
        pix_account: pix_account,
        price: price,
        identifier: identifier
        }
});


export const setCryptoTransference = (id, address, amount) => ({
    type: SET_CRYPTO_TRANSFERENCE,
    payload: {
        id: id,
        address: address,
        ammount: amount,
        }
});

export const clearWallet = () => ({
    type: CLEAR_WALLET
});