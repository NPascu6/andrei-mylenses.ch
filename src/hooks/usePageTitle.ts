import {useEffect} from 'react';
import {setDocumentTitle} from '../utils/browserRuntime';

export const usePageTitle = (title?: string) => {
    useEffect(() => {
        if (!title) {
            return;
        }

        setDocumentTitle(title);
    }, [title]);
};
