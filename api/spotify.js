var axios = require('axios');
var qs = require('qs');

exports.spotify_routes = function(server, db_collection) {
    server.get('/spotify/search/:query', function(req, res) {
        console.log(`[SPOTIFY] : searching ${req.params.id}...`);
        // sample response for testing
        res.send({ search: req.params.query });
    });
}