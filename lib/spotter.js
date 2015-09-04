var Promise = require("bluebird");
var _ = require('underscore');
var rp = require('request-promise');

var spotter = Promise.method(function (data, property) {
  return new Promise(function (resolve, reject) {
    console.log('Parsing objects...');
    var parsedObjects = [];
    var pace = require('pace')(data.length);

    var current = Promise.fulfilled();
    Promise.all(data.map(function(object) {
      current = current.then(function() {
        return rp.head({uri: object[property], resolveWithFullResponse: true})
          .then(function (response) {
            object.response = response.statusCode;
            pace.op();
            return object;
          }).catch(function (error) {
          // Handle error
        });
      });
      return current;
    })).then(function(results) {
      console.log('%s parsed objects', results.length);
      resolve(results)
    });
  });
});

module.exports = spotter;
