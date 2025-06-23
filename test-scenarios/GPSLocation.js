import http from 'k6/http';
import { Configuration } from '.././enviroment/Configuration.js';
import { getTokenResponse } from './Token.js';
import { getCommonHeaders } from '.././enviroment/Header.js';
import { sleep } from 'k6';

export const options = Configuration;
const GPSLocationPayload = JSON.parse(open('../payloads/GPSLocationPayload.json'));
export default function () {

  const bearerToken = getTokenResponse();  
  
  const SecondUrl = 'https://apitest.globalta.com.mm/v2_2api/mobile/GpsLocation/GetAllLocationandShiftAssignList';

  let headers = {
    headers: getCommonHeaders(bearerToken)
  };
  const resp = http.post(SecondUrl, GPSLocationPayload, headers);
  sleep(Math.random() * 2 + 1);
}
