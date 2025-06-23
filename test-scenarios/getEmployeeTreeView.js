import http from 'k6/http';
import { Configuration } from '.././enviroment/configurations.js';
import { check } from 'k6';
import { sleep } from 'k6';
import { baseUrl } from '.././enviroment/header.js';
import { getTokenResponse } from './getToken.js';
import { getCommonHeaders } from '.././enviroment/header.js';

export const options = Configuration;
const GetEmployeeTreeViewSetupByViewMenuPayload = JSON.parse(open('../payloads/getEmployeeTreeViewSetupByViewMenuPayload.json'));
export default function () {
  const bearerToken = getTokenResponse();
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
