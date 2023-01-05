const router = require('express').Router();
const { reviews } = require('./controllers');

// console.log(reviews);

router.get('/reviews/meta/:product_id?', reviews.getMeta);
router.get('/reviews/:product_id?/:count?/:page?', reviews.getReviews);
router.post('/reviews/:product_id?', reviews.postReview);
router.put('/reviews/:review_id?/helpful', reviews.updateReview);
router.put('/reviews/:review_id?/report', reviews.reportReview);

module.exports = router;
