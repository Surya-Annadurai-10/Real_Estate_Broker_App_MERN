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
        },
        updateInStart  :(state , action) =>{
            state.loading = true;
         },
         updateInFailure : (state , action) =>{
             state.error = action.payload,
             state.loading = false
         },
         updateInSuccess : (state , action) =>{
             state.userData = action.payload.data;
             state.loading = false;
             state.error = action.payload;
         },
        deleteInStart  :(state , action) =>{
            state.loading = true;
         },
         deleteInFailure : (state , action) =>{
             state.error = action.payload,
             state.loading = false
         },
         deleteInSuccess : (state , action) =>{
             state.userData = action.payload.data;
             state.loading = false;
             state.error = action.payload;
         }
         ,
         cleaupError : (state , action) =>{
            state.error = null
            state.loading = false;
         }
    }
})

export const {loginInStart,deleteInStart,deleteInFailure,deleteInSuccess ,cleaupError, updateInFailure, updateInStart,updateInSuccess, loginInFailure , loginInSuccess} = userSlice.actions;
export const userReducer = userSlice.reducer;
