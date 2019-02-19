var connection = require('../utils/db/mysqlConnection');
var notification = require('../utils/notification/mobile-notification');
var mn;

function writtenTestimonialModel() {
    mn = new notification();
    this.dbMySQL = connection;
}

writtenTestimonialModel.prototype.getAll = function (params, callback) {
    this.dbMySQL.connectionReader.query('select wt.`*`,u.locationName,u.studioName,e.employee_id,(SELECT CONCAT(e.emp_firstname , " ", e.emp_lastname ) FROM employee e  WHERE e.employee_id = wt.updatedempid) AS empname from written_testimonials wt left join  users u on wt.user_id = u.mindbody_id and wt.studio_id = u.studioid left join employee e on wt.updatedempid = e.employee_id  GROUP BY wt.testimonial_id  order by wt.testimonial_createddate DESC', function (err, results) {
        callback(err, results);
    });
};

writtenTestimonialModel.prototype.create = function (data, callback) {
    var con1 = this.dbMySQL;
    var con2 = this.dbMySQL;
    var con3 = this.dbMySQL;
    var con4 = this.dbMySQL;
    if (!data.testimonial_id) {
        // async.waterfall([
        // 	function (callback) {
        // 		connectionWriter.query('insert into written_testimonials SET ?', data, function (err, results) {
        // 			if (results) {
        // 				data.testimonial_id = results.insertId;
        // 			}
        // 			console.log("1111111111111111")
        // 			console.log(err, results)
        // 			callback(err, results)
        // 		})
        // 	},
        // 	function (parameterValue, callback) {
        // 		console.log('select * from written_testimonials where user_id = ' + data.user_id + ' and studio_id= ' + data.studio_id);
        // 		connectionReader.query('select * from written_testimonials where user_id = ' + data.user_id + ' and studio_id= ' + data.studio_id, function (__err, __result) {
        // 			console.log("22222222222")
        // 			console.log(__err, __result)
        // 			callback(__err, __result);
        // 		})
        // 	},
        // 	function (userData, callback) {
        // 		console.log("333333333333333333")
        // 		console.log(userData)
        // 		if (Object.keys(userData).length == 1) {
        // 			var data = {
        // 				user_id: data.user_id,
        // 				studio_id: data.studio_id,
        // 				reward_for: 'written testimonials',
        // 				refer_desc: 'written testimonials'
        // 			}
        // 			connectionReader.query('select * from reff_activities where activity_code = "230983"', function (e, r) {
        // 				data.points = r[0].activity_points;
        // 				connectionWriter.query('insert into user_rewards SET ?', data, function (_err, result) {
        // 					callback(_err, result)
        // 				});
        // 			})
        // 		} else {
        // 			callback({ data: "No User Found" }, null)
        // 		}

        // 	}
        // ], function (err, data) {
        // 	console.log("********* RESULTTTTTTTTTTTTT")
        // 	console.log(err, data)
        // 	if (err) {
        // 		reply({ status: true, 'data': 'Added Succesfully' });
        // 	} else {
        // 		reply({ status: true, 'data': 'Added Succesfully' });
        // 	}
        // });
        console.log(data);
        var activity_code = data.activity_code;
        delete data.activity_code;
        this.dbMySQL.connectionWriter.query('insert into written_testimonials SET ?', data, function (err, results) {
            if (err) {
                callback(err, data);
            } else {
                data.testimonial_id = results.insertId;
                setTimeout(function () {
                    console.log("***********************************************************************")
                    console.log('select * from user_rewards where user_id = ' + data.user_id + ' and studio_id = ' + data.studio_id + ' and activity_code = ' + activity_code)
                    con1.connectionReader.query('select * from user_rewards where user_id = ' + data.user_id + ' and studio_id = ' + data.studio_id + ' and activity_code = ' + activity_code, function (__err, __result) {
                        console.log(__err)
                        if (Object.keys(__result).length == 0) {
                            var _data = {
                                user_id: data.user_id,
                                studio_id: data.studio_id,
                                activity_code: activity_code,
                                reward_for: 'written testimonials',
                                refer_desc: 'written testimonials'
                            }
                            con2.connectionReader.query('select * from reff_activities where activity_code = "230983"', function (e, r) {
                               console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
                                console.log(e, r)
                                if (Object.keys(r).length == 1) {
                                    _data.points = r[0].activity_points;
                                    console.log("Points");
                                    console.log(_data);
                                    con3.connectionWriter.query('insert into user_rewards SET ?', _data, function (_err, result) {
                                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                                        console.log(_err, result)
                                        if (err) {
                                            callback(err, data);
                                        } else {
                                            console.log('select sum(points) as pointsum,SUM(debit) as debit from user_rewards where user_id ="' + data.user_id + ' and studio_id = ' + data.studio_id)
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
                }, 500)
                mn.notification('Written Testimonials', 'Written Testimonial', data.user_id, data.studio_id);
                // sendNotificationToMe('Written Testimonials', 'Written Testimonial', data.user_id);
            }
        });
    } else {
        delete data.activity_code;
        this.dbMySQL.connectionWriter.query('UPDATE written_testimonials SET ? WHERE testimonial_id = ' + data.testimonial_id, data, function (err, results) {
            callback(err, data);
        });
    }
};

writtenTestimonialModel.prototype.getMyWrittenTestimonial = function (req, res) {
    this.dbMySQL.connectionReader.query('select * from written_testimonials where status = 1 and user_id =  ' + req.params.id + ' and studio_id =' + req.params.studioid + ' order by testimonial_createddate DESC', function (err, results) {
        if (err || Object.keys(results).length == 0) {
            return res.status(200).json({ status: false, data: [], message: "No Video Testimonials", err: err })
        } else {
            return res.status(200).json({ status: true, data: results })
        }
    });
};

module.exports = writtenTestimonialModel;