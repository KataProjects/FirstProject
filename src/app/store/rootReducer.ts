import {combineReducers} from '@reduxjs/toolkit';
import globalReducer from './globalSlice.ts';

const rootReducer = combineReducers({
    global: globalReducer,
});

export default rootReducer;
