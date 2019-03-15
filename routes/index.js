var express = require('express'),
    router = express.Router();

router.use('/video-testimonials', require('./videoTestimonialRouter'));
router.use('/written-testimonials', require('./writtenTestimonialRouter'));
router.use('/reffer-activities', require('./refferActivitieRouter'));
router.use('/reward-points', require('./rewardPointRouter'));
router.use('/reports', require('./reportRouter'));
router.use('/mindbody-coupons', require('./mindbodyCouponRouter'));
router.use('/mindbody-packages', require('./mindbodyPackageRouter'));
router.use('/beauty-tips', require('./beautyTipRouter'));
router.use('/employees', require('./employeeRouter'));
router.use('/faqs', require('./faqRouter'));
router.use('/', require('./otherRouter'));

module.exports = router;
