/* eslint-disable max-len */
const {
  getReviews, getMeta, postReview, updateReview, reportReview,
} = require('../models/reviews');

module.exports = {
  getReviews: (req, res) => {
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
              photos: reviewObj.photos,
            };
          }),
        };
        res.status(200).send(data);
      }
    }, req.params);
  },
  getMeta: (req, res) => {
    getMeta((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    }, req.params);
  },
  postReview: (req, res) => {
    console.log('check params', req.body);
    // fix date bug
    const { body } = req;
    const newReview = {
      product_id: body.product_id,
      rating: body.rating > 0 && body.rating <= 5 ? body.rating : null,
      summary: body.summary || '',
      body: body.body.length && body.body.length <= 1000 ? body.body : null,
      recommend: typeof body.recommend === 'boolean' ? body.recommend : null,
      reviewer_name: body.reviewer_name.length && body.reviewer_name.length <= 60 ? body.reviewer_name : null,
      reviewer_email: body.reviewer_email.length && body.reviewer_email.length <= 60 ? body.reviewer_email : null,
    };

    if (Object.values(newReview).indexOf(null) !== -1) {
      res.status(404).send();
    } else {
      newReview.response = null;
      newReview.date = Date.now();
      newReview.reported = false;
      newReview.helpfulness = 0;
      newReview.photos = body.photos;
      newReview.characteristics = body.characteristics;
    }
    postReview((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(201).send();
      }
    }, newReview);
  },
  updateReview: (req, res) => {
    updateReview((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(204).send();
      }
    }, req.params);
  },
  reportReview: (req, res) => {
    reportReview((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(204).send();
      }
    }, req.params);
  },
};
