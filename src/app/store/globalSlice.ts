import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isLoading: false,
    user: null,
};

const globalSlice = createSlice({
    name: 'global', initialState,
    reducers: {
        setLoading(state, action){
            state.isLoading = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        logout(state){
            state.user = null;
        },
    },
});

export const { setLoading, setUser, logout } = globalSlice.actions;
export default globalSlice.reducer;
