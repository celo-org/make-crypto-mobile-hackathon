import {
    SET_REFERAL_CODE,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    SET_FIRST_ACCESS,
    SET_PIN,
} from './'

export const setReferalCode = code => ({
    type: SET_REFERAL_CODE,
    payload: code
});

export const setPin = pin => ({
    type: SET_PIN,
    payload: pin
});

export const loginStart = provider => ({
    type: SIGN_IN_START,
    payload: provider
});

export const loginSuccess = () => ({
    type: SIGN_IN_SUCCESS,
});

export const loginFailure = error => ({
    type: SIGN_IN_FAILURE,
    payload: error
});

export const signOut = () => ({
    type: SIGN_OUT,
});

export const signUpStart = provider => ({
    type: SIGN_UP_START,
    payload: provider,
});

export const signUpSuccess = () => ({
    type: SIGN_UP_SUCCESS,
});

export const signUpFailure = error => ({
    type: SIGN_UP_FAILURE,
    payload: error
});

export const setFirstAccess = () => ({
    type: SET_FIRST_ACCESS,
   
});
