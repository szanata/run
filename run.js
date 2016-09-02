/**
* Code from https://github.com/yusufdoru/Sen-JavaScript-Bilmiyorsun/blob/master/async%20%26%20performance/ch4.md
* It was only slighty modified
* All credits go to https://github.com/corpulentcoffee
* And https://github.com/benjamingr?tab=repositories
*/

function run(gen) {
  
  var args = [].slice.call( arguments, 1), it;

  // initialize the generator in the current context
  it = gen.apply( this, args );

  // return a promise for the generator completing
  return Promise.resolve().then( function handleNext(value) {
    
    // run to the next yielded value
    var next = it.next( value );

    return ( function handleResult(next) {
      // generator has completed running?
      if (next.done) {
        return next.value;
      }
      
      // otherwise keep going
      return Promise.resolve( next.value ).then(
        // resume the async loop on
        // success, sending the resolved
        // value back into the generator
        handleNext,

        // if `value` is a rejected
        // promise, propagate error back
        // into the generator for its own
        // error handling
        function handleErr(err) {
          return Promise.resolve( it.throw( err ) ).then( handleResult );
        });
        
    })(next);
  });
}

module.exports = run;
