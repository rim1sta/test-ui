
import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";




export interface LoginState {
    token: string | null;
    isError: boolean
};


export const loginSlice = createSlice<LoginState, SliceCaseReducers<LoginState>>({
    name: 'login', 
    initialState: {
        token: sessionStorage.getItem('token'),
        isError: false
    }, 
    reducers: {
        setToken(state: LoginState, action: PayloadAction<string>): LoginState {
            const token = action.payload;
            sessionStorage.setItem('token', token);
            const newState: LoginState = {...state, token};
            return newState;
        },
        clearToken(state: LoginState, action: PayloadAction<unknown>): LoginState {
            const token = action.payload;
            sessionStorage.clear();
            return {...state, token: null};
        },
        setIsError(state: LoginState, action: PayloadAction<boolean>): LoginState {
            const isError = action.payload;
            const newState: LoginState = {...state, isError};
            return newState;
        }
    }, 
});
