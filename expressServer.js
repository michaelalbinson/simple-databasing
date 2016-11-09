"use strict";
var express = require('express');
const PORT = 8080;
var server = express();

server.get('/', function(request, response) {
	response.send("<h1>Hello World</h1>");
});

server.get('/goodbye', function(request, response) {
	response.send('<h2>Goodbye World :(</h2>');
});

server.get('/search', function(request, response) {
	response.send('<h2>This would be our search page</h2>');
});

server.get('/question', function(request, response) {
	response.send('<h2>This could be a post page</h2><br><h3>' + request.url + "</h3>");
});

server.get('/about', function(request, response) {
	response.send('<h2>Our about page</h2><br><h3>' + request.url + "</h3>");
})

server.listen(PORT);
console.log("Listening on port " + PORT.toString());