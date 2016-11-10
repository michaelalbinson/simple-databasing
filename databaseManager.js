"use strict";

var mysql = require('mysql');
var fs = require('fs');
var time = require('time');

var databaseInformation = JSON.parse(fs.readFileSync('database.json', 'utf8')) 

exports.DatabaseManager = function() {
	var pool = mysql.createPool({
		host: databaseInformation['host'],
		user: databaseInformation['user'],
		password: databaseInformation['password'],
		database: databaseInformation['database'],
		connectionLimit: 50
	});

	this.query = function(queryString) {
		var rows;
		pool.getConnection(function(err, connection){
			if (err){
				console.error(err.message);
				console.error("ERROR: The database has experinced an error at " + new time.Date());
			}

			connection.query(queryString);
			connection.release();
		});
	}

}