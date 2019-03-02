var express = require('express');
var router = express.Router();
var otherController = require('../controllers/otherController');
var middleAuth = require('../utils/auth/tokenAuth');
var role = require('../utils/auth/authorization');
var oc = new otherController();

router.post('/web-login', oc.webLogin.bind(oc));

router.get('/web-dashboard', middleAuth, role.isSuper, oc.webDashbaord.bind(oc));

router.get('/mobile-dashboard', middleAuth, role.isCandidate, oc.mobileDashbaord.bind(oc));

router.post('/send-otp-user', middleAuth, role.isCandidate, oc.sendOTPUser.bind(oc));

router.post('/verify-otp-user', middleAuth, role.isCandidate, oc.verifyOTPUser.bind(oc));

router.post('/test-valid-user', middleAuth, role.isCandidate, oc.checkValidUser.bind(oc));

router.get('/user-search', middleAuth, role.isSuper, oc.userSearch.bind(oc));

router.post('/user-points', middleAuth, role.isSuperOrCandidate, oc.userPoints.bind(oc));

router.post('/check_coupons', middleAuth, role.isCandidate, oc.checkCoupon.bind(oc));

router.get('/my_coupons/:id/:studioid', middleAuth, role.isCandidate, oc.myCoupon.bind(oc));

router.get('/get_reward_points/:id/:studioid', middleAuth, role.isCandidate, oc.getRewardPoint.bind(oc));

router.get('/graphs', middleAuth, role.isSuper, oc.graphs.bind(oc));

router.get('/page-video-testimonials', middleAuth, role.isCandidate, oc.pageLimitVideoTestimonials.bind(oc));

router.get('/page-written-testimonials', middleAuth, role.isCandidate, oc.pageLimitWrittenTestimonials.bind(oc));

// router.get('/graphs', middleAuth, role.isSuper, oc.graphs.bind(oc));

router.get('/get_users_list', middleAuth, role.isSuper, oc.users.bind(oc));

router.get('/coupon_used/:id', middleAuth, role.isCandidate, oc.couponUsed.bind(oc));

router.post('/device-ids', middleAuth, role.isCandidate, oc.saveDeviceId.bind(oc));

router.post('/login', middleAuth, role.isCandidate, oc.login.bind(oc));

router.post('/bulk-upload', middleAuth, role.isSuper, oc.bulkUploadCoupon.bind(oc));

router.get('/reward_histories/:user_id/:studioid/:moborweb', middleAuth, role.isSuperOrCandidate, oc.getUserRewardHistory.bind(oc));

router.post('/fb-testimonials', middleAuth, role.isCandidate, oc.fbTestimonials.bind(oc));

router.get('/studioids', middleAuth, role.isSuper, oc.studioids.bind(oc));

router.get('/locationids/:id', middleAuth, role.isSuper, oc.locationids.bind(oc));

router.get('/studioid-memberships', middleAuth, role.isSuper, oc.broadcastMembership.bind(oc));

router.get('/get-user-ids', middleAuth, role.isSuper, oc.getUserStudioLocation.bind(oc));

router.post('/update_testimonials', middleAuth, role.isCandidate, oc.updateTestimonialLike.bind(oc));

router.post('/group-sms', middleAuth, role.isSuper, oc.BroadcastSmsToAll.bind(oc));

router.post('/studioid-memberships-sms', middleAuth, role.isSuper, oc.broadcastMembershipSendSms.bind(oc));

router.get('/users-limit/:studioid/:locationid/:skip/:limit', middleAuth, role.isSuper, oc.getLimitRecords.bind(oc));

router.post('/transactions', middleAuth, role.isSuperOrCandidate, oc.transcationPoints.bind(oc));

router.post('/token-get', oc.mobileTokenGenerate.bind(oc));

router.post('/notifications', middleAuth, role.isSuper, oc.sendMobileNotification.bind(oc));

router.post('/add_points_referals', middleAuth, role.isSuperOrCandidate, oc.addPointReferal.bind(oc));

module.exports = router;
