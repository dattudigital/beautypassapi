var mysql = require('mysql');

const connectionWriter = mysql.createConnection({
	host: 'trendzbeauty-cluster-1.cluster-cqvzsqc8lyno.ap-south-1.rds.amazonaws.com',
	user: 'tredzdb',
	password: 'Digitalrupay',
	database: 'shapes',
	port: 3306
});

const connectionReader = mysql.createConnection({
	host: 'trendzbeauty-cluster-1.cluster-ro-cqvzsqc8lyno.ap-south-1.rds.amazonaws.com',
	user: 'tredzdb',
	password: 'Digitalrupay',
	database: 'shapes',
	port: 3306,
	multipleStatements: true
});

connectionReader.connect(function (err) {
    if (!err) {
        console.log("Reader Database is connected ... ");
    } else {
        console.log("Error connecting Reader database ... " + err);
    }
});

connectionWriter.connect(function (err) {
    if (!err) {
        console.log("Writer Database is connected ... ");
    } else {
        console.log("Error connecting Writer database ... " + err);
    }
});

module.exports = {
    connectionWriter:connectionWriter,
    connectionReader:connectionReader
};
