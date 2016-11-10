"use strict"

var fs = require('fs');

var config =  JSON.parse(fs.readFileSync('database.json', 'utf8'));

var loggingShouldOccur = true; // switch to config["logging"] when working

exports.log = function(logString) {
	var currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	var logThis = currentTime + " :" + logString;
	if (loggingShouldOccur)
		writeToFile(logThis);

}

exports.warn = function(logString) {
	var currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	var logThis = currentTime + " WARNING: " + logString;
	if (loggingShouldOccur)
		writeToFile(logThis);

}

exports.error = function(logString) {
	var currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	var logThis = currentTime + " ERROR: " + logString;
	if (loggingShouldOccur)
		writeToFile(logThis);

}

function writeToFile(logString) {
	var currentdate = new Date().toISOString();
	var currentdate = currentdate.slice(0, currentdate.indexOf('T'));
	var logFileName = "logs/" + currentdate + ".txt";
	var correctedString = logString + "\n";
	fs.open(logFileName, "a", function(err, fd) {
		if (err){
			fs.writeFile(logFileName, correctedString, {"flag": "wx"}, function(err){
				console.log(err);
			});
			return;
		}

		fs.write(fd, correctedString, function(err) {
			if (err)
				console.log(err);
		});

		fs.close(fd, function(err){
			console.log(err);
		});
	});

}