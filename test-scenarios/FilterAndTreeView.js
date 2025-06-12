import http from 'k6/http';
import { check,group } from 'k6';
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

  group("AttendanceRequest", function () {
    // 1. GetAllEmployeeForFilter
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

    const resEmp=http.post(`${baseUrl}/employeesetupweb/GetAllEmployeeForFilter`, JSON.stringify(employeeFilterPayload), {
      headers: commonHeaders
    });
  
    check(resEmp, {
      'GetAllEmployeeForFilter status is 200': (r) => r.status === 200,
      'GetAllEmployeeForFilter response time < 500ms': (r) => r.timings.duration < 500
    });
    // 2. GetEmployeeTreeViewSetupByViewMenu
    const TreeViewPayload = {
        "Type": true,
        "FormName": null,
        "View_Type": "0",
        "Include_Resign": false,
        "Include_Active": true,
        "Include_Inactive": false,
        "Resign_MonthOnly": false,
        "OrderbyDept": true,
        "OrderByDesign": false,
        "Dval": "",
        "Resign_CustomPeriod": false,
        "Resign_DateRange": false,
        "Fromdate": "2025-06-03",
        "Todate": "2025-06-03",
        "StartDate": null,
        "EndDate": null,
        "Exclude_Resign_DateRange": false,
        "excludeStartDate": null,
        "excludeEndDate": null,
        "OrgSortbyOption": null
        };
    
        const res=http.post(`${baseUrl}/employeesetupweb/GetEmployeeTreeViewSetupByViewMenu`, JSON.stringify(TreeViewPayload), {
          headers: commonHeaders
        });
        check(res, {
          'TreeView status is 200': (r) => r.status === 200,
          'TreeView response time < 500ms': (r) => r.timings.duration < 500
        });
  
    sleep(1); 
  });
}
