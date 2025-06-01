import http from 'k6/http';
import { check, sleep } from 'k6';
export { handleSummary } from '../utils/report-html.js';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const res = http.get('https://test-api.k6.io');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}