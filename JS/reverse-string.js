let reverseString = str => {

 str = str.split('');
  let len = str.length - 1;
  let half_index = Math.floor( len / 2 );
  // let reverse_str;

  for ( let i = 0; i <= half_index; i++ ) {
    // reverse_str = str[len - i];
    // str[len - i] = str[i];
    // str[i] = reverse_str;
    [str[i], str[len - i]] = [str[len - i], str[i]];
  }
  console.log(str.join(''));
  return str.join('');
}

reverseString('I am a string that is reversing');
