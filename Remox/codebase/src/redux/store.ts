import { configureStore } from '@reduxjs/toolkit'
import Notification from './reducers/notificationSlice'
import Storage from './reducers/storage'
import Unlock from './reducers/unlock'
import Currency from './reducers/currencies'
import Toggle from './reducers/toggles'
import { accountAPI, customerAPI, teamAPI, transactionAPI, teamMemberAPI, BlockScoutApi } from './api'

const store = configureStore({
    reducer: {
        notification: Notification,
        storage: Storage,
        unlock: Unlock,
        currencies: Currency,
        toggle: Toggle,
        [accountAPI.reducerPath]: accountAPI.reducer,
        [customerAPI.reducerPath]: customerAPI.reducer,
        [teamAPI.reducerPath]: teamAPI.reducer,
        [teamMemberAPI.reducerPath]: teamMemberAPI.reducer,
        [transactionAPI.reducerPath]: transactionAPI.reducer,
        [BlockScoutApi.reducerPath]: BlockScoutApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(accountAPI.middleware, customerAPI.middleware, transactionAPI.middleware, teamAPI.middleware, teamMemberAPI.middleware, BlockScoutApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;