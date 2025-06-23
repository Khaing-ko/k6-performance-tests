import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { baseUrl, myOrigin } from '.././enviroment/headers.js';
import papaparse from 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js';

const users = new SharedArray('users', function () {
    try {
        let csvRawData = open('.././data/users.csv');
        if (!csvRawData) {
            throw new Error('Failed to open users.csv file');
        }
        let parsedData = papaparse.parse(csvRawData, { header: true });
        return parsedData.data || [];
    } catch (err) {
        console.error('Error loading users:', err);
        return [];
    }
});


function getCurrentUser() {
    if (users.length === 0) {
        throw new Error('No users available in the CSV file');
    }
    return users[__VU % users.length];
}
export function getTokenResponse() {
    const user = getCurrentUser();
    const payload = JSON.stringify({
        "CustomerURL": "pt1",
        "initial": user.initial,
        "username": user.username,
        "password": user.password,
        "grant_type": "password"
    });

    const tokenRes = http.post(`${baseUrl}/token`, payload, {
        headers: {
            'Content-Type': 'application/json',
            myOrigin: myOrigin,
            DeviceID: user.DeviceID,
        }
    });
    const token = tokenRes.json().data?.access_token;

    check(tokenRes, {
        'token acquired': (r) => token !== undefined
    });
    return token;    
}
