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

exports.writeJSON = function(path, json_data, callback) {
    // convert to string with 2 spacing levels for readability
    var json_string = JSON.stringify(json_data, null, 2);
    fs.writeFile(path, json_string, function(err) {
        if (err) {
            throw err;
        } else {
            // just return data passed if successful, so we don't have to re-read file again
            callback(json_data);
        }
    });
}

/*
    check if it exists first, before adding or deleting
    returns true or false
*/
exports.checkIfItemExist = function(item, db_collection) {
    return find_db_item = new Promise(function(resolve, reject) {
        db_collection.findOne({ id: item.id }, function(err, result) {
            if (err) reject(err);
             if (result && result.id === item.id) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}