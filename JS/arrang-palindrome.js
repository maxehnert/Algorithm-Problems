const arrangePalindrome = (str) => {
    // set the string to lower case first
    str = str.toLowerCase();

    let letterCounts = {};
    let letter;
    let palindromeSum = 0;
    let newArr = [];
    let oddLetter;

    // Loop over the string an make a count of each char occurance
    for (let i = 0; i < str.length; i++) {
        letter = str[i];
        letterCounts[letter] = letterCounts[letter] || 0;
        letterCounts[letter]++;
    }

    // Create a method to check if the string can be a palindrome
    for (let letterCount in letterCounts) {
        palindromeSum += letterCounts[letterCount] % 2;
    }

    // If the string CAN be a palindrome...
    if (palindromeSum < 2) {

      // Loop through the letterCounts object
      for (let letter in letterCounts) {
        // If the char occures an EVEN number of times...
        if( letterCounts[letter] % 2 === 0) {

          // Insert the EVEN chars to the middle of the array
          let q = Array(letterCounts[letter]).fill(letter);
          newArr.splice(newArr.length / 2, 0, ...q);
        }
        // If the char has an ODD number of occurances..
        if (letterCounts[letter] % 2 !== 0) {

           // Save the One odd set of char(s) to insert last
          oddLetter = Array(letterCounts[letter]).fill(letter);
        }
      }

      // When all the even count chars have gone in, push the Odd char(s) in
      newArr.splice(newArr.length/2, 0, ...oddLetter);

      return console.log(newArr.join(''));

    } else {
      return console.log(-1);
    }

};
arrangePalindrome('babccab'); //'acbbbca'
arrangePalindrome('abca'); // -1
