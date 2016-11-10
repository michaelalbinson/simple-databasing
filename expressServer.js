"use strict";
var express = require('express');

const PORT = 8080;

var server = express();

/*AUTHENTICATION -- NEED COOKIES*/
// https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions
// this looks super promising

server.get('/', function(request, response) {
	response.send('<h2>This would be our landing page</h2><br><input type="text" placeholder="type your question">');
});

server.get('/goodbye', function(request, response) {
	response.send('<h2>Goodbye World :(</h2>');
});

server.get('/search', function(request, response) {
	response.send('<h2>This would be our search page</h2><br><input type="text" placeholder="type your question">');
});

server.get('/question/id=\*', function(request, response) {
	response.send('<h2>This could be a post page</h2><br><h2>Question</h2><h4>comment</h4><h4>commment</h4><h3>' + request.url + "</h3>");
});

server.get('/question/letsfind?\*', function(request, response) {
	response.send('<h2>This could be a post page</h2><br><h2>Question</h2><h4>comment</h4><h4>commment</h4><h3>' + request.url + "</h3>");
});

server.get('/about', function(request, response) {
	response.send('<h2>Our about page</h2><br><h3>' + request.url + "</h3>");
})

server.get('/new', function(request, response) {
	response.send('<h2>A new post</h2><form><h3>Question</h3><input type="text"><br><h3>Tags</h3><input type="text"><br><br><input type="button" value="Submit"></form><h3>' + request.url + "</h3>");
})

server.get('/list', function(request, response) { //return the a default most recent list of questions
	response.send('<h2>List view of questions</h2><br><h4>listItem</h4><br><h4>listItem</h4><br><h4>listItem</h4><br><h3>' + request.url + "</h3>");
})

server.get('/list/filter?\*', function(request, response) { //return the list filtered by the passed parameters
	response.send('<h2>List view of questions</h2><br><h4>listItem</h4><br><h4>listItem</h4><br><h4>listItem</h4><br><h3>' + request.url + "</h3>");
})

server.get('/user', function(request, response) {
	response.send('<h2>Home Page for the user currently logged in</h2><h3>' + request.url + "</h3>");
})

server.listen(PORT);
console.log("Listening on port " + PORT.toString());