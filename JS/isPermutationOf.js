/**
Determines if leftString is a permutation (rearrangement of characters) of the rightString. If so, return true; otherwise return false.

Example

For leftString = "abc" and rightString = "bca", the output should be
IsPermutationOf(leftString, rightString) = true.
*/

const IsPermutationOf = (leftString, rightString) => {
    if (leftString.length !== rightString.length) return false

    var obj = {};
    var len = leftString.length;
    var letter;

    // Loop over the first string and add each letter to obj and increment count
    for (var i = 0; i < len; i++) {
        letter = leftString[i];
        obj[letter] = obj[letter] || 0;
        obj[letter]++;
    }

    // Loop over second object and decrement the count until no more left, then delete that property from the obj
    for (var j = 0; j < len; j++) {
        letter = rightString[j];
        if (obj[letter]) {
            if (obj[letter] > 1) obj[letter]--
            else delete obj[letter]
        }
    }

    // If the strings are permutations of one another the object should have no properties left
    if (Object.keys(obj).length === 0) return true
    else return false
}

IsPermutationOf("abc", "bca") // true
IsPermutationOf("abc", "def") // false
IsPermutationOf("alphabet", "tpaealhb") // true
IsPermutationOf("abccbab", "aabbcc") // false
IsPermutationOf("bCbD", "BEac") // false
IsPermutationOf("abc", "abcd") // false
IsPermutationOf("pineapple", "enpielapp") // true


// Alternative method which is less readable but insteads splits the string, sorts it, then compares them
const splitMapString = (str) => {
  // [...str] splits the string and is now an array
  // .sort() sorts lexicographically

  // + splitMapString converts the array back into a string
  // can also be done with + 0, or [...str].sort().join('').toString()
   return [...str].sort() + splitMapString
}

const IsPermutationOf = (leftString, rightString) => {
  return splitMapString(leftString) == splitMapString(rightString)
}
