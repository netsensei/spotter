var Promise = require("bluebird");
var _ = require('underscore');
var rp = require('request-promise');

var head = Promise.method(function (data, property, pace) {
  return new Promise(function (resolve, reject) {
    console.log('Parsing objects...');
    var parsedObjects = [];

    var current = Promise.fulfilled();
    Promise.all(data.map(function(object) {
      current = current.then(function() {
        return rp.head({uri: object[property], resolveWithFullResponse: true})
          .then(function (response) {
            object.response = response.statusCode;
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

module.exports = head;
