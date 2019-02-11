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
    }
    this.dbMySQL.connectionReader.query('select ca.*,mc.coupons_number,mc.coupons_for,mc.coupons_id,u.fullname,u.email_id,u.mobile from shapes.couponsassigned as ca LEFT JOIN shapes.mindbody_coupons as mc ON mc.coupons_id=ca.coupons_id LEFT JOIN shapes.users as u ON u.mindbody_id=ca.user_id ' + sql, function (err, results) {
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
            sql = sql + " coupons_createddate >= '" + req.query.startdate + "'";
        }
        if (req.query.enddate) {
            if (count == 0) {
                count++
                sql = sql + " where ";
            } else {
                sql = sql + " and ";
            }
            sql = sql + " coupons_createddate <= '" + req.query.enddate + " 23:59:59'";
        }
    }
    this.dbMySQL.connectionReader.query("SELECT coupons_for,COUNT(IF(coupons_status='1',1, NULL)) 'Unused',COUNT(IF(coupons_status='0',1, NULL)) 'Used',COUNT(IF(coupons_enddate <= CURDATE(),1, NULL)) 'Expired' FROM mindbody_coupons " + sql + " group by coupons_for", function (err, results) {
        if (err || Object.keys(results).lenght == 0) {
            res.status(500).json({ status: false, data: [], "message": "No Data found", err: err });
        } else {
            res.status(200).json({ status: true, data: results });
        }
    });
};

module.exports = faqModel;