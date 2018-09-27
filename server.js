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

    // fetch all
    server.get("/list", function(req, res) {
        res.send(json_data['list']);
    });

    // fetch one
    server.get("/list/:id", function(req, res) {
        console.log(req.params);

        var list = json_data["list"];
        var matches = list.filter(function(item) {
            return item.id === req.params.id;
        });

        if (matches && matches.length) {
            res.send(matches[0]);     // there should only be one matching
        } else {
            res.status(404);    // Not Found
            res.send( { "error": `Item with ID ${req.params.id} not found` });
        }
    });

    server.get("/json", function(req, res) {
        res.send(JSON.stringify({ name: "Lenny"}));
    });

    server.listen(port, function () { // Callback function
        console.log("Starting server at " + port);
    });
}
