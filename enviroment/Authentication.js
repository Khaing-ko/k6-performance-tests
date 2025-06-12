import http from 'k6/http';
import { check } from 'k6';
import { baseUrl, origin, myOrigin } from './Configuration.js';
import { tokenRequestPayload } from './TokenRequestPayload.js';

export function getTokenResponse() {
    const tokenRes = http.post(`${baseUrl}/token`, JSON.stringify(tokenRequestPayload), {
        headers: {
            'Content-Type': 'application/json',
            myOrigin: myOrigin,
            DeviceID: '1724ef9de266addc,'
        }
    });

    const token = tokenRes.json().data?.access_token;

    check(tokenRes, {
        'token acquired': (r) => token !== undefined
    });

    return token;
}

export function getCommonHeaders(token) {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        myOrigin: myOrigin,
        Origin: origin,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
    };
}
