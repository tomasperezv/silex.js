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

  var promise = new Promise(function(resolve, reject) {
    var fs = require('fs');
    fs.readdir('.', function(err, files) {
      if (!err) {
        resolve(files);
      } else {
        reject('file read operation failed');
      }
    });
  });

  return promise;

});


SilexJS.start();
