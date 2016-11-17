"use strict";

var fs = require('fs');
var db = require('../DatabaseManager.js');
var log = require('../log.js')

var possibleTypes = JSON.parse(fs.readFileSync('SQLDatatypes.json', 'utf8')) 
var defaults = JSON.parse(fs.readFileSync('defaultTables.json', 'utf8')) 

function createTable(tableName, fields) { //TODO: make this more intelligent to match changes to defaultTables.json
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

	var q = new db.DatabaseManager();
	q.query(queryString);
}

exports.setupDatabase = function(){ 
	for (var prop in defaults){
		createTable(defaults[prop]["tablename"], defaults[prop]["fields"]);
		log.info("Table " + defaults[prop]["tablename"] + " created!")
	}
}