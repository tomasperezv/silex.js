# silex.js
A Node.js framework for building RESTful API's inspired by PHP's Silex.

```javascript
var SilexJS = require('silex.js');

/**
 * @route /user/{id}
 */
SilexJS.App.get('/user/{id}', function (request, model) {

  var user = model.getUser(request.id);
  if (user === null) {
    return ['User not found', SilexJS.HTTP.NOT_FOUND];
  } else {
    return [user, SilexJS.HTTP.OK];
  }

});

SilexJS.start();
```

Controller methods also support promises to handle asynchronous operations

```javascript
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

```
