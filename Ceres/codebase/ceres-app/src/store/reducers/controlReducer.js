import {
    SET_APP_VERSION,
    SET_HAS_TASKS,
    UPDATE_TASKS_FEED,
    UPDATED_TASKS_FEED,
    UPDATE_USER_DATA,
    UPDATED_USER_DATA,
    UPDATE_APP_FEED,
    UPDATED_APP_FEED, 
} from '../actions'
  
const initialState = {
    appVersion: '1.0.0',
    hasTasks: true,
    userDataUpdating: true, 
    tasksFeedUpdating: true,  
};
  
export const controlReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_APP_VERSION:
        return {
            ...state,
            appVersion: action.payload
        };
    case SET_HAS_TASKS:
        return {
            ...state,
            hasTasks: action.payload, 
        }; 
    case UPDATE_TASKS_FEED:
        return {
            ...state,
            tasksFeedUpdating: true, 
        };   
    case UPDATED_TASKS_FEED:
        return {
            ...state,
            tasksFeedUpdating: false, 
        };  
    
    case UPDATE_USER_DATA:
        return {
            ...state,
            userDataUpdating: true, 
        };   
    case UPDATED_USER_DATA:
        return {
            ...state,
            userDataUpdating: false, 
        };   
    case UPDATE_APP_FEED:
        return {
            ...state,
            tasksFeedUpdating: true, 
            userDataUpdating: true,  
            
        };
    case  UPDATED_APP_FEED:
        return {
            ...state,
            tasksFeedUpdating: false, 
            userDataUpdating: false,  
        }; 
    default:
        return state;
}
};