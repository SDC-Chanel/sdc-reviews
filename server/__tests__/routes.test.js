const request = require('supertest');
const app = require('../index');
const example = require('./example.data.js');

describe('Test reviews/:product_id? GET route', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(app)
      .get('/reviews/40344');

    expect(res.statusCode).toBe(200);
  });
});

describe('Test reviews/meta/:product_id? GET route', () => {
  test('It should respond to the GET method', async () => {
    const res = await request(app)
      .get('/reviews/meta/40344');

    expect(res.statusCode).toBe(200);
  });
});

describe('Test reviews/:product_id? POST route', () => {  test('It should respond to the POST method', async () => {
    const res = await request(app)
      .post('/reviews/40344').set('Content-type', 'application/json').send(example);

    expect(res.statusCode).toBe(201);
  });
});

describe('Test reviews/:review_id?/helpful PUT route', () => {
  test('It should respond to the PUT method', async () => {
    const res = await request(app)
      .put('/reviews/40344/helpful');

    expect(res.statusCode).toBe(204);
  });
});

  describe('Test reviews/:review_id?/report PUT route', () => {
    test('It should respond to the PUT method', async () => {
      const res = await request(app)
        .put('/reviews/40344/report');

      expect(res.statusCode).toBe(204);
    });
});