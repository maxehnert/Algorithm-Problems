/*
 * Given a string of lower case characters remove any duplicates and
 * return the string in lexicographical order
*/

let removeDups = (str) => {

  // split each letter into an array and sort lexicographically
  str = str.split('').sort();
  var tempLetter;
  var i = str.length;

  /* Iterate backwards over the array
   * Do it backwords so you don't lose your place when removing elements from the array
  */
  while( i-- ) {

    // Set our letter check for the first character 
    if( !tempLetter ) {
      tempLetter = str[i];
      continue;
    }

    // If we get a duplicate remove it
    if( tempLetter === str[i] ) {
      str.splice(i,1);
    } else {
      tempLetter = str[i];
    }
  };

  return str;
}

removeDups('cbacdcbc');
