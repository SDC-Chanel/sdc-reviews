const db = require('../db/db');

module.exports = {
  getReviews: (callback, id) => {
    const count = id.count || 5;
    console.log('inside models getReviews');
    const query1 = `SELECT * FROM reviews WHERE product_id = ${id.product_id} LIMIT ${count}`;
    const jordan = `SELECT * FROM reviews_photos WHERE review_id IN (SELECT id FROM reviews WHERE product_id = ${id.product_id})`;

    db.query(query1, (err1, results1) => {
      db.query(jordan, (err2, results2) => {
        // results1.map(review => {
        //   return results2.forEach(photo => {
        //     if (review.id === photo.review_id) {

        //     }
        //   })
        const test = results1.rows.reduce((acc, review) => {
          const update = {};
          update.reviews = review;
          update.photos = [];
          // acc.push(review);
          results2.rows.forEach(photo => {
            if (review.id === photo.review_id) {
              update.photos.push({
                id: photo.id,
                url: photo.url,
              });
              // acc.push(photo);
            }
          });
          acc.push(update);
          return acc;
        }, []);

        // callback(err2, test);
        // console.log('PLEASE', test)
        callback(err2, test);

      });
      // callback(err1, test);
    });


    // const test1 = db.query(query1, (err, results) => {
    //   console.log('CRY 1', results.rows);
    //   return results.rows;
    // });
    // const test2 = db.query(jordan, (err, results) => {
    //   console.log('CRY 2', results.rows);
    //   return results.rows;
    // });

    // return db.query(query1)
    //   .then(res => {
    //     res.rows.reduce((acc, review) => {

    //     })
    //   })
    // console.log('i want to cry 1', test1);
    // console.log('i want to cry 2', test2);
    // const query2 = `SELECT url FROM reviews_photos WHERE review_id = ${res.rows}`
    // return db.query(query1)
    //   .then(res => {
    //     // const query2 = `SELECT url FROM reviews_photos WHERE review_id = ${}`;
    //     const reviewIds = res.rows.reduce((acc, review) => {
    //       acc.push(review.id);
    //       return acc;
    //     }, []);
    //     const photoUrls = reviewIds.reduce((acc, id) => {
    //       const query2 = `SELECT url FROM reviews_photos WHERE review_id = ${id}`;
    //       const promise = (async () => {
    //         await db.query(query2)
    //           .then(res2 => {
    //           // return res2.rows;
    //             acc.push(res2.rows);
    //             return acc;
    //           // console.log('THIS IS EACH PHOTO URL ROWS', res2.rows);
    //           });
    //       })();
    //     }, []);
    //     console.log('omg this is not gonna work', photoUrls);
    //   });
    // callback(err, results.rows);
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
    console.log('inside models postReview');
    const query = `INSERT * FROM reviews WHERE product_id = ${id.product_id}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  updateReview: (callback, id) => {
    console.log('inside models updateReview');
    const query = `SELECT helpfulness FROM reviews WHERE review_id = ${id.review_id}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
  reportReview: (callback, id) => {
    console.log('inside models reportReview');
    const query = `SELECT reported FROM reviews WHERE review_id = ${id.review_id}`;
    db.query(query, (err, results) => {
      callback(err, results);
    });
  },
};
