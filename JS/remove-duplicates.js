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

/*** Remove dups for arrays ***/
function removeDuplicate(arr) {
    var outArr = [];

    for(var i = 0; i < arr.length; i++) {

      // if the number ISN'T already there
      if(outArr.indexOf(arr[i]) === -1) {
        // put the new number into the final array
          outArr.push(arr[i]);
      }
    }

    // now use the sort method
    outArr.sort( function(a,b) {
      // use a comparator or else it will return numbers lexicographically [1,11,2,245,3]
      return a - b;
    });
console.log(outArr);
    return outArr;

}

removeDuplicate([1,3,324,3,11,5,6,2,2,3,7,8,1]); // [1, 2, 3, 5, 6, 7, 8, 11, 324]
