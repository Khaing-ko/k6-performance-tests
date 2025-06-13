const Configuration  = {
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
export { Configuration };