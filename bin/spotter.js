#! /usr/bin/env node
var program = require('commander');
var Promise = require('bluebird');
var async = require('async');
var csv = require('fast-csv');
var fs = require('fs');
var spotter = require('../lib/spotter.js');

program
  .version('0.1.0')
  .option('-c, --column <value>', 'The column that needs to be parsed.')
  .option('-p, --progress [boolean]', 'Show progress bar or not.')
  .action(function (csvFile) {;
    var column = (program.column == undefined) ? null : program.column;
    var progress = (program.progress == undefined) ? false : program.progress;
    console.log("Fetching HTTP response codes for column '%s' in %s...", column, csvFile);
    Promise.method(function (csvFile, column) {
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
            var opts = { pace: progress };
            spotter(data, column, opts).then(function(records) {
              callback(null, records);
            })
          }
        ], function (err, result) {
          console.log('Writing %s records to CSV file...', result.length);
          var ws = fs.createWriteStream(csvFile);
          csv.write(result, { headers: true} ).pipe(ws);
        });
      });
    })(csvFile, column);
  });

program.parse(process.argv);
