const db = require('../db/db');

module.exports = {
  getReviews: (callback, id) => {
    const count = id.count || 5;
    const offset = id.page || 0;
    console.log('inside models getReviews');
    const query1 = `SELECT * FROM reviews WHERE product_id = ${id.product_id} AND reported = false LIMIT ${count} OFFSET ${offset}`;
    const jordan = `SELECT * FROM reviews_photos WHERE review_id IN (SELECT id FROM reviews WHERE product_id = ${id.product_id})`;
    db.query(query1, (err1, results1) => {
      db.query(jordan, (err2, results2) => {
        const test = results1.rows.reduce((acc, review) => {
          const update = {};
          update.reviews = review;
          update.photos = [];
          results2.rows.forEach(photo => {
            if (review.id === photo.review_id) {
              update.photos.push({
                id: photo.id,
                url: photo.url,
              });
            }
          });
          acc.push(update);
          return acc;
        }, []);
        callback(err2, test);
      });
    });
  },
  getMeta: (callback, id) => {
    // const count = id.count || 5;
    console.log('inside models getMeta');
    const query = `SELECT count(*) FILTER (WHERE product_id = ${id.product_id} AND recommend) FROM reviews`;
    db.query(query, (err, results) => {
      callback(err, results.rows);
    });
  },
  postReview: (callback, newReview) => {
    console.log('inside models postReview', newReview);
    const query1 = `INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)VALUES (${newReview.product_id}, ${newReview.rating}, ${newReview.date}, ${newReview.summary}, ${newReview.body}, ${newReview.recommend}, ${newReview.reported}, ${newReview.reviewer_name}, ${newReview.reviewer_email}, ${newReview.response}, ${newReview.helpfulness})`;
    // db.query(query, (err, results) => {
    //   callback(err, results);
    // });
  },
  updateReview: (callback, id) => {
    console.log('inside models updateReview', id);
    const query = `UPDATE reviews SET helpfulness = helpfulness+1 WHERE id = ${id.review_id}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  reportReview: (callback, id) => {
    console.log('inside models reportReview');
    const query = `UPDATE reviews SET reported = true WHERE id = ${id.review_id}`;
    db.query(query, (err, results) => {
      callback(err, results.rows);
    });
  },
};
