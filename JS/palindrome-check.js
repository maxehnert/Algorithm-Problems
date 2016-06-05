const isPalindrome = (str) => {
  str = str.toLowerCase().split('');
  const len = str.length;
  const half = Math.floor(len / 2);

  for (let i = 0; i < half; i++) {
    if (str[i] !== str[ len - 1 - i]) {
      return false;
    }
  }

  return true;
}

isPalindrome('abbCbba'); // true
isPalindrome('abCbba'); // false
