"use strict"

/**
 ** This is a snadboxing file I use for testing stuff, don't worry about it ;)
 ** unless of course you want to know what I'm up to
**/

var dbr = require('./util/DBRow');

var db = new dbr.DBRow("post");


db.getRow("id").then(function(row) {
	console.log(row);
})