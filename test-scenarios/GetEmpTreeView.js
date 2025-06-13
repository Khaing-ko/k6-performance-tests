import http from 'k6/http';
import { Configuration } from '.././enviroment/Configuration.js';
import { check } from 'k6';
import { sleep } from 'k6';
import { baseUrl } from '.././enviroment/Header.js';
import { getTokenResponse } from './Token.js';
import { getCommonHeaders } from '.././enviroment/Header.js';

export const options = Configuration;

export default function () {
  const bearerToken = getTokenResponse();
  const GetEmployeeTreeViewSetupByViewMenuPayload = JSON.parse(open('./enviroment/GetEmployeeTreeViewSetupByViewMenuPayload.json'));
  let headers = {
    headers: getCommonHeaders(bearerToken)
  };
  const FirstUrl = `${baseUrl}/employeesetupweb/GetEmployeeTreeViewSetupByViewMenu`;
  

  const res = http.post(FirstUrl, GetEmployeeTreeViewSetupByViewMenuPayload,headers);
  check(res, {
    'TreeView status is 200': (r) => r.status === 200,
    'TreeView response time < 500ms': (r) => r.timings.duration < 500
  });
  sleep(1);
}
