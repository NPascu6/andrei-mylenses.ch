import {useEffect, useState} from 'react';

function useFullScreenToggle(initialState = false) {
    const [isFullScreen, setFullScreen] = useState(initialState);

    const toggleFullScreen = () => {
        setFullScreen((current) => !current);
    };

    const openFullScreen = () => {
        setFullScreen(true);
    };

    const closeFullScreen = () => {
        setFullScreen(false);
    };

    useEffect(() => {
        if (isFullScreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // Reset body overflow on unmount
        };
    }, [isFullScreen]);


    return {isFullScreen, toggleFullScreen, openFullScreen, closeFullScreen};
}

export default useFullScreenToggle;
