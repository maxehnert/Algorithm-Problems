/**
 *  Given an array or Prime numbers as an example, find the index of any number in the array
 * During this process you will also be able to find the number of items in the array that are less than the one you are looking for,
 */

var arr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

var binarySort = function(arr, target) {
  var min = 0;
  var max = arr.length -1;
  var guess;

  while (min <= max) {
    guess = Math.floor((min + max) / 2);

    if (arr[guess] === target) {
      console.log(guess);
      return guess;
    } else if (arr[guess] < target) {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }
  return -1;
};

binarySort(arr, 67);
