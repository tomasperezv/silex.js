var SilexJS = require('../lib/silex.js');

/**
 * @route /hello/{name}
 */
SilexJS.App.get('/hello/{name,a}', function (request) {

  var data = {
    'message': 'Hello ' + request.name + ' ' + request.a
  };

  return [data, SilexJS.HTTPCode.OK];

});

/**
 * @route /async/
 */
SilexJS.App.get('/async/', function (request) {

  var Q = require('q');
  var fs = require('fs');

  var promise = Q.nfcall(fs.readdir, './lib/')
  .then(function(dir) {
    return [Q.nfcall(fs.readdir, './lib/core/'), dir];
  })
  .spread(function(finalDir, dir) {
    return [finalDir, dir];
  })
  .fail(function(err) {
    return err;
  });

  return promise;

});


SilexJS.start();
