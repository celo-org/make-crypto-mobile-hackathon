import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IStorage {
    accountAddress: string,
    encryptedPhrase: string,
    token: string,
    userName?: string;
    surname?: string,
    companyName?: string,
}

interface IContainer {
    user: IStorage | null
}

const initialState = (): IContainer => {
    const val = localStorage.getItem("user")

    if (val) {
        const data: IStorage = JSON.parse(val)
        return { user: data }
    }
    return { user: null };
}


export const storageSlice = createSlice({
    name: "storage",
    initialState: initialState(),
    reducers: {
        setStorage: (state, action) => {
            localStorage.setItem("user", action.payload)
            const data: IStorage = JSON.parse(action.payload)
            state.user = data
        }
    }
})

export const { setStorage } = storageSlice.actions

export const selectStorage = (state: RootState) => state.storage.user

export default storageSlice.reducer