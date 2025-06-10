import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js';
let bearerToken;


export const options = {
  stages: [
    { duration: '30s', target: 10 }, // 10 Users
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    'http_req_failed{type:API}': ['rate<0.1'],
  },
};

// ✅ CSV File Read & Debugging
const users = new SharedArray('users', function () {
  let csvRawData = open('D:/Performence/k6-performance-tests/users.csv');

  let csvData = papaparse.parse(csvRawData, { header: true }).data;

  console.log(`🔹 Parsed Users Data:`, csvData);  // Debugging Parsed Data

  return csvData;
});

export default function () {
  const url = 'https://apitest.globalta.com.mm/v2_2_api/api/token';


  // ✅ VU အလိုက် user များကို တန်းစီခွဲခြားခြင်း  
  const userIndex = Math.min(__VU - 1, users.length - 1);
  const user = users[userIndex];

  // ✅ Debugging: CSV ထဲက Data မှန်မမှန် စစ်ဆေးခြင်း
  console.log(`VU ${__VU} - Selected User Object:`, user);

  if (!user?.initial || !user?.username || !user?.password) {
    console.error(`🚨 Error: Missing user data for VU ${__VU}`);
    return;
  }

  console.log(`✅ VU ${__VU} - Logging in as: ${user.initial}, ${user.username}`);

  const payload = JSON.stringify({
    "CustomerURL": "pt1",
    "initial": user.initial,
    "username": user.username,
    "password": user.password,
    "grant_type": "password"
  });

  const respToken = http.post(url, payload, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Referer': 'https://apitest.globalta.com.mm/',
      'myOrigin': 'pt1',
      'appVersion': 'latest'
    },
  });
  console.log(`📌 VU ${__VU} - Login Response: ${respToken.status} - ${respToken.body}`);
  if (respToken.status === 200) {
    console.log('Request succeeded!');
    console.log(respToken.status);
    const responseJson = JSON.parse(respToken.body);
    bearerToken = "Bearer " + responseJson.data.access_token;
    console.log("!!!!!bearerToken: " + bearerToken);
  } else {
    console.error('Request failed with status code: ' + respToken.status + ' ' + respToken.body);
  }

  const SecondUrl = 'https://apitest.globalta.com.mm/v2_2api/mobile/GpsLocation/GetAllLocationandShiftAssignList';
  let headers = {
    headers: {
      'Content-Type': 'application/json',
      'myOrigin': 'pt1',
      "Authorization": bearerToken
    }
  }
  
  let rawBody = JSON.stringify({});

  const resp = http.post(SecondUrl, rawBody, headers);

  if (resp.status === 200) {
    console.log('Request succeeded!');
    console.log(resp.body);
  
  } else {
    console.error('Request failed with status code: ' + resp.status + ' ' + resp.body);
  }  

  // Validate response
  check(resp, {
    'Status is 200': (r) => r.status === 200,
    'Response body exists': (r) => r.body.length > 0,
  });
  check(respToken, {
    '✅ is status 200': (r) => r.status === 200,
    '⏳ response time < 500ms': (r) => r.timings.duration < 500,
    '🔑 received token': (r) => r.json('access_token') !== undefined,
  });

  sleep(Math.random() * 2 + 1);
}
