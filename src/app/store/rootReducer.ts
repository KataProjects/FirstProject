import { combineReducers } from '@reduxjs/toolkit';

import globalReducer from './globalSlice.ts';
import { baseAPI } from '@shared/api/baseAPI.ts';

const rootReducer = combineReducers({
  global: globalReducer,
  [baseAPI.reducerPath]: baseAPI.reducer
});

export default rootReducer;
