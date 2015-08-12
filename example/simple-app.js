var SilexJS = require('../lib/silex.js');

/**
 * @route /hello/{name}
 */
SilexJS.App.get('/hello/{name}', function (request) {

  var data = {
    'message': 'Hello ' + request.GET.name + '!'
  };

  return [data, SilexJS.HTTP.OK];

});

SilexJS.start();
