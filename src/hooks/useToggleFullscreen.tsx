import {useState} from 'react';
import {useBodyScrollLock} from './useBodyScrollLock';

function useFullScreenToggle(initialState = false) {
    const [isFullScreen, setFullScreen] = useState(initialState);
    useBodyScrollLock(isFullScreen);

    const toggleFullScreen = () => {
        setFullScreen((current) => !current);
    };

    const openFullScreen = () => {
        setFullScreen(true);
    };

    const closeFullScreen = () => {
        setFullScreen(false);
    };

    return {isFullScreen, toggleFullScreen, openFullScreen, closeFullScreen};
}

export default useFullScreenToggle;
