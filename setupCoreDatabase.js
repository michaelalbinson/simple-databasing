"use strict";

var fs = require('fs');
var db = require('./databaseActions.js');

var possibleTypes = JSON.parse(fs.readFileSync('SQLDatatypes.json', 'utf8')) 

function createTable(tableName, fields) { //table name is a string, fields is a JSON object containing key value pairs of the desired fields
	var keyCount = 0;
	var queryString = 'CREATE TABLE ' + tableName + ' (';

	for (var prop in fields) {
		if(keyCount < Object.keys(fields).length-1) {
			queryString += prop + ' ' + possibleTypes[fields[prop]] + ', ';
			keyCount++;
		}
		else
			queryString += prop + ' ' + possibleTypes[fields[prop]] + ')';
	}

	console.log(queryString);
	var q = new db.DatabaseQuery(queryString);
	q.query();
}

var defaults = JSON.parse(fs.readFileSync('defaultTables.json', 'utf8')) 

for (var prop in defaults){
	console.log(defaults[prop]["tablename"])
	console.log(defaults[prop]["fields"])
	createTable(defaults[prop]["tablename"], defaults[prop]["fields"]);
}