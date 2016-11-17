"use strict";

var log = require('./log');
var db = require('./DatabaseManager');

var dbm = new db.DatabaseManager();


/** DBRow
 ** This object is capable of querying the database to retrieve a row, or multiple rows, from the database
 ** The retrieved row(s) cannot be directly accessed, you must use obj.getValue
 ** If using the query() or getRow() methods you MUST use promises to make sure you have the row(s) before continuing
 ** If using the update() or insert() functionalities, promises do not need to be used
 ** table: The table name of the table the row you want to access is on
**/
exports.DBRow = function(table) {
	var specificQueries = "";
	var querySort = "";
	var setRows = "";
	var returnLimit = "";
	var currentIndex = -1;
	var rows = undefined;
	var currentRow = {}; // left as an empty object in case we are creating a new record

	if (!table){
		log.error("No table was specified for the DB row, all queries will fail!! Killing ");
		return
	}

	/** getRow(systemId)
	 ** systemID: the id of the row you want returned
	 **
	 ** getRow() gets the single row from the table specified by using the ID of the row
	 ** Promises are necesary to make sure the row object is set before you try to get or set values to it
	 ** Note: if a row does not match this ID, underfined will be returned
	**/
	this.getRow = function(systemId) { //use a system id to get a row from a table immediately
		var baseQuery =  "SELECT * FROM " + table + " ";
		return new Promise(function(resolve, reject) {
			dbm.query(baseQuery + "WHERE id=" + systemId).then(function(row){
				resolve(row);
				rows = row;
				currentRow = row[0];
			});
		});
	}

	/** query()
	 ** No input parameters
	 **
	 ** Queries the databse are sets the result to the rows variable
	 ** To access the rows, you must use the next() function to iterate
	**/
	this.query = function() { //queries the database, will set this.row to the retrieved row, YOU MUST USE PROMISES for this
		var baseQuery =  "SELECT * FROM " + table + " ";
		return new Promise(function(resolve, reject){
			dbm.query(baseQuery + specificQueries + querySort + returnLimit).then(function(row){
				resolve(row);
				rows = row;
				currentIndex = -1;
			});
		});
	}

	/** directQuery()
	 ** queryString: the 
	 **
	 ** Queries the databse are sets the result to the rows variable
	 ** To access the rows, you must use the next() function to iterate
	 **
	 ** THIS WILL BE DEPRECIATED AFTER SOME TIME: focus on using query() and building queryStrings 
	 ** This is super dangerous to ever expose to user input SO LET'S NEVER DO IT. Right gang? :D
	**/
	this.directQuery = function(_queryString) {
		return new Promise(function(resolve, reject){
			dbm.query(_queryString).then(function(row){
				resolve(row);
			});	
		});
	}

	/** addQuery(property, value)
	 ** 
	**/
	this.addQuery = function(property, value) { // with three arguments it will be interpreted as operator (OR, AND) property, value
		if (!specificQueries)
			specificQueries = "WHERE " + property +  "=" + value + " ";
		else
			specificQueries += "AND " + property + "=" + value + " ";
	}

	/** orderBy(field, ascOrDesc)
	 **
	**/
	this.orderBy = function(field, ascOrDesc){ 
		querySort = "ORDER BY " + field + " " + ascOrDesc;
	}

	/** getValue(property)
	 **
	**/
	this.getValue = function(property) { //get the value of a column for the row, can be undefined!
		return currentRow[property];
	}

	/** setValue(property, value)
	 **
	**/
	this.setValue = function(property, value) {
		if (currentRow[property] == undefined)
			return log.warn("Attempt to access nonexistant property in table " + table);

		currentRow[property] = value;
		if (!setRows)
			setRows = property + "=" + value;
		else
			setRows += "," + property + "=" + value;
	}

	/** update()
	 ** No input parameters
	**/
	this.update = function() { //iterate through property - value pairs, use old id as reference
		var baseQuery = "UPDATE " + table + "SET ";
	}

	/** insert()
	 ** No input parameters
	**/
	this.insert = function() { // iterate through property - value pairs
		var baseQuery = "INSERT INTO " + table + " VALUES "
	}

	/** count()
	 ** No input parameters
	 ** returns the number of records return
	**/
	this.count = function() {
		return rows.length;
	}

	/** count()
	 ** limit: the number of rows you would like returned
	 ** Sets the limit on the number of rows returned from the database
	**/
	this.setLimit = function(limit) {
		returnLimit = "LIMIT " + limit;
	}

	/** next()
	 ** No input parameters
	 ** Switches to the next row object
	**/
	this.next = function(){ // changes to the next row returned from the database 
		currentIndex++;
		if (rows[currentIndex])
			currentRow = rows[currentIndex];
			return true;
		else
			return false;
	}

	/** resetIndex()
	 ** No input parameters
	 ** resets the index of the row array to -1, like you just queried this set of rows!
	**/
	this.resetIndex = function() {
		currentIndex = -1;
	}

	/** delete()
	 ** No input parameters
	 ** DELETES the current row
	 ** There is no recovering the row once the delete goes through
	 ** it is STRONGLY discuraged to use this function 
	 ** deleting a row results in issues where other rows refer back to that row... and they need to be deleted too
	 ** thus, if you really want to delete a row you need to go through ALL tables and delete referring back to 
	 ** whatever row you delete (you can use the id of the row deleted here -- but make sure it gets done)
	**/
	this.delete = function(){ 
		var baseQuery = "DELETE FROM " + table + " WHERE id=" + row["id"];
	}
}