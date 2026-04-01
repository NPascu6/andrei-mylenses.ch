import crypto from 'node:crypto';

const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize';
const githubTokenUrl = 'https://github.com/login/oauth/access_token';

export const getEnv = (name) => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
};

export const getCallbackUrl = () =>
    process.env.GITHUB_CALLBACK_URL || `${getEnv('PUBLIC_OAUTH_PROXY_URL')}/api/callback`;

export const createState = () => crypto.randomBytes(24).toString('hex');

export const buildGitHubAuthorizeUrl = ({state}) => {
    const params = new URLSearchParams({
        client_id: getEnv('GITHUB_CLIENT_ID'),
        redirect_uri: getCallbackUrl(),
        scope: 'repo',
        state,
    });

    return `${githubAuthorizeUrl}?${params.toString()}`;
};

export const exchangeCodeForToken = async ({code}) => {
    const response = await fetch(githubTokenUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'andrei-mylenses-cms-oauth-gateway',
        },
        body: JSON.stringify({
            client_id: getEnv('GITHUB_CLIENT_ID'),
            client_secret: getEnv('GITHUB_CLIENT_SECRET'),
            code,
            redirect_uri: getCallbackUrl(),
        }),
    });

    if (!response.ok) {
        throw new Error(`GitHub token exchange failed with status ${response.status}`);
    }

    const payload = await response.json();

    if (payload.error || !payload.access_token) {
        throw new Error(payload.error_description || payload.error || 'GitHub token exchange failed');
    }

    return payload.access_token;
};

export const setStateCookie = (res, state) => {
    res.setHeader('Set-Cookie', [
        `decap_cms_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=900`,
    ]);
};

export const clearStateCookie = (res) => {
    res.setHeader('Set-Cookie', [
        'decap_cms_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    ]);
};

export const getStateFromCookie = (cookieHeader = '') => {
    const cookieValue = cookieHeader
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith('decap_cms_state='));

    return cookieValue ? cookieValue.split('=')[1] : '';
};

const serializeMessage = ({status, payload}) =>
    `authorization:github:${status}:${JSON.stringify(payload)}`;

export const renderCallbackPage = ({status, payload}) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CMS Login</title>
  </head>
  <body>
    <script>
      (function () {
        var message = ${JSON.stringify(serializeMessage({status, payload}))};
        if (window.opener) {
          window.opener.postMessage(message, '*');
        }
        window.close();
      })();
    </script>
  </body>
</html>`;
