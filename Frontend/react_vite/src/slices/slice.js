import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null,
    loading : false,
    error :null
}       

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        loginInStart  :(state , action) =>{
           state.loading = true;
        },
        loginInFailure : (state , action) =>{
            state.error = action.payload,
            state.loading = false
        },
        loginInSuccess : (state , action) =>{
            state.userData = action.payload.data;
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {loginInStart , loginInFailure , loginInSuccess} = userSlice.actions;
export const userReducer = userSlice.reducer;
