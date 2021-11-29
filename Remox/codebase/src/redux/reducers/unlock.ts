import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUnlock {
    unlock: boolean;
}

const initialState: IUnlock = {
    unlock: false
}


export const unlockSlide = createSlice({
    name: "unlock",
    initialState: initialState,
    reducers: {
        setUnlock: (state, action) => {
            state.unlock =  action.payload;
        }
    }
})

export const { setUnlock } = unlockSlide.actions

export const selectUnlock = (state: RootState) => state.unlock.unlock

export default unlockSlide.reducer