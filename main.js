/*
SETUP

You're working with an intern that keeps coming to you with JavaScript code that won't run because the braces, brackets, and parentheses are off. To save you both some time, you decide to write a braces/brackets/parentheses validator.
Let's say:

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

We can do this in O(n)O(n) time and space. One iteration is all we need!

Breakdown
We can use a greedy ↴ approach to walk through our string character by character, making sure the string validates "so far" until we reach the end.

What do we do when we find an opener or closer?

Well, we'll need to keep track of our openers so that we can confirm they get closed properly. What data structure should we use to store them? When choosing a data structure, we should start by deciding on the properties we want. In this case, we should figure out how we will want to retrieve our openers from the data structure! So next we need to know: what will we do when we find a closer?

Suppose we're in the middle of walking through our string, and we find our first closer:

  [ { ( ) ] . . . .
      ^
How do we know whether or not that closer in that position is valid?

A closer is valid if and only if it's the closer for the most recently seen, unclosed opener. In this case, '(' was seen most recently, so we know our closing ')' is valid.

So we want to store our openers in such a way that we can get the most recently added one quickly, and we can remove the most recently added one quickly (when it gets closed). Does this sound familiar?

What we need is a stack ↴ !

Solution
We iterate through our string, making sure that:

each closer corresponds to the most recently seen, unclosed opener
every opener and closer is in a pair
We use a stack ↴ to keep track of the most recently seen, unclosed opener. And if the stack is ever empty when we come to a closer, we know that closer doesn't have an opener.

So as we iterate:

If we see an opener, we push it onto the stack.
If we see a closer, we check to see if it is the closer for the opener at the top of the stack. If it is, we pop from the stack. If it isn't, or if the stack is empty, we return False.
If we finish iterating and our stack is empty, we know every opener was properly closed.

  def is_valid(code):
    openers_to_closers_map = {
        '(' : ')',
        '{' : '}',
        '[' : ']'
    }

    openers = openers_to_closers_map.keys()
    closers = openers_to_closers_map.values()

    openers_stack = []

    for char in code:
        if char in openers:
            openers_stack.append(char)
        elif char in closers:
            if not openers_stack:
                return False
            else:
                last_unclosed_opener = openers_stack.pop()
                # if this closer doesn't correspond to the most recently
                # seen unclosed opener, short-circuit, returning false
                if not openers_to_closers_map[last_unclosed_opener] == char:
                    return False

    return openers_stack == []
Complexity
O(n)O(n) time (one iteration through the string), and O(n)O(n) space (in the worst case, all of our characters are openers, so we push them all onto the stack).

Bonus
In Ruby, sometimes expressions are surrounded by vertical bars, "|like this|". Extend your validator to validate vertical bars. Careful: there's no difference between the "opener" and "closer" in this case—they're the same character!


*/
//we're only concerned about checking that the a closer comes after an opener!

let checkBracket = (code) => {
//function checkBracket(code) {
  var openers_to_closers = {
    '(': ')',
    '{': '}',
    '[': ']'
  };

  var openers = Object.keys(openers_to_closers);

  var closers = Object.keys(openers_to_closers).map(function (key) {
    return openers_to_closers[key];
	});

  var openers_stack = [];

  //console.log(code[code.length -1]);

  // Iterate over our input param
  for( char of code) {

    // Checking the opener array [ (,{,[ ]
  	for( let i of openers) {

      // If the char is an opener
      if(char == i) {
        // Insert it into the open_stack array
        openers_stack.push(char);
      }
    }

  	//checking the closer array [ ),},] ]
    for( let i of closers) {

      // if the char is a closer...
      if(char == i) {
        console.log('i123 '+ i)
        // If You have a closer but no openers
        if(openers_stack.length == 0) {

          	console.log("There aren't any " + openers + " in your program");
            return false;

        }else {

          // check if the current char is a closer for the last opener in the open_stack array
          for( let i of openers_stack) {
             console.log('i '+i)
            console.log('openers_stack ' + openers_stack)
						console.log('openers_to_closers[i] ' + openers_to_closers[i])
            // if this Object keys(i) value is equal to char, we want to remove it from the array
            //
            // HERES THE PROBLEM
            // its checking the closer to the opener, but it's failing out before checking ALL of the possible openers
            // I need to loop through this list and check the char against each one.
            // do I use a forEach or a for..in or for..of

            for(a of as) {
            if(i == char) {

							console.log('it does '+ char);
              // Setting this var to the last opener in the array
              let last_unclosed_opener = openers_stack.pop();

              if (!openers_to_closers[last_unclosed_opener] == char) {

                	console.log('your code sucks ' + char )
                  return false
              }

             // If there is no opener that matches the same style closer
            } else {
              console.log('no opener for your closer');
              return false;
            }
            }

            if(openers_to_closers[i] == char) {

							console.log('it does '+ char);
              // Setting this var to the last opener in the array
              let last_unclosed_opener = openers_stack.pop();

              if (!openers_to_closers[last_unclosed_opener] == char) {

                	console.log('your code sucks ' + char )
                  return false
              }

             // If there is no opener that matches the same style closer
            } else {
              console.log('no opener for your closer');
              return false;
            }
          }
      	}
      }
    }
  }
 	console.log(openers_stack.length == []);
  return openers_stack.length == [];
}

checkBracket('({}])');
