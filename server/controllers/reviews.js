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
          results: results.map((review, index) => {
            return {
              review_id: review.review_id,
              rating: review.rating,
              summary: review.summary,
              recommend: review.recommend,
              response: review.response, // coming in as a string
              body: review.body,
              date: new Date(review.date), // coming in as null
              reviewer_name: review.reviewer_name,
              helpfulness: review.helpfulness,
              photos: [
                {
                  id: review.photo_id,
                  url: review.url,
                },
              ],
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
    console.log('check params', req.params);
    postReview((err, results) => {
      if (err) {
        console.log('error in controllers postReview ', err);
        res.status(404).send(err);
      } else {
        console.log('success in controllers postReview ', results);
        res.status(201).send();
      }
    }, req.params);
  },
  updateReview: (req, res) => {
    console.log('check params', req.params);
    updateReview((err, results) => {
      if (err) {
        console.log('error in controllers updateReview ', err);
        res.status(404).send(err);
      } else {
        console.log('success in controllers updateReview ', results);
        res.status(204).send();
      }
    }, req.params);
  },
  reportReview: (req, res) => {
    console.log('check params', req.params);
    reportReview((err, results) => {
      if (err) {
        console.log('error in controllers reportReview ', err);
        res.status(404).send(err);
      } else {
        console.log('success in controllers reportReview ', results);
        res.status(204).send();
      }
    }, req.params);
  },
};