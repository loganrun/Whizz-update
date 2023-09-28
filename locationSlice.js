import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
location: null,
isLoading: false,
error: null  
};

const locationSlice = createSlice({
name: 'location',
initialState,
reducers: {
    getLocationStart(state) {
    state.isLoading = true;
    },
    getLocationSuccess(state, action) {
    const {payload} = action
    state.isLoading = false;
    const loc = payload.coords
    return { ...state, location: {...state.location, loc} };
    },
    getLocationFailed(state, action) {
    state.isLoading = false;
    state.error = action.payload;
    }
}
});


export const {
getLocationStart,
getLocationSuccess,
getLocationFailed
} = locationSlice.actions;

export default locationSlice.reducer;

