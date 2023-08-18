import { combineReducers } from '@reduxjs/toolkit'
import restroomsReducer from './restroomsSlice'
import locationReducer from './locationSlice'


const rootReducer = combineReducers({
    restrooms: restroomsReducer,
    location: locationReducer
})


export default rootReducer
