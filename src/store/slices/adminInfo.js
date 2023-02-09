import { createSlice } from '@reduxjs/toolkit'

const adminInfoSlice = createSlice({
    name : 'admin' , 
    initialState : {} ,
    reducers : {
        "INIT_ADMIN_INFO" : (state , action) => {
            return action.payload
        },
        "CHANGE_ADMIN_INFO" : (state , action) => {
            return action.payload
        },
        "CHANGE_PASSWORD": (state , action) => {
            return {
                ...state ,
                password : action.payload.password
            }
        }
    }
})


export default adminInfoSlice.reducer
