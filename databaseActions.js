"use strict"

var mysql = require('mysql');
var fs = require('fs');

var databaseInformation = JSON.parse(fs.readFileSync('database.json', 'utf8')) 

exports.DatabaseQuery = function(queryString) { //if you want to use the result of the query you MUST use a promise
	var _queryString = queryString; 
	var connection = mysql.createConnection({
		host: databaseInformation['host'],
		user: databaseInformation['user'],
		password: databaseInformation['password'],
		database: databaseInformation['database']
	});

	this.result;

	this.query = function(){
		connection.connect(function(err){
			if(!err)
				console.log("Database is connected!");
			else
				console.error("Error connecting to the database!");
		});

		var rows  = connection.query(_queryString, function(err, rows, fields){
			if (err){
				console.warn("Error in query");
				console.warn(err.message);
				return undefined;
			}

			this.result = rows;
		});

		connection.end();
	}

}

/** DBRow
 ** This object is capable of querying the database to retrieve a row, or multiple rows, from the database
 ** The retrieved row(s) cannot be directly accessed, you must use obj.getValue
 ** If using the query() method you MUST use promises to make sure you have the row(s) before continuing
 ** If using the update() or insert() functionalities, promises do not need to be used
**/
exports.DBRow = function(table) {
	var table;
	var queryString =  "SELECT * FROM " + table + ' ';
	var specificQueries;
	var row = undefined;

	this.getRow = function(systemId) { //use a system id to get a row from a table immediately
		queryString += "WHERE id= " + systemId;

	}

	this.query = function() { //queries the database, will set this.row to the retrieved row, YOU MUST USE PROMISES for this

	}

	this.addQuery = function(property, value) { // with three arguments it will be interpreted as operator (OR, AND) property, value
		if (!specificQueries)
			specificQueries = 'WHERE ' + property +  '=' + value;
	}

	this.getValue = function(property) { //get the value of a column for the row
		return row[property];
	}

	this.setValue = function(property, value) {

	}

	this.update = function() {

	}

	this.insert = function() {

	}
}