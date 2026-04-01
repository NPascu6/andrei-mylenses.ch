import {buildGitHubAuthorizeUrl, createState, setStateCookie} from './_shared.js';

export default async function handler(req, res) {
    try {
        const state = createState();
        setStateCookie(res, state);
        res.writeHead(302, {Location: buildGitHubAuthorizeUrl({state})});
        res.end();
    } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(error instanceof Error ? error.message : 'Unable to start GitHub OAuth flow.');
    }
}
