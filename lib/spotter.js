var Promise = require('bluebird');
var async = require('async');
var csv = require('fast-csv');
var fs = require('fs');
var head = require('../lib/head.js');

var spotter = Promise.method(function (csvFile, column) {
  return new Promise(function (resolve, reject) {
    async.waterfall([
      function (callback) {
        var records = [];
        csv
          .fromPath(csvFile, {headers: true})
          .on('data', function(record) {
            records.push(record);
          })
          .on('end', function() {
            callback(null, records);
          });
      },
      function (data, callback) {
        var pace = require('pace')(data.length);
        head(data, column, pace).then(function(records) {
          console.log(records);
          callback(null, records);
        })
      }
    ], function (err, result) {
      console.log('Writing CSV file...');
      var ws = fs.createWriteStream(csvFile);
      csv.write(result, { headers: true} ).pipe(ws);
    });
  });
});

module.exports = spotter;