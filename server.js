// import built-in Node package
var http = require('http');
var path = require ('path');
var body_parser = require('body-parser');
// import modules we created
var mongo_db = require('./server/mongo_db');
var spotify = require('./api/spotify');

// import express and init server using express()
var express = require('express');
var server = express();

// set the view engine to ejs
server.set('view engine', 'ejs');

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
    // db_collection.find().toArray(function(err, result) {
    //     console.log({ "list": result});
    // });

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

    // other pages
    // track details page
    server.get('/track/:id', function(req, res) {
        var track_id = req.params.id;
        console.log(`[SPOTIFY] : fetching track ${track_id}...`);
        
        spotify.fetch_track(track_id).then(function(track) {
            console.log("==== TRACK ====");
            // console.log(JSON.stringify(track, null, 4));

            // render page using ejs, passing some data
            res.render(__dirname + '/track.ejs', {
                track_id: track_id,
                track: JSON.stringify(track)
            });
        });
    });


    // fetch all
    server.get("/list", function(req, res) {
        // res.send(json_data['list']);
        db_collection.find().toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    // fetch one
    server.get("/list/:id", function(req, res) {
        console.log(`GET Item ID ${req.params.id}`);

        var item_id = req.params.id;
        db_collection.findOne({ id: item_id }, function(err, result) {
            res.send(result);
        });
    });

    // CREATE
    server.post("/list", function(req, res) {
        console.log(`Create item with details: ${JSON.stringify(req.body)}`);

        // get item data from req.body
        var item = req.body;
    
        db_collection.insertOne(item, function(err, result) {
            if (err) throw err;
            // send back entire updated list, to make sure frontend data is up-to-date
            db_collection.find().toArray(function(_err, _result) {
                if (_err) throw _err;
                res.send(_result);
            });
        });
    });

    // UPDATE
    server.put("/list/:id", function(req, res) {
        console.log(`Edit item with id: ${req.params.id}, change to ${JSON.stringify(req.body)}`);

        // get item id from req.params, and data from req.body
        var item_id = req.params.id;
        var item = req.body;

        db_collection.updateOne({ id: item_id }, { $set: item }, function(err, result) {
            if (err) throw err;
            // send back entire updated list, to make sure frontend data is up-to-date
            db_collection.find().toArray(function(_err, _result) {
                if (_err) throw _err;
                res.send(_result);
            });
        });
    });

    // DELETE
    server.delete("/list/:id", function(req, res) {
        console.log(`Delete item with id: ${req.params.id}`);

        var item_id = req.params.id;

        db_collection.deleteOne({ id: item_id }, function(err, result) {
            if (err) throw err;
            // send back entire updated list, to make sure frontend data is up-to-date
            db_collection.find().toArray(function(_err, _result) {
                if (_err) throw _err;
                res.send(_result);
            });
        });
    });


    server.get("/json", function(req, res) {
        res.send(JSON.stringify({ name: "Lenny"}));
    });

    // include SPOTIFY API routes
    spotify.spotify_routes(server, db_collection);

    server.listen(port, function () { // Callback function
        console.log("Starting server at " + port);
    });
}
