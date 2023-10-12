import { createSlice } from '@reduxjs/toolkit';

interface AppState {
    isDarkTheme: boolean;
}

const initialState: AppState = {
    isDarkTheme: true,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.isDarkTheme = action.payload;
        },
    },
});

export const { setTheme } = appSlice.actions;
export default appSlice.reducer;