import http from 'k6/http';
import { Configuration } from '.././enviroment/configurations.js';
import { getTokenResponse } from './getToken.js';
import { getCommonHeaders } from '.././enviroment/headers.js';
import { sleep } from 'k6';

export const options = Configuration;
const GPSLocationPayload = JSON.parse(open('../payloads/gpsLocationPayload.json'));
export default function () {

  const bearerToken = getTokenResponse();  
  
  const SecondUrl = 'https://apitest.globalta.com.mm/v2_2api/mobile/GpsLocation/GetAllLocationandShiftAssignList';

  let headers = {
    headers: getCommonHeaders(bearerToken)
  };
  const resp = http.post(SecondUrl, GPSLocationPayload, headers);
  sleep(Math.random() * 2 + 1);
}
