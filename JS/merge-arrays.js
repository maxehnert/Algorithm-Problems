We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays of orders into one sorted array.

we should think about edge cases and check for bugs. What edge cases should we worry about?

Here are some edge cases:

One or both of our input arrays is 0 elements or 1 element
One of our input arrays is longer than the other.
One of our arrays runs out of elements before were done merging.
Actually, 3 will always happen. In the process of merging our arrays, well certainly exhaust one before we exhaust the other.

Does our function handle these cases correctly?

Well get an IndexError in all three cases!

How can we fix this?

We can probably solve all of these at the same time. Theyre not so different—they all have to do with handling empty arrays.

To start, we could treat each of our arrays being out of elements as a separate case to handle, in addition to the 2 cases we already have. So we have 4 cases total.

Solution
First, we allocate our answer array, getting its size by adding the size of my_array and alices_array.

We keep track of a current index in my_array, a current index in alices_array, and a current index in merged_array. So at each step, theres a "current item" in alices_array and in my_array. The smaller of those is the next one we add to the merged_array!

But careful: we also need to account for the case where we exhaust one of our arrays and there are still elements in the other. To handle this, we say that the current item in my_array is the next item to add to merged_array only if my_array is not exhausted AND, either:

alices_array is exhausted, or
the current item in my_array is less than the current item in alices_array
  def merge_arrays(my_array, alices_array):

    # set up our merged_array
    merged_array_size = len(my_array) + len(alices_array)
    merged_array = [None] * merged_array_size

    current_index_alices = 0
    current_index_mine = 0
    current_index_merged = 0

    while current_index_merged < merged_array_size:

        is_my_array_exhausted = current_index_mine >= len(my_array)
        is_alices_array_exhausted = current_index_alices >= len(alices_array)

        # case: next comes from my array
        # my array must not be exhausted, and EITHER:
        # 1) alices array IS exhausted, or
        # 2) the current element in my array is less
        #    than the current element in alices array
        if not is_my_array_exhausted and (is_alices_array_exhausted or \
            my_array[current_index_mine] < alices_array[current_index_alices]):

            merged_array[current_index_merged] = my_array[current_index_mine]
            current_index_mine += 1

        # case: next comes from alices array
        else:
            merged_array[current_index_merged] = alices_array[current_index_alices]
            current_index_alices += 1

        current_index_merged += 1

    return merged_array
The if statement is carefully constructed to avoid an IndexError. We first check whether or not the arrays are exhausted, before we index into them (which is where we risk throwing an IndexError). Python's lazy evaluation ↴ then ensures we don't index into our arrays if one is already exhausted.

Complexity
O(n)O(n) time and O(n)O(n) additional space, where nn is the number of items in the merged array.

The added space comes from allocating the merged_array. Theres no way to do this "in place" because neither of our input arrays are necessarily big enough to hold the merged array.

But if our inputs were linked lists, we could avoid allocating a new structure and do the merge by simply adjusting the next pointers in the list nodes!

In our implementation above, we could avoid tracking current_index_merged and just compute it on the fly by adding current_index_mine and current_index_alices. This would only save us one integer of space though, which is hardly anything. Its probably not worth the added code complexity.

Bonus
What if we wanted to merge several sorted arrays? Write a function that takes as an input an array of sorted arrays and outputs a single sorted array with all the items from each array.


/*
 * This one was pretty simple since I've done similar problems before.
 *
 * Still need to add in an apply method to it so I can add as many
 * arrays as I want.
 * Using the new spread operator is possibly of interest for this also.
*/

let mergeArrays = (myArr, yourArr) => {

  var mergedArraySize = myArr.length + yourArr.length;
  var mergedArr = new Array(mergedArraySize);

  var currentIndexYou = 0;
  var currentIndexMe = 0;
  var currentIndexMerged = 0;

  while ( currentIndexMerged < mergedArraySize ) {

    var isMyArrExhausted = currentIndexMe >= myArr.length;
    var isYourArrExhausted = currentIndexYou >= yourArr.length;

    if ( !isMyArrExhausted && ( isYourArrExhausted || myArr[currentIndexMe] < yourArr[currentIndexYou] )) {

      mergedArr[currentIndexMerged] = myArr[currentIndexMe];
      currentIndexMe += 1;

    } else {
      mergedArr[currentIndexMerged] = yourArr[currentIndexYou];
      currentIndexYou += 1;
    }
    currentIndexMerged += 1;
  }

  console.log(mergedArr);
  return mergedArr;
}

var myArr = [3, 4, 6, 10, 11, 15];
var yourArr = [1, 5, 8, 12, 14, 19];

mergeArrays(myArr, yourArr); // [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
mergeArrays.call(null, myArr, yourArr); // Add as many array


var mergeArrays = (myArr, yourArr) => {
  let mergedArraySize = myArr.length + yourArr.length;
  var cArr = Array.from(myArr);

  //sloppy way, push one array into the other and sorted
  var len = yourArr.length;
  for (var i = 0; i < len; i++) {
    cArr.push(yourArr[i]);
  }

  return cArr.sort((a,b) => {
    return a > b ? 1 : a < b ? -1 : 0
  })
}


// to merge a list of arrays you can use a multidimential array flattener with .call or .apply
// then use the spread operator in the function params
const masterFlatter = (...arr) => {
  let flatArr = [];

  const flatten = (arr) => {
    return arr.map(v => {
      return Array.isArray(v) ? flatten(v) : flatArr.push(v);
    });
  };

  flatten(arr);

  console.log(flatArr);
  return flatArr;
};

masterFlatter.apply(null, [myArr, yourArr, coolArr]);
masterFlatter.call(null, myArr, yourArr, coolArr);
