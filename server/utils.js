var fs = require('fs');

exports.readJSON = function(path, callback) {
    fs.readFile(path, function(err, data) {
        if (err) {
            throw err;
        } else {
            callback(JSON.parse(data));
        }
    });
}