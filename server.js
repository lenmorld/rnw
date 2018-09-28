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

// write list to file and send the response to client
function writeToFileAndSendResponse(updated_list, response) {
    var data_obj = {
        list: updated_list
    };

    // writeJSON returns updated list if successful
    utils.writeJSON(data_path, data_obj, function(json_data) {
        // callback function - send updated json_data to client    
        response.send(JSON.stringify(json_data));
    });
}

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

        // get item data from req.body
        var item = req.body;
        // copy list values, not reference, using ES6 spread operator
        var current_list_items = [...json_data.list];
        // add new item
        current_list_items.push(item);

        writeToFileAndSendResponse(current_list_items, res);
    });

    // UPDATE
    server.put("/list/:id", function(req, res) {
        console.log(`Edit item with id: ${req.params.id}, change to ${JSON.stringify(req.body)}`);

        // get item id from req.params, and data from req.body
        var item_id = req.params.id;
        var item = req.body;
        // copy by value, not by reference, using ES6 spread operator
        var current_list_items = [...json_data.list];
        // init new list that will hold new items
        var updated_list_items = [];
        /*
           loop through all items
           if old_item matches id of the updated one, replace it
           else keep old_item
       */
        current_list_items.forEach(function (old_item) {
            if (old_item.id === item_id) {
                updated_list_items.push(item);
            } else {
                updated_list_items.push(old_item);
            }
        });

        writeToFileAndSendResponse(updated_list_items, res);
    });

    // DELETE
    server.delete("/list/:id", function(req, res) {
        console.log(`Delete item with id: ${req.params.id}`);

        var item_id = req.params.id;
        // copy by value, not by reference, using ES6 spread operator
        var current_list_items = [...json_data.list]; 
        // filter list copy, by excluding item to delete
        var filtered_list = current_list_items.filter(function(item) {
            return item.id !== item_id;
        });

        writeToFileAndSendResponse(filtered_list, res);
    });


    server.get("/json", function(req, res) {
        res.send(JSON.stringify({ name: "Lenny"}));
    });

    server.listen(port, function () { // Callback function
        console.log("Starting server at " + port);
    });
}
