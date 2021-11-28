import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface NotificatinoState {
    onSuccess: boolean;
    onError: boolean;
}

const initialState: NotificatinoState = {
    onSuccess: false,
    onError: false,
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        changeError: (state, action: PayloadAction<boolean>) => {
            state.onError = action.payload;
        },
        changeSuccess: (state, action: PayloadAction<boolean>) => {
            state.onSuccess = action.payload;
        }
    },
})

export const { changeError, changeSuccess } = notificationSlice.actions

export const selectError = (state: RootState) => state.notification.onError
export const selectSuccess = (state: RootState) => state.notification.onSuccess

export default notificationSlice.reducer