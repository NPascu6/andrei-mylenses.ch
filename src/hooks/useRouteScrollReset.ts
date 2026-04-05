import {useEffect} from 'react';

export const useRouteScrollReset = (pathname: string) => {
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        window.scrollTo(0, 0);
    }, [pathname]);
};
