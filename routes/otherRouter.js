var express = require('express');
var router = express.Router();
var otherController = require('../controllers/otherController');
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');
var oc = new otherController();

router.post('/web-login', oc.webLogin.bind(oc));

router.get('/web-dashboard', oc.webDashbaord.bind(oc));

router.get('/mobile-dashboard', oc.mobileDashbaord.bind(oc));

router.post('/send-otp-user', oc.sendOTPUser.bind(oc));

router.post('/verify-otp-user', oc.verifyOTPUser.bind(oc));

router.post('/test-valid-user', oc.checkValidUser.bind(oc));

router.get('/user-search', oc.userSearch.bind(oc));

router.post('/user-points', oc.userPoints.bind(oc));

router.post('/check_coupons', oc.checkCoupon.bind(oc));

router.get('/my_coupons/:id/:studioid', oc.myCoupon.bind(oc));

router.get('/get_reward_points/:id/:studioid', oc.getRewardPoint.bind(oc));

router.get('/graphs', oc.graphs.bind(oc));

router.get('/page-video-testimonials', oc.pageLimitVideoTestimonials.bind(oc));

router.get('/page-written-testimonials', oc.pageLimitWrittenTestimonials.bind(oc));

router.get('/graphs', oc.graphs.bind(oc));

router.get('/get_users_list', oc.users.bind(oc));

router.get('/coupon_used/:id', oc.couponUsed.bind(oc));

router.post('/device-ids', oc.saveDeviceId.bind(oc));

router.post('/login', oc.login.bind(oc));

router.post('/bulk-upload', oc.bulkUploadCoupon.bind(oc));

router.get('/reward_histories/:user_id/:studioid', oc.getUserRewardHistory.bind(oc));

router.post('/fb-testimonials', oc.fbTestimonials.bind(oc));

router.get('/studioids', oc.studioids.bind(oc));

router.get('/locationids/:id', oc.locationids.bind(oc));

router.get('/studioid-memberships', oc.broadcastMembership.bind(oc));

router.get('/get-user-ids', oc.getUserStudioLocation.bind(oc));

router.post('/update_testimonials', oc.updateTestimonialLike.bind(oc));

router.post('/group-sms', oc.BroadcastSmsToAll.bind(oc));

router.post('/studioid-memberships-sms', oc.broadcastMembershipSendSms.bind(oc));

router.get('/users-limit/:studioid/:locationid/:skip/:limit', oc.getLimitRecords.bind(oc));

router.post('/token-get', oc.mobileTokenGenerate.bind(oc));

module.exports = router;
