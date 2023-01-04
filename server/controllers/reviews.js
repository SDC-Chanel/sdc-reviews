/* eslint-disable max-len */
const {
  getReviews, getMeta, postReview, updateReview, reportReview,
} = require('../models/reviews');

module.exports = {
  getReviews: (req, res) => {
    // console.log('check params', req.params);
    getReviews((err, results) => {
      if (err) {
        // console.log('error in controllers getReviews ', err);
        res.status(404).send(err);
      } else {
        // console.log('success in controllers getReviews', results);
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
    }, req.params); // if reported is true, don't return
  },
  getMeta: (req, res) => {
    // console.log('check params', req.params);
    getMeta((err, results) => {
      if (err) {
        // console.log('error in controllers getMeta ', err);
        res.status(404).send(err);
      } else {
        // console.log('success in controllers getMeta ', results);
        res.status(200).send(results);
      }
    }, req.params);
  },
  postReview: (req, res) => {
    console.log('check params', req.body);
    // fix date bug
    const { body } = req;
    // check if all fields exist otherwise dont add it to database
    // add fields if formatting is correct
    // pass it into models
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
      newReview.response = null; // reviews
      newReview.date = Math.floor(new Date().getTime() / 1000); // reviews
      newReview.reported = false; // reviews
      newReview.helpfulness = 0; // reviews
      newReview.photos = body.photos;
      newReview.characteristics = body.characteristics;
    }
    postReview((err, results) => {
      if (err) {
        // console.log('error in controllers postReview ', err);
        res.status(404).send(err);
      } else {
        // console.log('success in controllers postReview ', results);
        res.status(201).send();
      }
    }, newReview);
  },
  updateReview: (req, res) => {
    // console.log('check params', req.params); // review id
    updateReview((err, results) => {
      if (err) {
        // console.log('error in controllers updateReview ', err);
        res.status(404).send(err);
      } else {
        // console.log('success in controllers updateReview ', results);
        res.status(204).send();
      }
    }, req.params);
  },
  reportReview: (req, res) => {
    // console.log('check params', req.params); // review id
    reportReview((err, results) => {
      if (err) {
        // console.log('error in controllers reportReview ', err);
        res.status(404).send(err);
      } else {
        // console.log('success in controllers reportReview ', results);
        res.status(204).send();
      }
    }, req.params);
  },
};