import { createSlice } from '@reduxjs/toolkit'

const blogInfoSLice = createSlice({
    name : 'blog' , 
    initialState : {} ,
    reducers : {
        "INIT_BLOG_INFO" : (state , action) => {
            return action.payload
        },
        "CHANGE_BLOG_INFO" : (state , action) => {
            return action.payload
        }
    }
})


export default blogInfoSLice.reducer
