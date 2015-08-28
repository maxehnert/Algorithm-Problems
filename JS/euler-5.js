// Write a function that returns true if a number is divisible by 1..20, then call that function in your loop.

let isDivisible = (x) => {
  let maxDivisor = 20;
  let i = 2;
   x += maxDivisor;

    // while n is divisible by i
    // and i is less than the largest divisor
    while (x % i === 0 && i <= maxDivisor) {
      //console.log(x);
      // if i is equal to the largest divisor
      if (i === maxDivisor) {
        // then we've found the answer
        //console.log(i);
       return true;
      }
      i++;
    }
};

let euler5 = () => {
  let x = 2;
  while(!isDivisible(x)) {
    x++;
  }
};

euler5();


// let noRemainder = () => {
//   let num = 20;
//
//   // I could use a function generator/ iterator here with an open ended while loop
//
//   while(num >=20) {
//    //console.log(num);
//     if (num % 20 == 0) {
//       let temp =0;
//       for ( let i = 20; i >= 2; i--) {
//
//
//         if(num % i === 0) {
//           temp += 1;
//
//           if(temp == 19) {
//         		return num;
//       		}
//
//         }
//         else {
//           num += 20;
//         }
//
//         if(temp == 19) {
//         		return num;
//       	}
//
//       }
//
//     }
//     else {
//       num += 20;
//
//     }
//
//   }
//   console.log('final num '+ num);
//   //return num;
// }
// noRemainder();
