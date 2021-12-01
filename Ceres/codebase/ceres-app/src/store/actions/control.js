import {
    SET_APP_VERSION,
    SET_HAS_TASKS,
    UPDATE_TASKS_FEED,
    UPDATED_TASKS_FEED,
    UPDATE_USER_DATA,
    UPDATED_USER_DATA,
    UPDATE_APP_FEED,
    UPDATED_APP_FEED, 
} from './'
 
export const setAppVersion = version => ({
    type: SET_APP_VERSION,
    payload: version
});
 
export const updateTasksFeed = () => ({
    type: UPDATE_TASKS_FEED,
});

export const updatedTasksFinished = () => ({
    type: UPDATED_TASKS_FEED,
});

export const setHasTasks = value => ({
    type: SET_HAS_TASKS,
    payload: value
});

export const updateUserData = () => ({
    type: UPDATE_USER_DATA,
});

export const updateUserDataFinished = () => ({
    type: UPDATED_USER_DATA,
});
 
export const updateFeed = () => ({
    type: UPDATE_APP_FEED,
});

export const updateFinished = () => ({
    type: UPDATED_APP_FEED,
}); 

