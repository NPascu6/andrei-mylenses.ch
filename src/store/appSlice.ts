import {createSlice} from '@reduxjs/toolkit';

interface AppState {
    toaster: {
        isVisible: boolean;
        message: string;
    }
    photos: any[];
    canvasPhotos: any[];
}

const initialState: AppState = {
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

export const {showToaster, setPhotos, setCanvasPhotos} = appSlice.actions;
export default appSlice.reducer;
