import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  locations: {},
  isLoading: false,
  error: null  
};

const restroomsSlice = createSlice({
  name: 'restrooms',
  initialState,
  reducers: {
    getRestroomsStart(state) {
      state.isLoading = true;
    },
    getRestroomsSuccess(state, action) {
      state.isLoading = false;
      state.locations = action.payload; 
    },
    getRestroomsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  getRestroomsStart, 
  getRestroomsSuccess,
  getRestroomsFailed
} = restroomsSlice.actions;

export default restroomsSlice.reducer;