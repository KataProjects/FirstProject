import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
    category: string | null;
}

const initialState: CategoriesState = {
    category: null
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        }
    }
})

export const { setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;