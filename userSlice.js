import { createSlice } from '@reduxjs/toolkit';


const initialState = {
user: false,
isLoading: false,
error: null  
};

const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
    getUserStart(state) {
    state.isLoading = true;
    },
    getUserSuccess(state, action) {
    
    return {
        ...state,
        user: action.payload // payload is array of post objects
    }
    },
    getUserFailed(state, action) {
    state.isLoading = false;
    state.error = action.payload;
    }
}
});

export const { 
getUserStart, 
getUserSuccess,
getUserFailed
} = userSlice.actions;

export default userSlice.reducer;