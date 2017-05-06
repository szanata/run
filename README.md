### Run

A simple es6 generator based control flow, or simple generator runner

**All credits go to:
[Kyle Simpson](https://github.com/getify)
and
[Benjamin Gruenbaum](https://github.com/benjamingr)**

I just isolated this function, made small flavor changes and created a npm package.

#### Install:

`npm install simplerunner`

#### Usage:

```js
var run = require('simplerunner'); // import

run(function *() { // generator function
  
  var value = yield asyncFunction();
  
  var anotherValue = yield anotherAsyncFunction();
  
});
```

So each yielded function will stop the code until it resolves making async calls run on a more readable way, avoiding the callback hell.

**Important: All yielded functions must return a promise**

Like this:
```js
function asyncFunction() {
  return new Promise((resolve, reject) => {
    
    request('http://google.com', (err, response, body) => {
      if (err) {
        return reject();
      }
      resolve(body);
    });
  });
}
```

Errors can be intercepted both with try catch, or with .catch promise method:

```js
run(function *() { // generator function
  
  try {
    var value = yield asyncFunction();
  } catch (e) {
    /* catches any error threw with using reject */
  }
  
});

/* OR */
run(function *() { // generator function
  
  var value = yield asyncFunction();
  
}).catch(e => {
  /* something */
});
```
