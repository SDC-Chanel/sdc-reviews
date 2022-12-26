const db = require('../db/db');

module.exports = {
  getReviews: (callback, id) => {
    const count = id.count || 5;
    console.log('test');
    const query = `SELECT * FROM reviews WHERE product_id = ${id.product_id} LIMIT ${count}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  getMeta: (callback, id) => {
    const count = id.count || 5;
    console.log('test');
    const query = `SELECT * FROM reviews WHERE product_id = ${id.product_id} LIMIT ${count}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  postReview: (callback, id) => {
    const count = id.count || 5;
    console.log('test');
    const query = `SELECT * FROM reviews WHERE product_id = ${id.product_id} LIMIT ${count}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  updateReview: (callback, id) => {
    const count = id.count || 5;
    console.log('test');
    const query = `SELECT * FROM reviews WHERE product_id = ${id.product_id} LIMIT ${count}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  reportReview: (callback, id) => {
    const count = id.count || 5;
    console.log('test');
    const query = `SELECT * FROM reviews WHERE product_id = ${id.product_id} LIMIT ${count}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
};
