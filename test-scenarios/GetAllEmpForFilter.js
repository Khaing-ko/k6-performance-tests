import http from 'k6/http';
import { Configuration } from '.././enviroment/Configuration.js';
import { check } from 'k6';
import { sleep } from 'k6';
import { baseUrl } from '.././enviroment/Header.js';
import { getTokenResponse } from './Token.js';
import { getCommonHeaders } from '.././enviroment/Header.js';

export const options = Configuration;
const FilterAndTreeViewPayload = JSON.parse(open('../payloads/FilterAndTreeViewPayload.json'));
export default function () {
  
  const bearerToken = getTokenResponse();
let headers = {
    headers: getCommonHeaders(bearerToken)
  };

    const FirstUrl = `${baseUrl}/employeesetupweb/GetAllEmployeeForFilter`;
    const res=http.post(FirstUrl, FilterAndTreeViewPayload, headers);
    check(res, {
      'GetAllEmployeeForFilter status is 200': (r) => r.status === 200,
      'GetAllEmployeeForFilter response time < 500ms': (r) => r.timings.duration < 500
    });
    sleep(1); 
  }
