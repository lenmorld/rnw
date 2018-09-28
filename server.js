// import built-in Node package
var http = require('http');
var path = require ('path');
var body_parser = require('body-parser');
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

    server.use(body_parser.json());
    server.use(body_parser.urlencoded( { extended: true } ));

    server.get("/", function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    // fetch all
    server.get("/list", function(req, res) {
        res.send(json_data['list']);
    });

    // fetch one
    server.get("/list/:id", function(req, res) {
        console.log(`GET Item ID ${req.params.id}`);

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

    // CREATE
    server.post("/list", function(req, res) {
        console.log(`Create item with details: ${JSON.stringify(req.body)}`);

        // TODO: add item to file
        // sample response: return request body
        res.send(JSON.stringify({ "created": req.body}));
    });

    // UPDATE
    server.put("/list/:id", function(req, res) {
        console.log(`Edit item with id: ${req.params.id}, change to ${JSON.stringify(req.body)}`);

        // TODO: update item in file
        // sample response: return request body
        res.send(JSON.stringify({ "updated": req.body }));
    });

    // DELETE
    server.delete("/list/:id", function(req, res) {
        console.log(`Delete item with id: ${req.params.id}`);

        // TODO: delete item in file
        // sample response: return request param id
        res.send(JSON.stringify({ "deleted": req.params.id}));
    });


    server.get("/json", function(req, res) {
        res.send(JSON.stringify({ name: "Lenny"}));
    });

    server.listen(port, function () { // Callback function
        console.log("Starting server at " + port);
    });
}
