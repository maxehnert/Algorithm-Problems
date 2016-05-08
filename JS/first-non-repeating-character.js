/*
 * Find the first no repeating character in a string
*/

let noRepeat = str => {

  /*
   * Make all the letters lower case to avoid any of that.
   * Split the string into individual characters
  */
  var str = str.toLowerCase().split(''); //['a','b','c'];
  var lastChar = '';
  // Iterate over the array of characters
  for ( let char of str ) {
    // Set the first char to our comparator
    if (!lastChar) {
      lastChar = char;
    }
    while(lastChar) {
      /*
       * As long as the last character stays the same do nothing
       * Skip blank spaces.
      */
      if( lastChar == char || char == ' ' ) {
        break;
      } else {
        return console.log('this 1 different '+ char);
      }

    };
  };
};

noRepeat('aa aaAb');
