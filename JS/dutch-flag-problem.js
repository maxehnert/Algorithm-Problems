// Sort an array of integers between 1-3 in place
// https://en.wikipedia.org/wiki/Dutch_national_flag_problem

const threeWay = (arr, mid) => {
  let i = 0;
  let j = 0;
  let n = arr.length - 1;

  while(j <= n) {
    if(arr[j] < mid) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j++;
    } else if (arr[j] > mid) {
      [arr[n], arr[j]] = [arr[j], arr[n]];
      n = n - 1;
    } else {
      j++;
    }
  }
  console.log(arr);
  return arr;
};

const arr = [1,2,3,2,2,1,3,2,1,1,3,3,2];
threeWay(arr, 2);
