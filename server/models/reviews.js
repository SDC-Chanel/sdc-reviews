const db = require('../db/db');

module.exports = {
  getReviews: (callback, id) => {
    const count = id.count || 20;
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
    // cmd to reset serial id -- SELECT setval(pg_get_serial_sequence('reviews', 'id'), (SELECT MAX(id) FROM reviews)+1);
    db.query(`INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (${newReview.product_id}, ${newReview.rating}, ${newReview.date}, '${newReview.summary.replaceAll("'", "''")}', '${newReview.body.replaceAll("'", "''")}', ${newReview.recommend}, ${newReview.reported}, '${newReview.reviewer_name.replaceAll("'", "''")}', '${newReview.reviewer_email.replaceAll("'", "''")}', '${newReview.response}', ${newReview.helpfulness})`)
      .then(res1 => {
        console.log('successfully inserted reviews into db ', res1);
        db.query(`INSERT INTO reviews_photos(review_id, url) VALUES ((SELECT id FROM reviews WHERE date = ${newReview.date}), '${newReview.photos}')`)
          .then(res2 => {
            console.log('successfully inserted photos into db ', res2);
            const keys = Object.keys(newReview.characteristics);

            keys.forEach(name => {
              console.log('i want to cry', newReview.characteristics[name].value); // num values
              db.query(`INSERT INTO characteristic_reviews(characteristic_id, review_id, value) VALUES ((SELECT id FROM characteristics WHERE product_id = ${newReview.product_id} AND name = '${name}'), (SELECT id FROM reviews WHERE date = ${newReview.date}), ${newReview.characteristics[name].value})`)
                .then(res3 => {
                  console.log('successfully inserted characteristic_review into db');
                })
                .catch(err => {
                  console.log('failed to insert characteristic_review into db');
                });
            });
          });
      })
      .catch(err => {
        console.log('failed to insert photos into db ', err);
      })
      .catch(err => {
        console.log('failed to insert reviews into db ', err);
      });

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


// db.query('SELECT COUNT(*) FROM characteristics UNION SELECT COUNT(*) FROM characteristic_reviews', (err, results) => {
//   callback(err, results);
// });
//   rows: [ { count: '3347679' }, { count: '19327575' } ]