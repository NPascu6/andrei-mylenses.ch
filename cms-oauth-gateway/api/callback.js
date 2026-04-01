import {
    clearStateCookie,
    exchangeCodeForToken,
    getStateFromCookie,
    renderCallbackPage,
} from './_shared.js';

export default async function handler(req, res) {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = getStateFromCookie(req.headers.cookie);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (!code || !state || !storedState || state !== storedState) {
        clearStateCookie(res);
        res.statusCode = 400;
        res.end(
            renderCallbackPage({
                status: 'error',
                payload: {error: 'Invalid or expired OAuth state. Please try again.'},
            })
        );
        return;
    }

    try {
        const token = await exchangeCodeForToken({code});
        clearStateCookie(res);
        res.statusCode = 200;
        res.end(
            renderCallbackPage({
                status: 'success',
                payload: {
                    token,
                    provider: 'github',
                },
            })
        );
    } catch (error) {
        clearStateCookie(res);
        res.statusCode = 500;
        res.end(
            renderCallbackPage({
                status: 'error',
                payload: {
                    error: error instanceof Error ? error.message : 'GitHub OAuth callback failed.',
                },
            })
        );
    }
}
