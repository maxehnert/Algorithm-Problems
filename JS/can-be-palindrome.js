const canBePalindrome = (str) => {
  str = str.toLowerCase();
  let letterCounts = {};
  let letter;
  let palindromeSum = 0;

  for (let i = 0; i < str.length; i++) {
    letter = str[i];
    letterCounts[letter] = letterCounts[letter] || 0;
    letterCounts[letter]++;
  }

  for (value in letterCounts) {
    palindromeSum += letterCounts[value] % 2;
  }

  return palindromeSum < 2 ? true : false;
};


canBePalindrome('aaa'); // true
canBePalindrome('aa1'); // true
canBePalindrome('aA1'); // true
canBePalindrome('aabb'); // true
canBePalindrome('aabbc'); // true
canBePalindrome('abbc'); // false
