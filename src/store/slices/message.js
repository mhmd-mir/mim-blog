import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
    name : 'messages' , 
    initialState : [],
    reducers : {
        "ADD_MESSAGE" : (state , action) => {
            // state.push(action.payload);
            return [
                action.payload
            ]
        },
        "REMOVE_MESSAGE" : (state , action) => {
            // const newMessagesList = state.filter(message => message.id !== action.payload.id)
            // return newMessagesList ;
            return []
        }
    }
})

export const {ADD_MESSAGE} = messagesSlice.actions
export default messagesSlice.reducer
