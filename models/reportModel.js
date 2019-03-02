var connection = require('../utils/db/mysqlConnection');

function faqModel() {
    this.dbMySQL = connection;
}

faqModel.prototype.getPerksReport = function (req, res) {
    var sql = '';
    var count = 0;
    if (Object.keys(req.query).length) {
        if (req.query.startdate) {
            if (count == 0) {
                count++
                sql = sql + " where ";
            } else {
                sql = sql + " and ";
            }
            sql = sql + " ca.coupon_createddate >= '" + req.query.startdate + "'";
        }
        if (req.query.enddate) {
            if (count == 0) {
                count++
                sql = sql + " where ";
            } else {
                sql = sql + " and ";
            }
            sql = sql + " ca.coupon_createddate <= '" + req.query.enddate + " 23:59:59'";
        }
        if (req.query.studioid) {
            if (count == 0) {
                count++
                sql = sql + " where ";
            } else {
                sql = sql + " and ";
            }
            sql = sql + " ca.studio_id = '" + req.query.studioid + "'"
        }
    }
    console.log('select ca.*,mc.coupons_number,mc.coupons_for,mc.coupons_id,u.fullname,u.email_id,u.mobile from couponsassigned as ca LEFT JOIN mindbody_coupons as mc ON mc.coupons_id=ca.coupons_id LEFT JOIN users as u ON u.mindbody_id=ca.user_id  and u.studioid = ca.studio_id ' + sql+ ' order by ca.coupon_modifydate desc')
    this.dbMySQL.connectionReader.query('select ca.*,mc.coupons_number,mc.coupons_for,mc.coupons_id,u.fullname,u.email_id,u.mobile from couponsassigned as ca LEFT JOIN mindbody_coupons as mc ON mc.coupons_id=ca.coupons_id LEFT JOIN users as u ON u.mindbody_id=ca.user_id  and u.studioid = ca.studio_id ' + sql + ' order by ca.coupon_modifydate desc', function (err, results) {
        if (err || Object.keys(results).lenght == 0) {
            res.status(500).json({ status: false, data: [], "message": "No Data found", err: err });
        } else {
            res.status(200).json({ status: true, data: results });
        }
    });
};

faqModel.prototype.getVocherReport = function (req, res) {
    var sql = '';
    var count = 0;
    if (Object.keys(req.query).length) {
        if (req.query.startdate) {
            if (count == 0) {
                count++
                sql = sql + " where ";
            } else {
                sql = sql + " and ";
            }
            sql = sql + " coupons_modifydate >= '" + req.query.startdate + "'";
        }
        if (req.query.enddate) {
            if (count == 0) {
                count++
                sql = sql + " where ";
            } else {
                sql = sql + " and ";
            }
            sql = sql + " coupons_modifydate <= '" + req.query.enddate + " 23:59:59'";
        }
    }
    console.log("SELECT coupons_for,COUNT(IF(coupons_status='1',1, NULL)) 'Unused',COUNT(IF(coupons_status='0',1, NULL)) 'Used',COUNT(IF(coupons_enddate <= CURDATE(),1, NULL)) 'Expired' FROM mindbody_coupons " + sql + " group by coupons_for")
    this.dbMySQL.connectionReader.query("SELECT coupons_for,COUNT(IF(coupons_status='1',1, NULL)) 'Unused',COUNT(IF(coupons_status='0',1, NULL)) 'Used',COUNT(IF(coupons_enddate <= CURDATE(),1, NULL)) 'Expired' FROM mindbody_coupons " + sql + " group by coupons_for", function (err, results) {
        if (err || Object.keys(results).lenght == 0) {
            res.status(500).json({ status: false, data: [], "message": "No Data found", err: err });
        } else {
            res.status(200).json({ status: true, data: results });
        }
    });
};

module.exports = faqModel;