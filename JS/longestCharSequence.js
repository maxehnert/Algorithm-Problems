/*
given a string write a function that returns the longest sequence of adjacent characters

hello world ->l
hello worlddd-> d
*/

const longestCharSeq = (str) => {
  let obj = {};
  let letter;
  let max = 0;
  let maxChar;
  let len = str.length;

  for (var i = 0; i < len; i++) {
    letter = str[i];
    obj[letter] = obj[letter] || 0;
    obj[letter]++;

    if (obj[letter] > max) {
      max = obj[letter];
      maxChar = letter;
    }
  }

  return maxChar;
}

longestCharSeq('aaabccccddd') // "c"

longestCharSeq('aaabccccdddwwwwwww') // "w"

longestCharSeq('aaabxx x x x x xxx xxx xccccdddwwwwwww') //"x"
