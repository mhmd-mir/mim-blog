import {configureStore} from "@reduxjs/toolkit" ;
import allReducers from './reducer';
import API from './middlewares/API'

const store = configureStore({
    reducer : allReducers ,
    middleware : [API] 
})

export default store ;