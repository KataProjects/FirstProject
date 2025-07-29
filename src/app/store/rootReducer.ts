import { combineReducers } from '@reduxjs/toolkit';
import { baseAPI } from '@shared/api/baseAPI.ts';

import globalReducer from './globalSlice.ts';

const rootReducer = combineReducers({
  global: globalReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

export default rootReducer;
