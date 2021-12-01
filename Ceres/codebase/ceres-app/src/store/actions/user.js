import {
    SET_CURRENT_USER,
    REMOVE_CURRENT_USER,
    UPDATE_USER_CPF,
    UPDATE_USER_PHONE,
    UPDATE_USER_ADDRESS,
    ADD_USER_POINTS,
    ADD_USER_BALANCE,
    SET_USER_PHOTO,
    SET_PHONE_VERIFIED,
    SET_EMAIL_VERIFIED,
    SET_DOCUMENTS_VERIFIED,
    SET_USER_GENDER,
    SET_WALLETS,
    SET_SALDO_VISIVEL,
} from './'
 
export const setUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});
 
export const removeUser = () => ({
    type: REMOVE_CURRENT_USER,
});
  
export const updateUserCPF = cpf => ({
    type: UPDATE_USER_CPF,
    payload: cpf
});
 
export const setWallets = wallets => ({
    type: SET_WALLETS,
    payload: wallets
});

export const updateUserPhone = phone => ({
    type: UPDATE_USER_PHONE,
    payload: phone
});

export const updateUserGender = gender => ({
    type: SET_USER_GENDER,
    payload: gender
});

export const updateUserAddress = address => ({
    type: UPDATE_USER_ADDRESS,
    payload: address
});
 
export const addUserBalance = balance => ({
    type: ADD_USER_BALANCE,
    payload: balance
});

export const addUserPoints = points => ({
    type: ADD_USER_POINTS,
    payload: points
});

export const setUserPhoto = photoURL => ({
    type: SET_USER_PHOTO,
    payload: photoURL
});

export const setPhoneVerified = () => ({
    type: SET_PHONE_VERIFIED,
});



export const setEmailVerified = () => ({
    type: SET_EMAIL_VERIFIED,
});
 
export const setDocumentsVerified = () => ({
    type: SET_DOCUMENTS_VERIFIED,
});

 