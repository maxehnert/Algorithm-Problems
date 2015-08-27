
In order to win the prize for most cookies sold, my friend Alice and I are going to merge our Girl Scout Cookies orders and enter as one unit.
Each order is represented by an "order id" (an integer).

We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays of orders into one sorted array.

For example:

  my_array     = [3, 4, 6, 10, 11, 15]
alices_array = [1, 5, 8, 12, 14, 19]

print merge_arrays(my_array, alices_array)
# prints [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
Gotchas
We can do this in O(n)O(n) time and space.

If you're running a built-in sorting function, your algorithm probably takes O(n\lg{n})O(nlgn) time for that sort.

Think about edge cases! What happens when we've merged in all of the elements from one of our arrays but we still have elements to merge in from our other array?

Breakdown
We could simply concatenate (join together) the two arrays into one, then sort the result:

  def merge_sorted_arrays(arr1, arr2):
    return sorted(arr1 + arr2)
What would the time cost be?

O(n\lg{n})O(nlgn), where nn is the total length of our output array (the sum of the lengths of our inputs).

We can do better. With this algorithm, we're not really taking advantage of the fact that the input arrays are themselves already sorted. How can we save time by using this fact?

A good general strategy for thinking about an algorithm is to try writing out a sample input and performing the operation by hand. If you're stuck, try that!

Since our arrays are sorted, we know they each have their smallest item in the 0th index. So the smallest item overall is in the 0th index of one of our input arrays!

Which 0th element is it? Whichever is smaller!

To start, let's just write a function that chooses the 0th element for our sorted array.

  def merge_arrays(my_array, alices_array):

    # make an array big enough to fit the elements from both arrays
    merged_array_size = len(my_array) + len(alices_array)
    merged_array = [None] * merged_array_size

    head_of_my_array = my_array[0]
    head_of_alices_array = alices_array[0]

    # case: 0th comes from my array
    if head_of_my_array < head_of_alices_array:
        merged_array[0] = head_of_my_array

    # case: 0th comes from alices array
    else:
        merged_array[0] = head_of_alices_array

    # eventually we'll want to return the merged array
    return merged_array
Okay, good start! That works for finding the 0th element. Now how do we choose the next element?

Let's look at a sample input:

  my_array     = [3,  4,  6, 10, 11, 15]
alices_array = [1,  5,  8, 12, 14, 19]
To start we took the 0th element from alices_array and put it in the 0th slot in the output array:

  my_array     = [3,  4,  6, 10, 11, 15]
alices_array = [1,  5,  8, 12, 14, 19]
merged_array = [1,  x,  x,  x,  x,  x]
We need to make sure we don't try to put that 1 in merged_array again. We should mark it as "already merged" somehow. For now, we can just cross it out:

  my_array     = [3,  4,  6, 10, 11, 15]
alices_array = [x,  5,  8, 12, 14, 19]
merged_array = [1,  x,  x,  x,  x,  x]
Or we could even imagine it's removed from the array:

  my_array     = [3,  4,  6, 10, 11, 15]
alices_array = [5,  8, 12, 14, 19]
merged_array = [1,  x,  x,  x,  x,  x]
Now to get our next element we can use the same approach we used to get the 0th element—it's the smallest of the earliest unmerged elements in either array! In other words, it's the smaller of the leftmost elements in either array, assuming we've removed the elements we've already merged in.

So in general we could say something like:

We'll start at the beginnings of our input arrays, since the smallest elements will be there.
As we put items in our final merged_array, we'll keep track of the fact that they're "already merged."
At each step, each array has a first "not-yet-merged" item.
At each step, the next item to put in the merged_array is the smaller of those two "not-yet-merged" items!
Can you implement this in code?

  def merge_arrays(my_array, alices_array):

    merged_array_size = len(my_array) + len(alices_array)
    merged_array = [None] * merged_array_size

    current_index_alices = 0
    current_index_mine = 0
    current_index_merged = 0

    while current_index_merged < merged_array_size:
        first_unmerged_alices = alices_array[current_index_alices]
        first_unmerged_mine = my_array[current_index_mine]

        # case: next comes from my array
        if first_unmerged_mine < first_unmerged_alices:
            merged_array[current_index_merged] = first_unmerged_mine
            current_index_mine += 1

        # case: next comes from alice's array
        else:
            merged_array[current_index_merged] = first_unmerged_alices
            current_index_alices += 1

        current_index_merged += 1

    return merged_array
Okay, this algorithm makes sense. To wrap up, we should think about edge cases and check for bugs. What edge cases should we worry about?

Here are some edge cases:

One or both of our input arrays is 0 elements or 1 element
One of our input arrays is longer than the other.
One of our arrays runs out of elements before we're done merging.
Actually, 3 will always happen. In the process of merging our arrays, we'll certainly exhaust one before we exhaust the other.

Does our function handle these cases correctly?

We'll get an IndexError in all three cases!

How can we fix this?

We can probably solve all of these at the same time. They're not so different—they all have to do with handling empty arrays.

To start, we could treat each of our arrays being out of elements as a separate case to handle, in addition to the 2 cases we already have. So we have 4 cases total. Can you code that up?

Be sure you check the cases in the right order!

  def merge_arrays(my_array, alices_array):
    merged_array_size = len(my_array) + len(alices_array)
    merged_array = [None] * merged_array_size

    current_index_alices = 0
    current_index_mine = 0
    current_index_merged = 0

    while current_index_merged < merged_array_size:

        # case: my array is exhausted
        if current_index_mine >= len(my_array):
            merged_array[current_index_merged] = alices_array[current_index_alices]
            current_index_alices += 1

        # case: alices array is exhausted
        elif current_index_alices >= len(alices_array):
            merged_array[current_index_merged] = my_array[current_index_mine]
            current_index_mine += 1

        # case: my item is next
        elif my_array[current_index_mine] < alices_array[current_index_alices]:
            merged_array[current_index_merged] = my_array[current_index_mine]
            current_index_mine += 1

        # case: alices item is next
        else:
            merged_array[current_index_merged] = alices_array[current_index_alices]
            current_index_alices += 1

        current_index_merged += 1

    return merged_array
Cool. This'll work, but it's a bit repetitive. We have these two lines twice:

  merged_array[current_index_merged] = my_array[current_index_mine]
current_index_mine += 1
Same for these two lines:

  merged_array[current_index_merged] = alices_array[current_index_alices]
current_index_alices += 1
That's not DRY ↴ . Maybe we can avoid repeating ourselves by bringing our code back down to just 2 cases.

See if you can do this in just one "if else" by combining the conditionals.

You might try to simply squish the first and last cases together:

  if is_alices_array_exhausted or \
    my_array[current_index_mine] < alices_array[current_index_alices]):

    merged_array[current_index_merged] = my_array[current_index_mine]
    current_index_mine += 1
But what happens when my_array is exhausted? We'll get and IndexError when we try to access my_array[current_index_mine]!

How can we fix this?

Solution
First, we allocate our answer array, getting its size by adding the size of my_array and alices_array.

We keep track of a current index in my_array, a current index in alices_array, and a current index in merged_array. So at each step, there's a "current item" in alices_array and in my_array. The smaller of those is the next one we add to the merged_array!

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
        # 1) alice's array IS exhausted, or
        # 2) the current element in my array is less
        #    than the current element in alice's array
        if not is_my_array_exhausted and (is_alices_array_exhausted or \
            my_array[current_index_mine] < alices_array[current_index_alices]):

            merged_array[current_index_merged] = my_array[current_index_mine]
            current_index_mine += 1

        # case: next comes from alice's array
        else:
            merged_array[current_index_merged] = alices_array[current_index_alices]
            current_index_alices += 1

        current_index_merged += 1

    return merged_array
The if statement is carefully constructed to avoid an IndexError. We first check whether or not the arrays are exhausted, before we index into them (which is where we risk throwing an IndexError). Python's lazy evaluation ↴ then ensures we don't index into our arrays if one is already exhausted.

Complexity
O(n)O(n) time and O(n)O(n) additional space, where nn is the number of items in the merged array.

The added space comes from allocating the merged_array. There's no way to do this "in place" because neither of our input arrays are necessarily big enough to hold the merged array.

But if our inputs were linked lists, we could avoid allocating a new structure and do the merge by simply adjusting the next pointers in the list nodes!

In our implementation above, we could avoid tracking current_index_merged and just compute it on the fly by adding current_index_mine and current_index_alices. This would only save us one integer of space though, which is hardly anything. It's probably not worth the added code complexity.

Trivia! Python's native sorting algorithm is called Timsort. It's actually optimized for sorting arrays where subsections of the array are already sorted. For this reason, a more naive algorithm:

  def merge_sorted_arrays(arr1, arr2):
    return sorted(arr1 + arr2)
is actually faster until nn gets pretty big. Like 1,000,000.

Also, in Python 2.6+, there's a built-in function for merging sorted arrays into one sorted array: heapq.merge().

Bonus
What if we wanted to merge several sorted arrays? Write a function that takes as an input an array of sorted arrays and outputs a single sorted array with all the items from each array.

We'll review this one again later

Next question
Like this problem? Pass it on!
 Share  Tweet


Type code!
Yo, follow along!


Programming interview questions by company:

Google interview questions
Facebook interview questions
Amazon interview questions
Programming interview questions by language:

Java interview questions
Python interview questions
JavaScript interview questions
Copyright © 2015 Cake Labs, Inc. All rights reserved.
110 Capp St., Suite 200, San Francisco, CA US 94110 (804) 876-2253
Privacy | Terms
