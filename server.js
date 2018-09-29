// import built-in Node package
var http = require('http');
var path = require ('path');
var body_parser = require('body-parser');
// import modules we created
var mongo_db = require('./server/mongo_db');

// import express and init server using express()
var express = require('express');
var server = express();

var port = 4000;

// --- db connection ---
var db_connection_url = 'mongodb://user1:pass4321@ds251622.mlab.com:51622/spot_db';
// if local mongodb server
// var db_connection_url = "mongodb://localhost:27017/";
var db_name = "spot_db";
var db_collection_name = "items";
mongo_db.init_db(db_connection_url).then(function(db_instance) {
    var db_object = db_instance.db(db_name);       // get reference to "spot_db" database
    var db_collection = db_object.collection(db_collection_name);

    // TEST
    db_collection.find().toArray(function(err, result) {
        console.log({ "list": result});
        db_instance.close();
    });

    // run server and pass db collection reference for executing commands
    runServer(db_collection);
});
// we can init. more than one connection as needed


function runServer(db_collection) {
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
