/*
Find a duplicate, Space Edition™ BEAST MODE
In Find a duplicate, Space Edition™, we were given a list of integers where:

the integers are in the range 1..n1..n
the list has a length of n+1n+1
These properties mean the list must have at least 1 duplicate. Our challenge was to find a duplicate number, while optimizing for space. We used a divide and conquer approach, iteratively cutting the list in half to find a duplicate integer in O(n\lg{n})O(nlgn) time and O(1)O(1) space (sort of a modified binary search).

But we can actually do better. We can find a duplicate integer in O(n)O(n) time while keeping our space cost at O(1)O(1).

This is a tricky one to derive (unless you have a strong background in graph theory), so we'll get you started:

Imagine each item in the list as a node in a linked list. In any linked list ↴ , each node has a value and a "next" pointer. In this case:

The value is the integer from the list.
The "next" pointer points to the value-eth node in the list (numbered starting from 1). For example, if our value was 3, the "next" node would be the third node.
*/

/*
Solution
We treat the input list as a linked list like we described at the top in the problem.

To find a duplicate integer:

We know the position of a node with multiple incoming pointers is a duplicate in our list because the nodes that pointed to it must have the same value.
We find a node with multiple incoming pointers by finding the first node in a cycle.
We find the first node in a cycle by finding the length of the cycle and advancing two pointers: one starting at the head of the linked list, and the other starting ahead as many steps as there are nodes in the cycle. The pointers will meet at the first node in the cycle.
We find the length of a cycle by remembering a position inside the cycle and counting the number of steps it takes to get back to that position.
We get inside a cycle by starting at the head and walking nn steps. We know the head of the list is at position n + 1n+1.
*/

def find_duplicate(int_list):

  n = len(int_list) - 1

  # STEP 1: GET INSIDE A CYCLE
  # start at position n+1 and walk n steps to
  # find a position guaranteed to be in a cycle
  position_in_cycle = n + 1
  for _ in xrange(n):
      position_in_cycle = int_list[position_in_cycle - 1]
      # we subtract 1 from the current position to step ahead:
      # the 2nd /position/ in a list is /index/ 1

  # STEP 2: FIND THE LENGTH OF THE CYCLE
  # find the length of the cycle by remembering a position in the cycle
  # and counting the steps it takes to get back to that position
  remembered_position_in_cycle = position_in_cycle
  current_position_in_cycle    = int_list[position_in_cycle - 1] # 1 step ahead
  cycle_step_count = 1

  while current_position_in_cycle != remembered_position_in_cycle:
      current_position_in_cycle = int_list[current_position_in_cycle - 1]
      cycle_step_count += 1

  # STEP 3: FIND THE FIRST NODE OF THE CYCLE
  # start two pointers
  #   (1) at position n+1
  #   (2) ahead of position n+1 as many steps as the cycle's length
  pointer_start = n + 1
  pointer_ahead = n + 1
  for _ in xrange(cycle_step_count):
      pointer_ahead = int_list[pointer_ahead - 1]

  # advance until the pointers are in the same position
  # which is the first node in the cycle
  while pointer_start != pointer_ahead:
      pointer_start = int_list[pointer_start - 1]
      pointer_ahead = int_list[pointer_ahead - 1]

  # since there are multiple values pointing to the first node
  # in the cycle, its position is a duplicate in our list
  return pointer_start



  let findDup = (intList) => {
    let n = intList - 1;
    let positionInCycle = n + 1;

    for ( var _ in xra)
  }
