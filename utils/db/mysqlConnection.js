var mysql = require('mysql');

const connectionWriter = mysql.createConnection({
	host: '172.31.21.157',
	user: 'root',
	password: 'Digitalrupay',
	database: 'shapes_new',
	port: 3306
});

const connectionReader = mysql.createConnection({
	host: '172.31.21.157',
	user: 'root',
	password: 'Digitalrupay',
	database: 'shapes_new',
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
