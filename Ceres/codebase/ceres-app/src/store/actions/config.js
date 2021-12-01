import {
    SET_APP_NOTIFICATIONS,
    SET_EMAIL_NOTIFICATIONS,
    SET_DARK_MODE,
    SET_CURRENCY,
    SET_LANGUAGE,
    SET_BRL_VALUE,
    SET_SALDO_VISIVEL,
} from './'

export const toggleAppNotifications = value => ({
    type: SET_APP_NOTIFICATIONS,
    payload: value,
});

export const toggleEmailNotifications = value => ({
    type: SET_EMAIL_NOTIFICATIONS,
    payload: value,
});

export const setBRLValue = value => ({
    type: SET_BRL_VALUE,
    payload: value,
});

export const toggleDarkMode = value => ({
    type: SET_DARK_MODE,
    payload: value,
});

export const setCurrency = currency => ({
    type: SET_CURRENCY,
    payload: currency
});

export const setLanguage = language => ({
    type: SET_LANGUAGE,
    payload: language
});

export const setSaldoVisivel = () => ({
    type: SET_SALDO_VISIVEL,
});