import {createSlice} from '@reduxjs/toolkit';
import {ThemePresetId} from '../utils/themePreferences';

interface AppState {
    themePreset: ThemePresetId;
    toaster: {
        isVisible: boolean;
        message: string;
    }
    photos: any[];
    canvasPhotos: any[];
}

const initialState: AppState = {
    themePreset: 'noir',
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
        setThemePreset: (state, action) => {
            state.themePreset = action.payload;
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

export const {setThemePreset, showToaster, setPhotos, setCanvasPhotos} = appSlice.actions;
export default appSlice.reducer;
