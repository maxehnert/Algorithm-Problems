/**
 * Problem - Find the first word in the array when the alphabetical order restarts
 *
 * Notes
 * In Javascript strings are compared in alphabetical order
 * Preform a binary search
 *
 **/
// const words = [
//     'ptolemaic',
//     'retrograde',
//     'supplant',
//     'undulate',
//     'xenoepist',
//     'yweewr',
//     'yyyyy',
//     'zasd',
//     'asymptote',
//     'babka',
//     'banoffee',
//     'engender',
//     'karpatka',
//     'othellolagkage',
// ];

const findRotationPoint = (words) => {
  const firstWord = words[0];

  var beginIndex = 0;
  var endIndex = words.length - 1;

  while (beginIndex < endIndex) {

      //  halfway point between beginIndex and endIndex
      var guessIndex = Math.floor(beginIndex + ((endIndex - beginIndex) / 2));

      // if guess comes after first word
      if (words[guessIndex] > firstWord) {
          // go right
          beginIndex = guessIndex;
      } else {
          // go left
          endIndex = guessIndex;
      }

      // if beginIndex and endIndex are equal
      if (beginIndex + 1 === endIndex) {
          // between beginIndex and endIndex is where we flipped to the beginning
          // so endIndex is alphabetically first
          break;
      }
  }

  console.log(words[endIndex]);
  return words[endIndex];
}

module.exports = findRotationPoint

// findRotationPoint(words)
