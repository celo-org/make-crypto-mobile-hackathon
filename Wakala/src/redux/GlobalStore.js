import Auth from "./reducers/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


let initialState = {
    finishedBoarding: false,
    userMetadata: null,
    magic: {},
    phoneNumber: null,
    transactions: [],
    contractMethods: {}
}

const saveSession = async (state) => {
    await AsyncStorage.setItem('user', JSON.stringify({...state, magic: null, contractMethods: null}))
}

export default function globalStore(state = initialState, action) {
    let nextState
    const auth = new Auth(state)
    switch(action.type){
        case 'INIT':
            nextState = {...state, ...action.value}
            return nextState || state
        case 'INIT_CONTRACT_METHODS':
            nextState = {...state, contractMethods: action.value}
            return nextState || state
        case 'UPDATE_USER_METADATA':
            nextState = {...state, ...action.value}
            return nextState || state
        case 'FINISHED_BOARDING':
            nextState = {...state, finishedBoarding: true}
            saveSession(nextState).then()
            return nextState || state
        case 'LOGIN':
            //Todo Implement all the LOGIN logic
            nextState = {...state, ...action.value}
            return nextState || state
        case 'LOGOUT':
            //Todo Implement all the logout logic
            nextState = {...state, finishedBoarding: false}
            saveSession(nextState).then()
            return nextState || state

        case 'ADD_TRANSACTION':
            const index = state.transactions.findIndex( item => item.id === action.value.id)
            if(index === -1) {
                nextState = {...state, transactions: [action.value, ...state.transactions]}
            }
            else {
                // We just update the transaction
                let elements = state.transactions
                console.log(elements[index])
                elements.splice(index, 1)
                nextState = {...state, transactions: [action.value, ...elements]}
            }
            return nextState || state
        default:
            return state
    }
}