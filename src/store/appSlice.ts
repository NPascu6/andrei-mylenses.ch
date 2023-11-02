import { createSlice } from '@reduxjs/toolkit';

interface AppState {
    isDarkTheme: boolean;
    toaster: {
        isVisible: boolean;
        message: string;
    }
    photos: any[];
    canvasPhotos: any[];
}

const initialState: AppState = {
    isDarkTheme: true,
    toaster: {
        isVisible: false,
        message: ''
    },
    photos: [],
    canvasPhotos: []
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.isDarkTheme = action.payload;
        },
        showToaster: (state, action) => {
            state.toaster.isVisible = action.payload;
        },
        setPhotos: (state, action) => {
            state.photos = action.payload;
        },
        setCanvasPhotos: (state, action) => {
            state.canvasPhotos = action.payload;
        }
    },
});

export const { setTheme, showToaster, setPhotos, setCanvasPhotos } = appSlice.actions;
export default appSlice.reducer;