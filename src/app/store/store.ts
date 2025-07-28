import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer.ts';
import { baseAPI } from '@shared/api/baseAPI.ts';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(baseAPI.middleware)
});

export default store;
