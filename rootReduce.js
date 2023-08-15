import { combineReducers } from '@reduxjs/toolkit'
import restroomsReducer from './restroomsSlice'

const rootReducer = combineReducers({
    restrooms: restroomsReducer,
})

export default rootReducer