import { combineReducers } from '@reduxjs/toolkit';
import { baseAPI } from '@shared/api/baseAPI.ts';


import categoriesReducer from './categoriesSlice.ts';
import globalReducer from './globalSlice.ts';

const rootReducer = combineReducers({
  global: globalReducer,
  categories: categoriesReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

export default rootReducer;
