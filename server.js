// import built-in Node package
var http = require('http');
var path = require ('path');
// import modules we created
var utils = require('./server/utils');

// import express and init server using express()
var express = require('express');
var server = express();

var port = 4000;

// __dirname is a Node global var for the current directory
var data_path = path.join(__dirname, 'server/data.json');
// read data from JSON file
utils.readJSON(data_path, runServer);

function runServer(json_data) {
    // serve folders that index.html needs
    // public is the webpack output folder
    server.use(express.static('public'));

    server.get("/", function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    server.get("/json", function(req, res) {
        res.send(JSON.stringify({ name: "Lenny"}));
    });

    server.listen(port, function () { // Callback function
        console.log("Starting server at " + port);
    });
}