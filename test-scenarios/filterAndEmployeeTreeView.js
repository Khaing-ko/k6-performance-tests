import http from 'k6/http';
import { Configuration } from '.././enviroment/configurations.js';
import { check } from 'k6';
import { sleep } from 'k6';
import { baseUrl } from '.././enviroment/headers.js';
import { getTokenResponse } from './getToken.js';
import { getCommonHeaders } from '.././enviroment/headers.js';

export const options = Configuration;
const GetEmployeeTreeViewSetupByViewMenuPayload = JSON.parse(open('../payloads/getEmployeeTreeViewSetupByViewMenuPayload.json'));
const FilterAndTreeViewPayload = JSON.parse(open('../payloads/filterAndTreeViewPayload.json'));
export default function () {
  const bearerToken = getTokenResponse();  
  const FirstUrl = `${baseUrl}/employeesetupweb/GetAllEmployeeForFilter`;
  let headers = {
    headers: getCommonHeaders(bearerToken)
  };
  const resEmp = http.post(FirstUrl, FilterAndTreeViewPayload, headers);

  check(resEmp, {
    'GetAllEmployeeForFilter status is 200': (r) => r.status === 200,
    'GetAllEmployeeForFilter response time < 500ms': (r) => r.timings.duration < 500
  });

  // 2. GetEmployeeTreeViewSetupByViewMenu
  const SecondUrl = `${baseUrl}/employeesetupweb/GetEmployeeTreeViewSetupByViewMenu`;
  const res = http.post(SecondUrl, GetEmployeeTreeViewSetupByViewMenuPayload, headers);
  check(res, {
    'TreeView status is 200': (r) => r.status === 200,
    'TreeView response time < 500ms': (r) => r.timings.duration < 500
  });
  sleep(1);
};

