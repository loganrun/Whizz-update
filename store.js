import { configureStore } from '@reduxjs/toolkit';
import restroomsReducer from './restroomsSlice'
import locationReducer from './locationSlice'
import userReducer from './userSlice'



export const store = configureStore({
    reducer:{
        restrooms: restroomsReducer,
        location: locationReducer,
        user: userReducer
    }
    
})



export default store

