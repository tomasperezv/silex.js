# silex.js
A Node.js framework for building RESTful API's inspired by PHP's Silex.

```javascript
var SilexJS = require('silex.js');

/**
 * @route /user/{id}
 */
SilexJS.App.get('/user/{id}', function (request, model) {

  var user = model.getUser(request.GET.id);
  if (user === null) {
    return [error, Silex.HTTP.404];
  } else {
    return user;
  }

});

SilexJS.run();
```
