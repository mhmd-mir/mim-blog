import { createSlice } from '@reduxjs/toolkit'

const commentSlice = createSlice({
    name : 'comments' , 
    initialState : [],
    reducers : {
        "INIT_COMMENTS" : (state , action) => {
            return [
                ...action.payload
            ]
        } ,
        "CONFIRM_COMMENT"  : (state , action) => {
            const index = state.findIndex(comment => comment.id === action.payload.id)
            state[index].isConfirm = 1 ;
        } ,
        "REJECT_COMMENT" : (state , action) => {
            const index = state.findIndex(comment => comment.id === action.payload.id)
            state[index].isConfirm = 0 ;
        },
        "DELETE_COMMENT" : (state , action) => {
            const newComments = state.filter(comment => comment.id !== action.payload.id)
            return newComments;
        },
        "ADD_COMMENT" : (state , action) => {
            state.push(action.payload)
        }
    }
})

export const {ADD_COMMENT , INIT_COMMENTS} = commentSlice.actions
export default commentSlice.reducer
