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
  } from '../actions';
   
  const initialState = {
    cryptoWallet: {
        id: null,
        address: null,
    },
    fiatWallet: {
        phone: {
            id: null,
            key: null
        }, 
        email: {
            id: null,
            key: null
        },  
        cpf_cnpj: {
            id: null,
            key: null
        }, 
        randomkey: {
            id: null,
            key: null
        }, 
    },
    fiatTransference: {
        CPF: null,
        phone: null,
        pixType: null,
        ammount: null,
        },
    pixTransference: {
        amount: null,
        pix_account: null,
        price: null,
        },
    cryptoTransference: {
        id: null,
        address: null,
        ammount: null,
    },
    selected_wallet: 'lovecrypto',
  };
  
  export const withdrawReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CRYPTO_WALLET:
            return {
                ...state,
                cryptoWallet: action.payload,
            };
        case SET_ORIGIN_WALLET:
            return {
                ...state,
                selected_wallet: action.payload,
            };
        case SET_FIAT_WALLET:
            return {
                ...state,
                fiatWallet: {
                    phone: action.payload,
                    email: action.payload,
                    cpf_cnpj: action.payload,
                    randomkey: action.payload,
                },
            }; 
        case SET_PIX_WALLET_PHONE:
            return {
                ...state,
                fiatWallet: {
                    phone: action.payload,
                    email: state.fiatWallet.email,
                    cpf_cnpj: state.fiatWallet.cpf_cnpj,
                    randomkey: state.fiatWallet.randomkey,  
                },
            }; 
        case SET_PIX_WALLET_EMAIL:
            return {
                ...state,
                fiatWallet: {
                    phone: state.fiatWallet.phone,
                    email: action.payload,
                    cpf_cnpj: state.fiatWallet.cpf_cnpj,
                    randomkey: state.fiatWallet.randomkey,  
                },
            }; 
        case SET_PIX_WALLET_CPF_CNPJ:
            return {
                ...state,
                fiatWallet: {
                    phone: state.fiatWallet.phone,
                    email: state.fiatWallet.email,
                    cpf_cnpj: action.payload,
                    randomkey: state.fiatWallet.randomkey,  
                    
                },
            }; 
        case SET_PIX_WALLET_RANDOMKEY:
            return {
                ...state,
                fiatWallet: {
                    phone: state.fiatWallet.phone,
                    email: state.fiatWallet.email,
                    cpf_cnpj: state.fiatWallet.cpf_cnpj,
                    randomkey: action.payload, 
                },
            }; 
        case SET_FIAT_TRANSFERENCE:
            return {
                ...state,
                fiatTransference: action.payload,
            };
        case SET_PIX_TRANSFERENCE:
            return {
                ...state,
                pixTransference: action.payload, 
            };
            // SET_PIX_TRANSFERENCE
        case SET_CRYPTO_TRANSFERENCE:
            return {
                ...state,
                cryptoTransference: action.payload
            };
        case CLEAR_WALLET:
            return {
                ...state,
                cryptoWallet: {
                    id: null,
                    hash: null,
                },
                fiatWallet: {
                    id: null,
                    agency: null,
                    account: null
                    },
                fiatTransference: {
                    id: null,
                    hash: null,
                    },
                cryptoTransference: null,
                };
        default:
            return state;
    }
  };