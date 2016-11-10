"use strict"

var fs = require('fs');

var config =  JSON.parse(fs.readFileSync('database.json', 'utf8'));

exports.log = function(logString) {
	var currentTime = new Date();
	console.log(currentTime + ": " + logString);
	if (config["logging"])
		
}

exports.warn = function(logString) {
	var currentTime = new Date();
	console.log(currentTime + " WARNING: " + logString);
	if (config["logging"])

}

exports.error = function(logString) {
	var currentTime = new Date();
	console.log(currentTime + " ERROR: " + logString);
	if (config["logging"])

}

