import { configureStore } from '@reduxjs/toolkit';
import { baseAPI } from '@shared/api/baseAPI.ts';

import rootReducer from './rootReducer.ts';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseAPI.middleware),
});

export default store;
