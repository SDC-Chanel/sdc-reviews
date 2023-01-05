import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const ErrorCount = new Counter('errors');

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [{ duration: '30s', target: 1000 }],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(100)<3000'],
  },
};

export default function () {
  const res = http.post('http://localhost:3000/reviews/40353/report');
  const success = check(res, {
    'status is 200': r => r.status === 200,
  });
  if (!success) {
    ErrorCount.add(1);
  }
}