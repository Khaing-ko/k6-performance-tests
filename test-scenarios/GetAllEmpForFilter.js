import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import { baseUrl } from '../enviroment/Configuration.js';
import { getTokenResponse,getCommonHeaders } from '../enviroment/Authentication.js';

export const options = {
    stages: [
  { duration: '1m', target: 100 }, 
  { duration: '1m', target: 200 },
  {duration : '30s', target:0}
],

  thresholds: {
    http_req_duration: ['p(95)<1500'], 
    http_req_failed: ['rate<0.01'],   
  }
};

export default function () {

  const token = getTokenResponse();
  const commonHeaders = getCommonHeaders(token);

    const employeeFilterPayload = {
      gridState: {
        page: 1,
        pageSize: 4000
      },
      data: {
        Type: "true",
        View_Type: 0,
        Include_Resign: false,
        Include_Active: true,
        Include_Inactive: false,
        Include_ResignMonthOnly: false,
        Resign_CustomPeriod: false,
        Fromdate: null,
        Todate: null,
        Resign_DateRange: false,
        StartDate: null,
        EndDate: null,
        Exclude_Resign_DateRange: false,
        excludeStartDate: null,
        excludeEndDate: null
      }
    };

    const res=http.post(`${baseUrl}/employeesetupweb/GetAllEmployeeForFilter`, JSON.stringify(employeeFilterPayload), {
      headers: commonHeaders
    });
    check(res, {
      'GetAllEmployeeForFilter status is 200': (r) => r.status === 200,
      'GetAllEmployeeForFilter response time < 500ms': (r) => r.timings.duration < 500
    });
    sleep(1); 
  }
