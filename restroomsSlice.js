import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  restrooms: [],
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
    
      return {
        ...state,
        restrooms: action.payload // payload is array of post objects
      }
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