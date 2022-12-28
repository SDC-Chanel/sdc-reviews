const {
  getReviews, getMeta, postReview, updateReview, reportReview,
} = require('../models/reviews');

module.exports = {
  getReviews: (req, res) => {
    console.log('check params', req.params);
    getReviews((err, results) => {
      if (err) {
        console.log('error in controllers getReviews ', err);
        res.status(404).send(err);
      } else {
        console.log('success in controllers getReviews', results);
        const data = {
          product: req.params.product_id,
          page: 0,
          count: results.length,
          results: results.map((reviewObj, index) => {
            return {
              review_id: reviewObj.reviews.id,
              rating: reviewObj.reviews.rating,
              summary: reviewObj.reviews.summary,
              recommend: reviewObj.reviews.recommend,
              response: reviewObj.reviews.response === 'null' ? JSON.parse(reviewObj.reviews.response) : reviewObj.reviews.response,
              body: reviewObj.reviews.body,
              date: new Date(+reviewObj.reviews.date),
              reviewer_name: reviewObj.reviews.reviewer_name,
              helpfulness: reviewObj.reviews.helpfulness,
              // photos: [
              //   {
              //     id: review.photo_id,
              //     url: review.url,
              //   },
              // ],
              photos: reviewObj.photos,
            };
          }),
          // results,
        };
        res.status(200).send(data);
      }
    }, req.params);
  },
  getMeta: (req, res) => {
    console.log('check params', req.params);
    getMeta((err, results) => {
      if (err) {
        console.log('error in controllers getMeta ', err);
        res.status(404).send(err);
      } else {
        console.log('success in controllers getMeta ', results);
        res.status(200).send(results);
      }
    }, req.params);
  },
  postReview: (req, res) => {
    console.log('check params', req.body);
    // const { body } = req;
    // check if all fields exist otherwise dont add it to database
    // add fields if formatting is correct
    // pass it into models
    req.body.response = null;
    req.body.date = new Date(/* current timestamp */);
    req.body.reported = false;
    req.body.helpfulness = 0;

    postReview((err, results) => {
      if (err) {
        console.log('error in controllers postReview ', err);
        res.status(404).send(err);
      } else {
        console.log('success in controllers postReview ', results);
        res.status(201).send();
      }
    }, req.body); // all except response/date (assign a date in the backend?)
  },
  updateReview: (req, res) => {
    console.log('check params', req.params); // review id
    updateReview((err, results) => {
      if (err) {
        console.log('error in controllers updateReview ', err);
        res.status(404).send(err);
      } else {
        console.log('success in controllers updateReview ', results);
        res.status(204).send(results);
      }
    }, req.params);
  },
  reportReview: (req, res) => {
    console.log('check params', req.params); // review id
    reportReview((err, results) => {
      if (err) {
        console.log('error in controllers reportReview ', err);
        res.status(404).send(err);
      } else {
        console.log('success in controllers reportReview ', results);
        res.status(204).send(results);
      }
    }, req.params);
  },
};