// Write a function that returns true if a number is divisible by 1..20, then call that function in your loop.

let isDivisible = num => {
  let maxDivisor = 20;
  let i = 2;
   num += maxDivisor;

    // while n is divisible by i
    // and i is less than the largest divisor
    while (num % i === 0 && i <= maxDivisor) {

      // if i is equal to the largest divisor
      if (i === maxDivisor) {
        // then we've found the answer
        console.log(num);
       return true;
      }
      i++;
    }
};

let euler5 = () => {
  let num = 0;

  while(!isDivisible(num)) {
    num += 20;
  }
};

euler5();
