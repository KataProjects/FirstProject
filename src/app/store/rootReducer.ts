import {combineReducers} from '@reduxjs/toolkit';
import globalReducer from './globalSlice.ts';

const rootReducer = combineReducers({
    reducer: globalReducer,
});

export default rootReducer;
