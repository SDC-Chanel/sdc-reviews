const db = require('../db/db');

module.exports = {
  getReviews: (callback, id) => {
    const count = id.count || 5;
    console.log('inside models getReviews');
    const query = `SELECT * FROM reviews, reviews_photos WHERE product_id = ${id.product_id} LIMIT ${count}`;
    db.query(query, (err, results) => {
      callback(err, results.rows);
    });
  },
  getMeta: (callback, id) => {
    // const count = id.count || 5;
    console.log('inside models getMeta');
    const query = `SELECT * FROM characteristics WHERE product_id = ${id.product_id} LIMIT 10`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  postReview: (callback, id) => {
    const count = id.count || 5;
    console.log('inside models postReview');
    const query = `SELECT * FROM reviews WHERE product_id = ${id.product_id} LIMIT ${count}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  updateReview: (callback, id) => {
    const count = id.count || 5;
    console.log('inside models updateReview');
    const query = `SELECT * FROM reviews WHERE product_id = ${id.product_id} LIMIT ${count}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  reportReview: (callback, id) => {
    const count = id.count || 5;
    console.log('inside models reportReview');
    const query = `SELECT * FROM reviews WHERE product_id = ${id.product_id} LIMIT ${count}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
};
