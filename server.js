// import built-in Node package
var http = require('http');

// import express and init server using express()
var express = require('express');
var server = express();

var port = 4000;

server.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.get("/json", function(req, res) {
    res.send(JSON.stringify({ name: "Lenny"}));
});

server.listen(port, function () { // Callback function
    console.log("Starting server at " + port);
});