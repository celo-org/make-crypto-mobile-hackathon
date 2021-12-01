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
  SET_PIN
} from '../actions';

const initialState = {
  referedBy: null,
  logged: false,
  isLoggin: false,
  isSigningUp: false,
  isSigned: false,
  provider: null,
  firstAccess: false,
  error: null,
  pin: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIRST_ACCESS:
      return {
        ...state,
        firstAccess: true,
      };
    case SET_PIN:
      return {
        ...state,
        pin: action.payload,
      }; 
    case SET_REFERAL_CODE:
      return {
        ...state,
        referedBy: action.payload,
      };
    case SIGN_IN_START:
      return {
        ...state,
        logged: false,
        isLoggin: true,
        provider: action.payload,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoggin: false,
        logged: true,
        error: null,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isLoggin: false,
        isSigningUp: false,
        logged: false,
        isSigned: false, 
        error: action.payload
      };
    case SIGN_UP_START:
      return {
        ...state,
        isSigningUp: true,
        isSigned: false,
        error: null,
        provider: action.payload,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isSigned: true,
        error: null,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        isSigned: false,
        isLoggin: false,
        logged: false,
        error: action.payload
      };
    case SIGN_OUT:
      return {
        ...state,
        referedBy: null,
        logged: false,
        isLoggin: false,
        isSigningUp: false,
        isSigned: false,
        provider: null,
        firstAccess: false,
        error: null,
      };
    default:
      return state;
  }
};