var SilexJS = require('../lib/silex.js');

/**
 * @route /hello/{name}
 */
SilexJS.App.get('/hello/{name,a}', function (request) {

  var data = {
    'message': 'Hello ' + request.name + ' ' + request.a
  };

  return [data, SilexJS.HTTP.OK];

});

SilexJS.start();
