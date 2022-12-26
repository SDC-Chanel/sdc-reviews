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
        console.log('success in controllers getReviews ', results);
        res.status(200).send();
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
        res.status(200).send();
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