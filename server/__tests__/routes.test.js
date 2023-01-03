const request = require('supertest');
const app = require('../index');

describe('Test reviews/:product_id route', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(app)
      .get('/reviews/40344');

    expect(res.statusCode).toBe(200);
  });
});

describe('Test reviews/meta/:product_id route', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(app)
      .get('/reviews/meta/40344');

    expect(res.statusCode).toBe(200);
  });
});

// describe('Test reviews/:product_id route', () => {
//   test('It should respond to the POST method', async () => {
//     const res = await request(app)
//       .post('/reviews/:product_id');

//     expect(res.statusCode).toBe(201);
//   });
// });

// describe('Test reviews/:review_id/helpful route', () => {
//   test('It should respond to the PUT method', async () => {
//     const res = await request(app)
//       .get('/reviews/:review_id/helpful');

//     expect(res.statusCode).toBe(204);
//   });

//   describe('Test reviews/:review_id/report route', () => {
//     test('It should respond to the PUT method', async () => {
//       const res = await request(app)
//         .get('/reviews/:review_id/report');

//       expect(res.statusCode).toBe(204);
//     });
// });