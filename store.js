import { configureStore } from '@reduxjs/toolkit';

//import rootReducer from './rootReducer'
import restroomsReducer from './restroomsSlice'
import locationReducer from './locationSlice'


export const store = configureStore({
    reducer:{
        restrooms: restroomsReducer,
        location: locationReducer
    }
    
})



export default store

// import { configureStore } from '@reduxjs/toolkit';

// import rootReducer from './rootReducer'


// const store = configureStore({
//     reducer: rootReducer,
// })



// export default store