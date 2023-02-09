import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name : 'loader' , 
    initialState : false ,
    reducers : {
        'START_LOADING' : (state , action) => true , 
        'FINISH_LOADING' : (state , action) => false
    }
})

export default loaderSlice.reducer 
export const {START_LOADING , FINISH_LOADING} = loaderSlice.actions