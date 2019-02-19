var connection = require('../utils/db/mysqlConnection');
var notification = require('../utils/notification/mobile-notification');
var mn;

function videoTestimonialModel() {
    mn = new notification();
    this.dbMySQL = connection;
}

videoTestimonialModel.prototype.getAll = function (params, callback) {
    this.dbMySQL.connectionReader.query('select t.testimonial_id,t.description,t.video,t.user_id,t.likes,t.video_thumbnail,t.fullname,t.rec_status,u.locationName,u.studioName,e.employee_id,(SELECT CONCAT(e.emp_firstname , " ", e.emp_lastname ) FROM employee e  WHERE e.employee_id = t.updatedempid) AS empname   from testimonials t left join users u on t.user_id = u.studioid and t.studio_id = u.studioid left join employee e on t.updatedempid = e.employee_id  order by t.likes DESC', function (err, results) {
        callback(err, results);
    });
};

videoTestimonialModel.prototype.create = function (data, callback) {
    var con1 = this.dbMySQL;
    var con2 = this.dbMySQL;
    var con3 = this.dbMySQL;
    var con4 = this.dbMySQL;
    if (!data.testimonial_id) {
        activity_code = data.activity_code;
        delete data.activity_code;
        this.dbMySQL.connectionWriter.query('insert into testimonials SET ?', data, function (err, results) {
            if (err) {
                callback(err, results);
            } else {
                data.testimonial_id = results.insertId;
                setTimeout(function () {
                    con1.connectionReader.query('select * from user_rewards where user_id = ' + data.user_id + ' and studio_id = ' + data.studio_id + ' and activity_code = ' + activity_code, function (__err, __result) {
                        if (Object.keys(__result).length == 0) {
                            var _data = {
                                studio_id: data.studio_id,
                                user_id: data.user_id,
                                activity_code: activity_code,
                                reward_for: 'video testimonials',
                                refer_desc: 'video testimonials'
                            }
                            con2.connectionReader.query('select * from reff_activities where activity_code = "487563"', function (e, r) {
                                if (Object.keys(r).length == 1) {
                                    _data.points = r[0].activity_points;
                                    con3.connectionWriter.query('insert into user_rewards SET ?', _data, function (_err, result) {
                                        if (err) {
                                            callback(err, data);
                                        } else {
                                            con4.connectionReader.query('select sum(points) as pointsum,SUM(debit) as debit from user_rewards where user_id ="' + data.user_id + ' and studio_id = ' + data.studio_id, function (error, reward_points) {
                                                if (error) {
                                                    callback(err, data);
                                                } else {
                                                    data.rewards_points = reward_points[0].pointsum - reward_points[0].debit;;
                                                    callback(err, data);
                                                }
                                            })
                                        }
                                    });
                                } else {
                                    callback(err, data);
                                }
                            })
                        } else {
                            callback(err, data);
                        }
                    })
                }, 100);
                mn.notification('Video Testimonials', 'Video Testimonial', data.user_id, data.studio_id);
                // sendNotificationToMe('Video Testimonials', 'Video Testimonial', data.user_id);
            }
        });
    } else {
        delete data.activity_code;
        this.dbMySQL.connectionWriter.query('UPDATE testimonials SET ? WHERE testimonial_id = ' + data.testimonial_id, data, function (err, results) {
            callback(err, data);
        });
    }
};

videoTestimonialModel.prototype.getMyVideoTestimonial = function (req, res) {
    this.dbMySQL.connectionReader.query(' select * from testimonials where user_id = ' + req.params.id + ' and studio_id = ' + req.params.studioid + ' order by created_date DESC ', function (err, results) {
        if (err || Object.keys(results).length == 0) {
            return res.status(200).json({ status: false, data: [], message: "No Video Testimonials", err: err })
        } else {
            return res.status(200).json({ status: true, data: results })
        }
    });
};

module.exports = videoTestimonialModel;