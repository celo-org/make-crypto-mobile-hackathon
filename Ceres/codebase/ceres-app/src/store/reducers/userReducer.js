import { 
    SET_CURRENT_USER, 
    REMOVE_CURRENT_USER,
    UPDATE_USER_CPF,
    UPDATE_USER_PHONE,
    ADD_USER_BALANCE,
    ADD_USER_POINTS,
    UPDATE_USER_ADDRESS,
    SET_USER_PHOTO,
    SET_PHONE_VERIFIED,
    SET_EMAIL_VERIFIED, 
    SET_USER_GENDER,
    SET_DOCUMENTS_VERIFIED,
    SET_WALLETS,
  } from '../actions/';
  
  const initialState = {
    name: null,
    email: null,
    balance: 0,
    points: 0,
    cpf: null,
    gender: 1,
    address: {},
    recommendation_code: null,
    id: 0,
    photoUrl: null,
    emailVerified: false,
    wallets: [],
    phoneVerified: false,
    documentsVerified: false,
    phone: null,
    
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
          return {
            ...state,
            address: action.payload.address,
            balance: action.payload.balance,
            cpf: action.payload.cpf, 
            email: action.payload.email,
            emailVerified: action.payload.email_confirmed,
            documentsVerified: action.payload.kyc_valid,
            gender: action.payload.gender,
            id: action.payload.id,
            name: action.payload.name,
            phone: action.payload.phone,
            phoneVerified: action.payload.phone_confirmed,
            points: action.payload.points,
            recommendation_code: action.payload.recommendation_code, 
          };
        case REMOVE_CURRENT_USER:
          return {
            ...state,
            name: null,
            email: null,
            balance: 0,
            points: 0,
            cpf: null,
            address: {},
            recommendation_code: null,
            id: 0,
            photoUrl: null,
          };
        case SET_USER_PHOTO:
          return {
            ...state,
            photoUrl: action.payload
          };
        case SET_USER_GENDER:
          return {
            ...state,
            gender: action.payload
          };
        case SET_EMAIL_VERIFIED:
          return {
            ...state,
            emailVerified: true
          };
        case SET_WALLETS:
          return {
            ...state,
            wallets: action.payload
          };
        case SET_PHONE_VERIFIED:
          return {
            ...state,
            phoneVerified: true
          };
        case SET_DOCUMENTS_VERIFIED:
          return {
            ...state,
            documentsVerified: true
          };
        case UPDATE_USER_CPF:
          return {
            ...state,
            cpf: action.payload
          };
        case UPDATE_USER_PHONE:
          return {
            ...state,
            phone: action.payload
          };
        case UPDATE_USER_ADDRESS:
          return {
            ...state,
            address: action.payload
          };
        case ADD_USER_BALANCE:
          return {
            ...state,
            balance: action.payload
          };
        case ADD_USER_POINTS:
          return {
            ...state,
            points: action.payload
          };
      default:
        return state;
    }
  };