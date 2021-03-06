var connection = require('../utils/db/mysqlConnection');
var notification = require('../utils/notification/mobile-notification');
const REQUEST = require('request');
var async = require("async");
var jwt = require('jsonwebtoken');
app.set('superSecret', 'shapesBrow');
var FCM = require('fcm-push');
var serverKey = 'AAAAwWvnNvs:APA91bEHeN5TUc0m2kmFfjlbJJR-CUgDyFl2o-XeyZaYWM5fA-sEPt8FefW-02nKOGzl6BOzvkzOXIzMjAEGFJqvh2YPXsjQKavr_tpsqb01ZVqwWji-D7IPz289GAHj5x8allXYttMP';
var fcm = new FCM(serverKey);
var redis = require("../utils/cache/redisCache"),
    rc,
    mn;

function otherModel() {
    rc = new redis();
    mn = new notification();
    this.dbMySQL = connection;
}

otherModel.prototype.webDashbaord = function (req, res) {
    this.dbMySQL.connectionReader.query('select count(*) as writtentotalless3 from written_testimonials where rating_5 < 3;SELECT COUNT(user_id) as maletotal FROM users WHERE gender="M" OR gender="Male";SELECT count(*) as totaluser FROM users;select count(*) as totalbeautytip from beauty_tips;select count(*) as totalcoupon from mindbody_coupons  where coupons_status = 1;select count(*) as writtentotal from written_testimonials ;select count(*) as videototal from testimonials ;SELECT count(*) as refferaltotal FROM reff_activities ;select count(*) as perktotal from rewardpoint;SELECT user_id,fullname,email_id,mobile,gender,mindbody_id,studioName,dateCreated FROM users ORDER BY user_id DESC LIMIT 10', function (err, results) {
        if (err || Object.keys(results).length == 0) {
            res.status(200).json({ status: false, data: [], err: err, message: "You Are Not Register" });
        } else {
            var data = {
                writtentotalless3: results[0][0].writtentotalless3,
                maletotal: results[1][0].maletotal,
                totaluser: results[2][0].totaluser,
                totalbeautytip: results[3][0].totalbeautytip,
                totalcoupon: results[4][0].totalcoupon,
                writtentotal: results[5][0].writtentotal,
                videototal: results[6][0].videototal,
                refferaltotal: results[7][0].refferaltotal,
                perktotal: results[8][0].perktotal,
                userlist: results[9]
            }
            res.status(200).json({ status: true, data: data });
        }
    });
};

otherModel.prototype.mobileDashbaord = function (req, res) {
    this.dbMySQL.connectionReader.query("call mobiledashboard(?,?)", [req.query.mindbodyid, req.query.studioid], function (err, results) {
        if (err || Object.keys(results).length == 0) {
            res.status(200).json({ status: false, data: [], err: err, message: "You Are Not Register" });
        } else {
            if (!results[3][0].pointsum) {
                results[3][0].pointsum = 0
            }
            if (!results[3][0].debit) {
                results[3][0].debit = 0
            }
            res.status(200).json({ status: true, data: results });
        }
    });
};

otherModel.prototype.sendOTPUser = function (req, res) {
    this.dbMySQL.connectionReader.query('select * from users where mobile = ' + req.body.mobile + ' and studioid =' + req.body.studioid, function (_err, _result) {
        if (Object.keys(_result).length) {
            var OTP = Math.floor(100000 + Math.random() * 900000);
            var URL = "https://www.experttexting.com/ExptRestApi/sms/json/Message/Send?username=tbg&password=Shapes@123&api_key=qg85n5d4jgy2rlh&FROM=15626668977&to=+1" + req.body.mobile + "&text= OTP For Your Account Creation Mobile Verification In BEAUTY PASS Is : " + OTP;
            // var URL = "http://raartech.com/?username=digital&password=digital@123&api_key=e5368bbe63f35ee544a442ae2435d608ffd7f322&sender=Drupay&mobile=" + req.body.mobile + "&message= Login OTP " + OTP + " For Shapes Brow Bar ";
            REQUEST({
                url: URL,
                method: 'GET',
            }, function (error, response, body) {
                body = JSON.parse(body)
                this.dbMySQL.connectionWriter.query('UPDATE users SET ? WHERE user_id = ' + _result[0].user_id, { otp: OTP }, function (err, results) {
                    res.status(200).json({ 'status': true, 'data': OTP });
                });
            });
        } else {
            res.status(200).json({ status: false, message: "Mobile No. Doesn't Exist", data: null });
        }
    });
};

otherModel.prototype.verifyOTPUser = function (req, res) {
    this.dbMySQL.connectionReader.query('select * from users where mobile = ' + req.body.mobile + " and otp=" + req.body.otp, function (_err, _result) {
        if (Object.keys(_result).length) {
            var OTP = Math.floor(100000 + Math.random() * 900000);
            var URL = "https://www.experttexting.com/ExptRestApi/sms/json/Message/Send?username=tbg&password=Shapes@123&api_key=qg85n5d4jgy2rlh&FROM=15626668977&to=+1" + req.body.mobile + "&text= OTP For Your Account Creation Mobile Verification In BEAUTY PASS Is : " + OTP;
            // var URL = "http://raartech.com/?username=digital&password=digital@123&api_key=e5368bbe63f35ee544a442ae2435d608ffd7f322&sender=Drupay&mobile=" + req.body.mobile + "&message= Login OTP " + OTP + " For Shapes Brow Bar ";
            REQUEST({
                url: URL,
                method: 'GET',
            }, function (error, response, body) {
                body = JSON.parse(body)
                this.dbMySQL.connectionWriter.query('UPDATE users SET ? WHERE user_id = ' + _result[0].user_id, { otp: OTP }, function (err, results) {
                    res.status(200).json({ 'status': true, 'data': OTP });
                });
            });
        } else {
            res.status(200).json({ status: false, message: "Mobile No. Doesn't Exist", data: [] });
        }
    });
};

otherModel.prototype.checkValidUser = function (req, res) {
    this.dbMySQL.connectionReader.query('select * from users where (first_name = "' + req.body.firstname + '" and last_name = "' + req.body.lastname + '" and mobile="' + req.body.mobile + '" and mindbody_id="' + req.body.mindbodyid + '") or  (first_name = "' + req.body.firstname + '" and last_name = "' + req.body.lastname + '" and email_id="' + req.body.emailid + '" and mindbody_id="' + req.body.mindbodyid + '")', function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "Please Contact To Customer Care" })
        } else {
            return res.status(200).json({ status: true, data: _result })
        }
    });
};

otherModel.prototype.userSearch = function (req, res) {
    this.dbMySQL.connectionReader.query("select  *,concat(IF(first_name IS NULL,'',first_name),' ',IF(last_name IS NULL,'',last_name),' ',IF(mindbody_id IS NULL,'',mindbody_id),' - ', IF(studioName IS NULL,'',studioName), ' - ', IF(location IS NULL,'',location)) as alldetails from users where email_id like '%" + req.query.name + "%' or mindbody_id like '%" + req.query.name + "%' or mobile like '%" + req.query.name + "%'", function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No User Found" })
        } else {
            return res.status(200).json({ status: true, data: _result })
        }
    });
};

otherModel.prototype.userPoints = function (req, res) {
    this.dbMySQL.connectionWriter.query('insert into user_rewards SET ?', req.body, function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No User Found" })
        } else {
            req.body.r_id = _result.insertId;
            return res.status(200).json({ status: true, data: req.body })
        }
    });
};

otherModel.prototype.checkCoupon = function (req, res) {
    con1 = this.dbMySQL;
    con2 = this.dbMySQL;
    con3 = this.dbMySQL;
    this.dbMySQL.connectionReader.query('select * from mindbody_coupons where coupons_status=1 and coupons_for ="' + req.body.rewardpoint_amount + '" ORDER BY coupons_createddate DESC LIMIT 1', function (_err, result) {
        if (Object.keys(result).length) {
            var data = {
                user_id: req.body.mindbody_id,
                reward_for: ' Buy ' + req.body.rewardpoint_amount + ' Coupon',
                debit: req.body.rewardpoint_name,
                studio_id: req.body.studio_id,
                reward_for: 'coupon',
                refer_desc: 'coupon'
            }
            mn.notification(data.reward_for, 'Buy Coupon', data.user_id, data.studio_id);
            // sendNotificationToMe(data.reward_for, 'Buy Coupon', data.user_id);
            rc.delete('/mindbody-coupons');
            con1.connectionWriter.query('insert into user_rewards SET ?', data);
            var data = {
                user_id: req.body.mindbody_id,
                coupon_status: ' Unused ',
                coupons_id: result[0].coupons_id,
                location_id: req.body.location_id,
                location_name: req.body.location_name,
                studio_id: req.body.studio_id,
                studio_name: req.body.studio_name,
                status: '1'
            }
            con2.connectionWriter.query(' UPDATE mindbody_coupons SET coupons_status="0" WHERE coupons_id = ' + result[0].coupons_id);
            con3.connectionWriter.query('insert into couponsassigned SET ?', data, function (__err, __result) {
                if (__result) {
                    return res.status(200).json({ 'status': true, 'couponassigned_id': __result.insertId, 'coupons_number': result[0].coupons_number, 'message': 'Success' })
                } else {
                    return res.status(200).json({ 'status': false, 'couponassigned_id': __result, 'message': 'Some Thing Went Wrong' })
                }
            });
        } else {
            return res.status(200).json({ 'status': false, 'message': 'Coupon Not Available' })
        }
    });
};

otherModel.prototype.myCoupon = function (req, res) {
    this.dbMySQL.connectionReader.query('select * from couponsassigned cs,users u, mindbody_coupons mc where cs.user_id = u.mindbody_id and cs.studio_id = u.studioid and cs.user_id = "' + req.params.id + '" and cs.studio_id =  "' + req.params.studioid + '" and  cs.coupons_id = mc.coupons_id  group by cs.couponassigned_id order by cs.coupon_createddate DESC', function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No Coupon Found" })
        } else {
            return res.status(200).json({ status: true, data: _result })
        }
    });
};

otherModel.prototype.getRewardPoint = function (req, res) {
    this.dbMySQL.connectionReader.query('select SUM(points) as pointsum,SUM(debit) as debit from user_rewards where user_id = ' + req.params.id + ' and studio_id = ' + req.params.studioid, function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No Coupon Found" })
        } else {
            var pointsum = _result[0].pointsum - _result[0].debit;
            return res.status(200).json({ status: true, data: { pointsum: pointsum } })
        }
    });
};

otherModel.prototype.graphs = function (req, res) {
    this.dbMySQL.connectionReader.query("select sum(points)as total,day(dateCreated) as day,sum(debit) as debit  from user_rewards where  dateCreated < DATE_ADD(NOW(), INTERVAL +1 MONTH)  group  by date(dateCreated)", function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No Data Found" })
        } else {
            return res.status(200).json({ status: true, data: _result })
        }
    });
};

otherModel.prototype.pageLimitVideoTestimonials = function (req, res) {
    this.dbMySQL.connectionReader.query('call videotestimonials(?)', [req.query.limit], function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No Video Testimonials" })
        } else {
            var data = {
                pagecount: _result[0][0].videototal,
                list: _result[1]
            }
            return res.status(200).json({ status: true, data: data })
        }
    });
};

otherModel.prototype.pageLimitWrittenTestimonials = function (req, res) {
    this.dbMySQL.connectionReader.query('call writtentestimonials(?)', [req.query.limit], function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No Written Testimonials" })
        } else {
            var data = {
                pagecount: _result[0][0].writtentotal,
                list: _result[1]
            }
            return res.status(200).json({ status: true, data: data })
        }
    });
};

otherModel.prototype.users = function (req, res) {
    this.dbMySQL.connectionReader.query('SELECT user_id,fullname,email_id,mobile,gender,mindbody_id FROM users', function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No User Found" })
        } else {
            return res.status(200).json({ status: true, data: _result })
        }
    });
};

otherModel.prototype.couponUsed = function (req, res) {
    this.dbMySQL.connectionWriter.query('UPDATE couponsassigned SET coupon_status="Used", status="0" WHERE coupons_id = ' + req.params.id, function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No Coupon Found" })
        } else {
            return res.status(200).json({ status: true, data: _result })
        }
    });
};

otherModel.prototype.saveDeviceId = function (req, res) {
    this.dbMySQL.connectionWriter.query('insert into user_mobile_token SET ?', req.body, function (_err, result) {
        if (_err || Object.keys(result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No Coupon Found" })
        } else {
            req.body.user_mobile_token_id = result.insertId;
            return res.status(200).json({ status: true, data: req.body })
        }
    });
};

function generateRandAlphaNumStr(len) {
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
}

otherModel.prototype.login = function (req, res) {
    con1 = this.dbMySQL;
    con2 = this.dbMySQL;
    con3 = this.dbMySQL;
    con4 = this.dbMySQL;
    con5 = this.dbMySQL;
    const mindbody_id = req.body.mindbody_id;
    this.dbMySQL.connectionReader.query('SELECT * FROM users where mindbody_id ="' + mindbody_id + '" and studioid =  ' + req.body.studioid, function (error, user_results, fields) {
        if (Object.keys(user_results).length) {
            delete req.body.referral_code;
            delete req.body.dateCreated;
            var profileStatus = req.body.profileStatus;
            delete req.body.profileStatus;
            con1.connectionWriter.query('UPDATE users SET ? WHERE mindbody_id = "' + mindbody_id + '"', req.body, function (error, results, fields) {
                if (error) {
                    return res.status(200).json({ 'status': false, 'message': 'Record Update Error', 'err': error, data: [] })
                } else {
                    con2.connectionReader.query('select sum(points) as pointsum,SUM(debit) as debit from user_rewards where user_id ="' + mindbody_id + '" and studio_id = ' + req.body.studioid, function (error, reward_points, fields) {
                        req.body.user_id = user_results[0].user_id;
                        req.body.mindbody_id = mindbody_id;
                        req.body.referral_code = user_results[0].referral_code;
                        // req.body.sb_u_role = 2;
                        req.body.rewards_points = reward_points[0].pointsum - reward_points[0].debit;;
                        console.log(profileStatus);
                        console.log("*************")
                        if (profileStatus == 1) {
                            console.log("TRUEEEEEEEEEEEEEE")
                            con4.connectionWriter.query('UPDATE written_testimonials SET fullname="' + req.body.fullname + '" WHERE  user_id= ' + mindbody_id + ' and studio_id = ' + req.body.studioid, function (e1, r1) {
                                console.log("e1 , r1")
                                console.log(e1, r1)
                            });
                            con5.connectionWriter.query('UPDATE testimonials SET fullname="' + req.body.fullname + '" WHERE  user_id= ' + mindbody_id + ' and studio_id = ' + req.body.studioid, function (e2, r2) {
                                console.log("e2 , r2")
                                console.log(e2, r2)
                            });
                        }
                        return res.status(200).json({ 'status': true, 'message': 'Record Update', 'data': req.body })
                    })
                }
            })
        } else {
            var referral_code = generateRandAlphaNumStr(10);
            req.body.referral_code = referral_code;
            con1.connectionWriter.query('insert into users SET ?', req.body, function (error, results) {
                if (error) {
                    return res.status(200).json({ 'status': false, 'message': 'Record Insert Error', 'err': error, data: [] })
                } else {
                    req.body.mindbody_id = mindbody_id;
                    req.body.user_id = results.insertId;
                    // req.body.sb_u_role = 2;
                    con2.connectionReader.query('select * from reff_activities where activity_code = "456729"', function (e, r) {
                        if (Object.keys(r).length == 1) {
                            var data = {
                                user_id: req.body.mindbody_id,
                                studio_id: req.body.studioid,
                                debit: 0,
                                reward_for: 'Register',
                                refer_by: req.body.refer_by,
                                dateCreated: req.body.dateCreated
                            }
                            req.body.rewards_points = r[0].activity_points;
                            data.points = r[0].activity_points;
                            mn.notification(data.reward_for, 'Refernce', req.body.mindbody_id, req.body.studioid);
                            // sendNotificationToMe(data.reward_for, 'Refernce', req.body.mindbody_id);
                            con3.connectionWriter.query('insert into user_rewards SET ?', data, function (_err, result) {
                                if (_err) {
                                    return res.status(200).json({ 'status': false, 'data': [] })
                                } else {
                                    return res.status(200).json({ 'status': true, 'message': 'Record Inserted', 'data': req.body })
                                }
                            });
                        } else {
                            return res.status(200).json({ 'status': false, 'data': [] })
                        }
                    })
                }
            })
        }
    });
};

otherModel.prototype.bulkUploadCoupon = function (req, res) {
    var errData = [];
    var count = 1;
    var con1 = this.dbMySQL;
    rc.delete('/mindbody-coupons');
    async.forEach(req.body, function (item, callback) {
        con1.connectionWriter.query("INSERT INTO `mindbody_coupons` ( `coupons_number`, `coupons_for`,`createdempid`,`coupons_status`) VALUES ( " + JSON.stringify(item["coupon num"]) + ", " + JSON.stringify(item["coupon point"]) + "," + item.empid + ",1)", function (err, result) {
            if (err) {
                errData.push(item)
            }
            if (req.body.length == count) {
                callback(errData);
            }
            count = count + 1;
        })
    }, function (err) {
        return res.status(200).json({ 'status': true, errdata: err })
    })
};

otherModel.prototype.getUserRewardHistory = function (req, res) {
    console.log('SELECT *,dateCreated as rewarddate FROM user_rewards  where user_id = "' + req.params.user_id + '"    and studio_id = "' + req.params.studioid + '" group by r_id order by dateCreated DESC ')
    console.log(req.params);
    console.log(req.body)
    if (req.params.moborweb == 0) {
        this.dbMySQL.connectionReader.query('SELECT *,dateCreated as rewarddate FROM user_rewards  where user_id = "' + req.params.user_id + '"    and studio_id = "' + req.params.studioid + '" group by r_id order by dateCreated DESC ', function (_err, _result) {
            if (_err || Object.keys(_result).length == 0) {
                return res.status(200).json({ status: false, data: [], err: _err, message: "No User Found" })
            } else {
                return res.status(200).json({ status: true, data: _result })
            }
        });
    } else {
        this.dbMySQL.connectionReader.query(' SELECT ur.*,u.first_name,u.last_name,u.fullname,u.email_id,u.mobile,u.dob,u.location,u.locationName,u.studioid,u.studioName,ur.dateCreated as rewarddate FROM user_rewards ur left join users u on ur.user_id = u.mindbody_id and ur.studio_id = u.studioid  where ur.user_id ="' + req.params.user_id + '"    and ur.studio_id = "' + req.params.studioid + '" group by ur.r_id order by ur.dateCreated DESC ', function (_err, _result) {
            if (_err || Object.keys(_result).length == 0) {
                return res.status(200).json({ status: false, data: [], err: _err, message: "No User Found" })
            } else {
                return res.status(200).json({ status: true, data: _result })
            }
        });
    }
};

otherModel.prototype.fbTestimonials = function (req, res) {
    con1 = this.dbMySQL;
    con2 = this.dbMySQL;
    con3 = this.dbMySQL;
    con4 = this.dbMySQL;
    if (req.body.activity_code == "100123") {
        this.dbMySQL.connectionReader.query('SELECT * FROM `reff_activities` WHERE `activity_code` = ' + req.body.activity_code, function (error, data, fields) {
            if (Object.keys(data).length == 1) {
                delete req.body.activity_id;
                var data = {
                    user_id: req.body.user_id,
                    points: data[0].activity_points,
                    reward_for: data[0].activity_name,
                    studio_id: req.body.studio_id,
                    dateCreated: req.body.dateCreated
                }
                // connection.query('select * from ')
                con1.connectionWriter.query('insert into user_rewards SET ?', data, function (_err, result) {
                });
                if (req.body.referral_code) {
                    con2.connectionReader.query('select * from users where referral_code = "' + req.body.referral_code + '"', function (__err, __result) {
                        if (Object.keys(__result).length == 1) {
                            if (__result[0].mindbody_id) {
                                var _data = {
                                    user_id: __result[0].mindbody_id,
                                    studio_id: __result[0].studioid,
                                    reward_for: 'Purchasing a Membership Through Referral',
                                    dateCreated: req.body.dateCreated
                                }
                                con3.connectionReader.query("SELECT * FROM `reff_activities` WHERE `activity_code` = '187349'", function (e, r) {
                                    if (Object.keys(r).length == 1) {
                                        _data.points = r[0].activity_points
                                        con4.query('insert into user_rewards SET ?', _data, function (error, res) {
                                            if (error) {
                                                return res.status(200).json({ 'status': true, 'data': data, "message": "No Refference" });
                                            } else {
                                                return res.status(200).json({ 'status': true, 'data': data, "message": " Add Points To Reffer " });
                                            }
                                        });
                                    } else {
                                        return res.status(200).json({ 'status': true, 'data': data, "message": "No Refference" });
                                    }
                                })
                            } else {
                                return res.status(200).json({ 'status': true, 'data': data, "message": "No Refference" });
                            }
                        } else {
                            return res.status(200).json({ 'status': true, 'data': data, "message": "No Refference" });
                        }
                    })
                } else {
                    setTimeout(function () {
                        con4.connectionReader.query('select sum(points) as pointsum,SUM(debit) as debit from user_rewards where user_id =' + data.user_id + ' and studio_id = ' + data.studio_id, function (error, reward_points) {
                            console.log(",,,,,,,,,,,,,,,,,,,,,,,,,")
                            console.log(error, reward_points)
                            if (error) {
                                res.status(200).json({ 'status': false, 'data': [], err: error });
                            } else {
                                data.rewards_points = reward_points[0].pointsum - reward_points[0].debit;;
                                res.status(200).json({ 'status': true, 'data': data });
                            }
                        })
                    }, 500)
                    // return res.status(200).json({ 'status': true, 'data': data, "message": "No Refference" });
                }
            } else {
                return res.status(200).json({ 'status': false, 'data': [], err: "Code Doesn't Exist" });
            }
        })
    } else {
        console.log('select * from user_rewards where user_id = ' + req.body.user_id + ' and studio_id = ' + req.body.studio_id + ' and activity_code = ' + req.body.activity_code)
        this.dbMySQL.connectionReader.query('select * from user_rewards where user_id = ' + req.body.user_id + ' and studio_id = ' + req.body.studio_id + ' and activity_code = ' + req.body.activity_code, function (__err, __result) {
            console.log("************************")
            console.log(__err, __result)
            if (Object.keys(__result).length == 0) {
                con1.connectionReader.query('SELECT * FROM `reff_activities` WHERE `activity_code` = ' + req.body.activity_code, function (error, data, fields) {
                    if (Object.keys(data).length == 1) {
                        var data = {
                            user_id: req.body.user_id,
                            points: data[0].activity_points,
                            reward_for: req.body.reward_for,
                            studio_id: req.body.studio_id,
                            activity_code: req.body.activity_code,
                            dateCreated: req.body.dateCreated
                        }
                        con2.connectionWriter.query('insert into user_rewards SET ?', data, function (_err, result) {
                            if (_err) {
                                return res.status(200).json({ 'status': false, 'data': [], err: _err });
                            } else {
                                // sendNotification(req.body.reward_for, 'Facebook Testimonial');	
                                // return res.status(200).json({ 'status': true, 'data': req.body });
                                setTimeout(function () {
                                    con4.connectionReader.query('select sum(points) as pointsum,SUM(debit) as debit from user_rewards where user_id =' + req.body.user_id + ' and studio_id = ' + req.body.studio_id, function (error, reward_points) {
                                        console.log(",,,,,,,,,,,,,,,,,,,,,,,,,")
                                        console.log(error, reward_points)
                                        if (error) {
                                            res.status(200).json({ 'status': false, 'data': [], err: error });
                                        } else {
                                            data.rewards_points = reward_points[0].pointsum - reward_points[0].debit;;
                                            res.status(200).json({ 'status': true, 'data': data });
                                        }
                                    })
                                }, 500)
                            }
                        });
                    } else {
                        return res.status(200).json({ 'status': false, 'data': [], err: "Code Doesn't Exist" });
                    }
                });
            } else {
                return res.status(200).json({ 'status': false, 'data': [], err: "Points Added Already" });
            }
        })
    }
};

otherModel.prototype.studioids = function (req, res) {
    this.dbMySQL.connectionReader.query('SELECT DISTINCT`studioid` FROM `users` where studioid is not null', function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No Studio Id Found" })
        } else {
            return res.status(200).json({ status: true, data: _result })
        }
    });
};

otherModel.prototype.locationids = function (req, res) {
    this.dbMySQL.connectionReader.query('SELECT DISTINCT`location` FROM `users` where studioid = "' + req.params.id + '" and location is not null and location != ""', function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No Location Id Found" })
        } else {
            return res.status(200).json({ status: true, data: _result })
        }
    });
};

otherModel.prototype.getUserStudioLocation = function (req, res) {
    this.dbMySQL.connectionReader.query("select * from users where location = " + req.query.locationid + " and studioid = " + req.query.studioid + " limit " + req.query.limit + ",5", function (_err, _result) {
        if (_err || Object.keys(_result).length == 0) {
            return res.status(200).json({ status: false, data: [], err: _err, message: "No User Found" })
        } else {
            return res.status(200).json({ status: true, data: _result })
        }
    });
};

otherModel.prototype.updateTestimonialLike = function (req, res) {
    con1 = this.dbMySQL;
    con2 = this.dbMySQL;
    const testimonial_id = req.body.testimonial_id;
    const user_id = req.body.user_id;
    this.dbMySQL.connectionReader.query('select user_like_id,rec_status from user_testimonial_likes where testimonial_id="' + testimonial_id + '" and  user_id="' + user_id + '" and studio_id = "' + req.body.studio_id + '"',
        function (error, userResults, fields) {
            if (error) throw error;
            if (Object.keys(userResults).length > 0) {
                if (userResults[0].rec_status == 1) {
                    con1.connectionWriter.query('update testimonials set likes=likes-1 where testimonial_id="' + testimonial_id + '"',
                        function (error, userUnlikeResults, fields) {
                            if (error) throw error;
                            con2.connectionWriter.query('update user_testimonial_likes set rec_status=0 where user_id="' + user_id + '"  and studio_id = ' + req.body.studio_id + ' and testimonial_id = ' + testimonial_id,
                                function (error, userUnlikesResults, fields) {
                                    if (error) throw error;
                                    return res.status(200).json({ 'status': true, 'message': 'The testimonial is unliked by you.' });
                                });
                        });
                } else {
                    con1.connectionWriter.query('update testimonials set likes=likes+1 where testimonial_id="' + testimonial_id + '"',
                        function (error, userUnlikeResults, fields) {
                            if (error) throw error;
                            mn.notification('Your Testimonial Is Liked', 'Testimonial Like', req.body.user_id, req.body.studio_id);
                            // sendNotificationToMe('Your Testimonial Is Liked', 'Testimonial Like', req.body.user_id);
                            con2.connectionWriter.query('update user_testimonial_likes set rec_status=1 where user_id="' + user_id + '"  and studio_id = ' + req.body.studio_id + ' and testimonial_id = ' + testimonial_id,
                                function (error, userUnlikesResults, fields) {
                                    if (error) throw error;
                                    return res.status(200).json({ 'status': true, 'message': 'The testimonial is liked by you.' });
                                });
                        });
                }
            } else {
                con1.connectionWriter.query('update testimonials set likes=likes+1 where testimonial_id="' + testimonial_id + '"',
                    function (error, updateResults, fields) {
                        if (error) throw error;
                        mn.notification('Your Testimonial Is Liked', 'Testimonial Like', req.body.user_id, req.body.studio_id);
                        // sendNotificationToMe('Your Testimonial Is Liked', 'Testimonial Like', req.body.user_id);
                        con2.connectionWriter.query('insert into user_testimonial_likes SET ?', req.body, function (error, userUnlikeResults, fields) {
                            if (error) throw error;
                            return res.status(200).json({ 'status': true, 'message': 'The testimonial is liked by you.' });
                        });
                        // return res.status(200).json({ 'status': true, 'message': 'Thanks for liking the testimonial.' });
                    });
            }
        });
};

otherModel.prototype.getLimitRecords = function (req, res) {
    this.dbMySQL.connectionReader.query(' select count(*) as totalusers from users where location = ' + req.params.locationid + ' and studioid = ' + req.params.studioid + ' ; select * from users where location = ' + req.params.locationid + ' and studioid = ' + req.params.studioid + '  limit ' + req.params.skip + ',' + req.params.limit, function (err, results) {
        if (err || !results || Object.keys(results).length == 0) {
            res.send({ status: false, data: [], err: err, message: "No Records Found" });
        } else {
            res.send({ status: true, data: results });
        }
    });
};

otherModel.prototype.BroadcastSmsToAll = function (req, res) {
    if (req.body.studioid && req.body.message) {
        var sql = '';
        if (req.body.location) {
            sql = " and location= " + req.body.location;
        }
        this.dbMySQL.connectionReader.query('select * from users where studioid="' + req.body.studioid + '"' + sql,
            function (error, results, fields) {
                if (error) throw error;
                results.forEach(element => {
                    if (element.mobile) {
                        var url = "https://www.experttexting.com/ExptRestApi/sms/json/Message/Send?username=tbg&password=Shapes@123&api_key=qg85n5d4jgy2rlh&FROM=15626668977&to=+1" + element.mobile + "&text=" + req.body.message;
                        REQUEST({
                            url: url,
                            method: 'GET',
                        }, function (error, response, body) {

                        });
                    }
                });
                res.send({ 'status': true, 'data': "" });
            });
    } else {
        res.send({ 'status': false, 'data': "Please Provide Studio Id And Message" })
    }
};

otherModel.prototype.broadcastMembership = function (req, res) {
    console.log("came")
    this.dbMySQL.connectionReader.query('SELECT DISTINCT`studioID` FROM `shapes_memberships` WHERE studioID is not null and studioID != ""', function (err, results) {
        if (err || !results || Object.keys(results).length == 0) {
            res.send({ status: false, data: [], err: err, message: "No Records Found" });
        } else {
            res.send({ status: true, data: results });
        }
    });
};


otherModel.prototype.broadcastMembershipSendSms = function (req, res) {
    if (req.body.studioid && req.body.message) {
        this.dbMySQL.connectionReader.query('SELECT * FROM `shapes_memberships` where `studioID` = ' + req.body.studioid, function (_err, result) {
            if (_err) throw _err;
            result.forEach(element => {
                if (element.phone) {
                    var url = "https://www.experttexting.com/ExptRestApi/sms/json/Message/Send?username=tbg&password=Shapes@123&api_key=qg85n5d4jgy2rlh&FROM=15626668977&to=+1" + element.phone + "&text=" + req.body.message;
                    REQUEST({
                        url: url,
                        method: 'GET',
                    }, function (error, response, body) {

                    });
                }
            })
            res.send({ 'status': true, 'data': "" });
        });
    } else {
        res.send({ 'status': false, 'data': "Please Provide Studio Id And Message" })
    }
};


otherModel.prototype.mobileTokenGenerate = function (req, res) {
    if (req.body.U_n == "shape1112" && req.body.Pass_w == "brow__m") {
        var token, data = {};
        data.sb_u_role = 2;
        token = jwt.sign({ data: data }, app.get('superSecret'), {
            expiresIn: 60 * 60 * 1000
        });
        res.send({ status: true, token: token })
    } else {
        res.send({ status: false, token: [] })
    }
};


otherModel.prototype.webLogin = function (req, res) {
    this.dbMySQL.connectionReader.query('select * from employee where emp_status=1 and emp_email = "' + req.body.emailid + '" and emp_password = "' + req.body.password + '" and emp_status=1', function (err, results) {
        if (err || Object.keys(results).length == 0) {
            res.status(200).json({ status: false, data: [], err: err, message: "You Are Not Register" });
        } else {
            var token, _empData;
            _empData = results[0];
            _empData.sb_u_role = 1;
            token = jwt.sign({ data: _empData }, app.get('superSecret'), {
                expiresIn: 60 * 60 * 1000
            });
            res.status(200).json({ status: true, data: results, token: token });
        }
    });
};

otherModel.prototype.transcationPoints = function (req, res) {
    var deviceId = req.body.device_id;
    var pointsData = {
        user_id: req.body.transaction_mindbodyid,
        studio_id: req.body.studio_id,
        reward_for: req.body.transactions_desc,
        points: req.body.points,
        refer_desc: req.body.refer_desc,
        dateCreated: req.body.dateCreated
    };
    var con1 = this.dbMySQL;
    var con2 = this.dbMySQL;
    this.dbMySQL.connectionWriter.query('insert into user_rewards SET ?', pointsData, function (err, result) {
        console.log(err);
        // sendNotificationToMe(req.body.reward_for, 'Purchase Product', req.body.transaction_mindbodyid)
        mn.notification(req.body.reward_for, 'Purchase Product', req.body.transaction_mindbodyid, req.body.studio_id);
    });
    delete req.body.device_id;
    delete req.body.points;
    delete req.body.refer_desc;
    con1.connectionWriter.query('insert into transaction SET ?', req.body, function (err, results) {
        console.log("*************")
        console.log(err, results)
        if (err) {
            reply({ 'status': false, 'data': [], err: err });
        } else {
            req.body.transaction_id = results.insertId;
            var message = {
                to: deviceId,
                notification: {
                    title: "Transaction Successfull",
                    body: req.body.transactions_desc
                },
                data: {
                    page: req.body.transaction_type
                }
            };
            fcm.send(message)
                .then(function (response) {
                    console.log("responce");
                    console.log(response);
                })
                .catch(function (err) {
                    console.log("errrrrrrr");
                    console.log(err);
                })
            setTimeout(function () {
                con2.connectionReader.query('select sum(points) as pointsum,SUM(debit) as debit from user_rewards where user_id =' + pointsData.user_id + ' and studio_id = ' + pointsData.studio_id, function (error, reward_points) {
                    console.log(",,,,,,,,,,,,,,,,,,,,,,,,,")
                    console.log(error, reward_points)
                    if (error) {
                        res.status(200).json({ 'status': false, 'data': [], err: error });
                    } else {
                        req.body.rewards_points = reward_points[0].pointsum - reward_points[0].debit;;
                        res.status(200).json({ 'status': true, 'data': req.body });
                    }
                })
            }, 500)
            // res.status(200).json({ 'status': true, 'data': req.body });
        }
    });
};


otherModel.prototype.sendMobileNotification = function (req, res) {
    if (req.body.studio_id && req.body.desc && req.body.title) {
        var sql = '';
        if (req.body.locationid) {
            sql = " and location=" + req.body.locationid
        }
        console.log('select * from users where studioid =' + req.body.studio_id + sql)
        this.dbMySQL.connectionReader.query('select * from users where studioid =' + req.body.studio_id + sql, function (error, results, fields) {
            if (error) {
                res.status(200).json({ 'status': false, 'data': [], err: error, message: "Please Provide Studio id" });
            }
            if (Object.keys(results).length) {
                results.forEach(element => {
                    var message = {
                        to: element.device_id,
                        notification: {
                            title: req.body.title,
                            body: req.body.desc
                        },
                        data: {
                            page: req.body.title
                        }
                    };
                    fcm.send(message)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (err) {
                            console.log(err);
                        })
                });
            }
            res.status(200).json({ 'status': true, 'data': [] });
        });
    } else {
        res.status(200).json({ 'status': false, 'data': [], message: "Please Provide Studio id and title and description" });
    }
};

otherModel.prototype.addPointReferal = function (req, res) {
    console.log('SELECT * FROM users where referral_code ="' + req.body.referral_code + '"');
    var con1 = this.dbMySQL;
    var con2 = this.dbMySQL;
    if(req.body.referral_code){
        this.dbMySQL.connectionReader.query('SELECT * FROM users where referral_code ="' + req.body.referral_code + '"', function (err, results) {
            if (err) {
                res.status(200).json({ 'status': false, 'data': [], err: err });
            } else {
                console.log(results)
                if (Object.keys(results).length >= 1) {
                    var data = {
                        user_id: results[0].mindbody_id,
                        studio_id: results[0].studioid,
                        reward_for: 'referal',
                        refer_desc: 'referal',
                    }
                    console.log(data)
                    mn.notification(data.reward_for, 'Referal Coupon', data.user_id, data.studio_id);
                    con1.connectionReader.query('select * from reff_activities where activity_code = "946574"', function (e, r) {
                        if (Object.keys(r).length == 1) {
                            data.points = r[0].activity_points;
                            con2.connectionWriter.query('insert into user_rewards SET ?', data, function (_err, result) {
                                if (_err) {
                                    res.status(200).json({ 'status': false, 'data': [], err: _err });
                                } else {
                                    res.status(200).json({ 'status': true, 'data': data, 'message': 'Success Fully Inserted' });
                                }
                            });
                        } else {
                            res.status(200).json({ 'status': false, 'data': [], err: _err });
                        }
                    })
                } else {
                    res.status(200).json({ 'status': false, 'data': [], data: 'Record Not Found ' });
                }
            }
        });
    } else {
        res.status(200).json({ 'status': false, 'data': [],err:"Please Send Refferal Code" });
    }

    
}

module.exports = otherModel;
