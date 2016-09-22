/*

'(', '{', '[' are called "openers."
')', '}', ']' are called "closers."

Write an efficient function that tells us whether or not an input string's openers and closers are properly nested.

Examples:

"{ [ ] ( ) }" should return True
"{ [ ( ] ) }" should return False
"{ [ }" should return False
Gotchas
Simply making sure each opener has a corresponding closer is not enough—we must also confirm that they are correctly ordered.

For example, "{ [ ( ] ) }" should return False, even though each opener can be matched to a closer.

Solution
We iterate through our string, making sure that:

each closer corresponds to the most recently seen, unclosed opener
every opener and closer is in a pair
We use a stack ↴ to keep track of the most recently seen, unclosed opener. And if the stack is ever empty when we come to a closer, we know that closer doesn't have an opener.

So as we iterate:

If we see an opener, we push it onto the stack.
If we see a closer, we check to see if it is the closer for the opener at the top of the stack. If it is, we pop from the stack. If it isn't, or if the stack is empty, we return False.
If we finish iterating and our stack is empty, we know every opener was properly closed.


Complexity
O(n)O(n) time (one iteration through the string), and O(n)O(n) space (in the worst case, all of our characters are openers, so we push them all onto the stack).

*/

/*
** Update to the checkBracket function
*/

let checkBracket = code => {

  // map over the array of brackets to check
  return arr.map((code) => {

    // Instead of creating an object, I'll take advantage of ES6's new Map feature
    let openers_to_closers = new Map();

    // Add the openers and closers to the Map
    openers_to_closers.set('(',')');
    openers_to_closers.set('{','}');
    openers_to_closers.set('[',']');

    let openers = [];
    let closers = [];
    let openers_stack = [];

    // Build out our openers and closers array with values from the Map
    let logMap = (value, key, map) => {
      openers.push(key);
      closers.push(value);
    };

    // Callback to run the above function
    openers_to_closers.forEach(logMap);

    // Iterate over our input param
    for ( var char of code ) {

      // Checking the opener array [ (,{,[ ]
      for ( let i of openers ) {

        // If the char is an opener
        if ( char == i ) {
          // Insert it into the open_stack array
          openers_stack.push(char);
        }
      }

    	//checking the closer array [ ),},] ]
      for ( let i of closers ) {

        // if the char is a closer...
        if ( char == i ) {

          // If You have a closer but no openers
          if ( openers_stack.length == 0 ) {

            console.log( "There aren't any " + openers + " in your program" );
            return false;

          } else {

            // check if the current char is a closer for the last opener in the open_stack array
            for ( let i of openers_stack ) {

              // Grab the last opener in the array
              let checkem = openers_stack[openers_stack.length - 1];

  							 // If the closer for the last opener matches the current char..
                 // Note the use of .get() here is because openers_to_closers is a Map not an object
                if ( openers_to_closers.get(checkem) == char ) {

                // Setting this var to the last opener in the array
                let last_unclosed_opener = openers_stack.pop();

                // Note the use of .get() here is because openers_to_closers is a Map not an object
                if ( !openers_to_closers.get(last_unclosed_opener) == char ) {

                  console.log( 'your code sucks ' + char )
                  return false
                }
                // Escape the loop after removing that last char from the openers stack
                break;

               // If there is no opener that matches the same style closer
              } else {
                console.log( 'no opener for your closer ' + char) ;
                return false;
              }
            }
        	}
        }
      }
    }

    console.log( openers_stack.length == [] );
    // return openers_stack.length == [];
    return openers_stack.length == [];
  })
}

// checkBracket('({}{[]}({}))'); // true;
// checkBracket('({}{[]]}())'); // false
// //                  ^ error

checkBracket(
  [
  '({}{[]}({}))', // YES
  '({}{[]]}())' // NO
  ]
)
