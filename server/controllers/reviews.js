/* eslint-disable max-len */
const {
  getReviews, getMeta, postReview, updateReview, reportReview,
} = require('../models/reviews');

module.exports = {
  getReviews: (req, res) => {
    const query = {
      product_id: req.params.product_id || req.query.product_id,
      page: Number(req.params.page) || Number(req.query.page),
      count: req.params.count || req.query.count,
    };
    getReviews((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const data = {
          product: query.product_id,
          page: query.page || 1,
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
    }, query);
  },
  getMeta: (req, res) => {
    getMeta((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    }, { product_id: req.params.product_id || req.query.product_id });
  },
  postReview: (req, res) => {
    const { body } = req;
    // const newReview = {
    //   product_id: body.product_id,
    //   rating: body.rating > 0 && body.rating <= 5 ? body.rating : null,
    //   summary: body.summary || '',
    //   body: body.body.length && body.body.length <= 1000 ? body.body : null,
    //   recommend: typeof body.recommend === 'boolean' ? body.recommend : null,
    //   reviewer_name: body.reviewer_name.length && body.reviewer_name.length <= 60 ? body.reviewer_name : null,
    //   reviewer_email: body.reviewer_email.length && body.reviewer_email.length <= 60 ? body.reviewer_email : null,
    // };

    // if (Object.values(newReview).indexOf(null) !== -1) {
    //   res.status(404).send();
    // } else {
    //   newReview.response = null;
    //   newReview.date = Date.now();
    //   newReview.reported = false;
    //   newReview.helpfulness = 0;
    //   newReview.photos = body.photos;
    //   newReview.characteristics = body.characteristics;
    // }
    const testData = {
      product_id: 4,
      rating: 5,
      date: Date.now(),
      summary: 'big summary',
      body: 'body ',
      recommend: true,
      reported: false,
      reviewer_name: 'person name',
      reviewer_email: 'person@email.com',
      response: null,
      helpfulness: 0,
      photos: ['urlplaceholder/review_5_photo_number_1.jpg'],
      characteristics: {
        14: 4,
        16: 5,
        15: 5,
        17: 3,
      },
    };
    postReview((err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(201).send();
      }
    }, testData);
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
