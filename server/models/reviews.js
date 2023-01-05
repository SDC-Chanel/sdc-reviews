/* eslint-disable no-shadow */
const db = require('../db/db');

module.exports = {
  getReviews: (callback, id) => {
    const count = id.count || 5;
    const offset = id.page || 0;

    db.query(`SELECT * FROM reviews WHERE product_id = ${id.product_id} AND reported = false LIMIT ${count} OFFSET ${offset}`, (err1, results1) => {
      db.query(`SELECT * FROM reviews_photos WHERE review_id IN (SELECT id FROM reviews WHERE product_id = ${id.product_id})`, (err2, results2) => {
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
    const query = `SELECT count(*) FILTER (WHERE product_id = ${id.product_id} AND recommend) FROM reviews`;

    const metaObj = {};
    metaObj.product_id = id.product_id;
    metaObj.ratings = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    metaObj.recommended = {
      false: 0,
      true: 0,
    };
    metaObj.characteristics = {};

    Promise.all(Array.from({ length: 5 }, (_, i) => i + 1).map(num => {
      return db.query(`SELECT count(*) FROM reviews WHERE rating=${num} AND product_id = ${id.product_id}`)
        .then(res => {
          metaObj.ratings[num] = res.rows[0].count;
        });
    }))
      .then(res1 => {
        const total = Object.values(metaObj.ratings).reduce((acc, value) => {
          acc += Number(value);
          return acc;
        }, 0);
        db.query(`SELECT recommend FROM reviews WHERE product_id = ${id.product_id} AND recommend = true`)
          .then(res => {
            metaObj.recommended.true = res.rows.length;
            metaObj.recommended.false = total - res.rows.length;
            db.query(`SELECT id, name FROM characteristics WHERE product_id = ${id.product_id}`)
              .then(res => {
                Promise.all(res.rows.map(char => {
                  return db.query(`SELECT value FROM characteristic_reviews WHERE characteristic_id = ${char.id}`)
                    .then(res => {
                      const average = res.rows.reduce((acc, value) => {
                        acc += value.value;
                        return acc;
                      }, 0);
                      metaObj.characteristics[char.name] = {
                        id: char.id,
                        value: average / res.rows.length,
                      };
                    });
                }))
                  .then(res => {
                    callback(null, metaObj);
                  })
                  .catch(err => {
                    callback(err);
                  });
              });
          });
      });
  },
  postReview: (callback, newReview) => {
    db.query(`INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (${newReview.product_id}, ${newReview.rating}, ${newReview.date}, '${newReview.summary.replaceAll("'", "''")}', '${newReview.body.replaceAll("'", "''")}', ${newReview.recommend}, ${newReview.reported}, '${newReview.reviewer_name.replaceAll("'", "''")}', '${newReview.reviewer_email.replaceAll("'", "''")}', '${newReview.response}', ${newReview.helpfulness}) returning id`)
      .then(res1 => {
        newReview.photos.forEach(photo => {
          db.query(`INSERT INTO reviews_photos(review_id, url) VALUES (${res1.rows[0].id}, '${photo}')`)
            .then(res2 => {
              const keys = Object.keys(newReview.characteristics);
              keys.forEach(name => {
                db.query(`INSERT INTO characteristic_reviews(characteristic_id, review_id, value) VALUES (${name}, ${res1.rows[0].id}, ${newReview.characteristics[name]})`);
              });
            })
            .catch(err => {
              callback(err);
            });
        });
      })
      .then((err, results) => {
        callback(err, results);
      })
      .catch(err => {
        callback(err);
      });
  },
  updateReview: (callback, id) => {
    const query = `UPDATE reviews SET helpfulness = helpfulness+1 WHERE id = ${id.review_id}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  reportReview: (callback, id) => {
    const query = `UPDATE reviews SET reported = true WHERE id = ${id.review_id}`;
    db.query(query, (err, results) => {
      callback(err, results.rows);
    });
  },
};


// SELECT COUNT(*) FROM characteristics UNION SELECT COUNT(*) FROM characteristic_reviews'
// rows: [ { count: '3347679' }, { count: '19327575' } ]
