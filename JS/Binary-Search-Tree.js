

Write a function to find the 2nd largest element in a binary search tree ↴
A binary search tree is a binary tree in which, for each node:

The nodes value is greater than all values in the left subtree.
The nodes value is less than all values in the right subtree.
BSTs are useful for quick lookups. If the tree is balanced, we can search for a given value in the tree in O(\lg{n})O(lgn) time.
.
Breakdown
Lets start by solving a simplified version of the problem and see if we can adapt our approach from there. How would we find the largest element in a BST?

A reasonable guess is to say the largest element is simply the "rightmost" element.

So maybe we can start from the root and just step down right child pointers until we cant anymore (until the right child is None). At that point the current node is the largest in the whole tree.

Is this sufficient? We can prove it is by contradiction:

If the largest element were not the "rightmost," then the largest element would either:

be in some ancestor nodes left subtree, or
have a right child.
But each of these leads to a contradiction:

If the node is in some ancestor node's left subtree it's smaller than that ancestor node, so its not the largest.
If the node has a right child that child is larger than it, so its not the largest.
So the "rightmost" element must be the largest.

How would we formalize getting the "rightmost" element in code?

We can use a simple recursive approach. At each step:

If there is a right child, that node and the subtree below it are all greater than the current node. So step down to this child and recurse.
Else there is no right child and were already at the "rightmost" element, so we return its value.
  def largest(root_node):
    if root_node.right:
        return largest(root_node.right)
    return root_node.value
Okay, so we can find the largest element. How can we adapt this approach to find the second largest element?

Our first thought might be, "it's simply the parent of the largest element!" That seems obviously true when we imagine a nicely balanced tree like this one:

  .        ( 5 )
        /     \
      (3)     (8)
     /  \     /  \
   (1)  (4) (7)  (9)
But what if the largest element itself has a left subtree?

  .        ( 5 )
        /     \
      (3)     (8)
     /  \     /  \
   (1)  (4) (7)  (12)
                 /
               (10)
               /  \
             (9)  (11)
Here the parent of our largest is 8, but the second largest is 11!

Drat, okay so the second largest isnt necessarily the parent of the largest...back to the drawing board...

Wait. No. The second largest is the parent of the largest if the largest does not have a left subtree. If we can handle the case where the largest does have a left subtree, we can handle all cases, and we have a solution.

So lets try sticking with this. How do we find the second largest when the largest has a left subtree?

Its the largest item in that left subtree! Woah, we freaking just wrote a function for finding the largest element in a tree. We could use that here!

How would we code this up?

  def largest(root_node):
    if root_node.right is not None:
        return largest(root_node.right)
    return root_node.value

def find_second_largest(root_node):
    # case: empty tree
    if root_node is None:
        return None

    # case: were currently at largest, and
    # largest has a left subtree
    # 2nd largest is largest in said subtree
    if root_node.left and not root_node.right:
        return largest(root_node.left)

    # case: were at parent of largest,
    # and largest has no left subtree
    # so largest must be current node
    if root_node.right and \
       not root_node.right.left and \
       not root_node.right.right:
        return root_node.value

    # otherwise: step right
    return find_second_largest(root_node.right)
Okay awesome. Thisll work. Itll take O(h)O(h) time (where hh is the height of the tree) and O(h)O(h) space.

But that hh space in the call stack ↴ is avoidable. How can we get this down to constant space?

Solution
We start with a function for getting the largest value. The largest value is simply the "rightmost" one, so we can get it in one walk down the tree by traversing rightward until we dont have a right child anymore:

  def find_largest(root_node):
    current = root_node
    while current:
        if not current.right:
            return current.value
        current = current.right
With this in mind, we can also find the second largest in one walk down the tree. At each step, we have a few cases:

If we have a left subtree but not a right subtree, then the current node is the largest overall (the "rightmost") node. The second largest element must be the largest element in the left subtree. We use our get_largest() function above to find the largest in that left subtree!
If we have a right child, but that right child node doesnt have any children, then the right child must be the largest element and our current node must be the second largest element!
Else, we have a right subtree with more than one element, so the largest and second largest are somewhere in that subtree. So we step right.

def find_largest(root_node):
    current = root_node
    while current:
        if not current.right:
            return current.value
        current = current.right

def find_second_largest(root_node):
    current = root_node

    while current:
        # case: current is largest and has a left subtree
        # 2nd largest is the largest in that subtree
        if current.left and not current.right:
            return find_largest(current.left)

        # case: current is parent of largest, and
        # largest has no children, so
        # current is 2nd largest
        if current.right and \
           not current.right.left and \
           not current.right.right:
            return current.value

        current = current.right
Complexity
Were doing one walk down our BST, which means O(h)O(h) time, where hh is the height of the tree (again, thats O(\lg{n})O(lgn) if the tree is balanced, O(n)O(n) otherwise). O(1)O(1) space.




class BinarySearchTree {

    //restore constructor
  //  constructor: BinarySearchTree,
    constructor() {
            this._root = null;
    };

    add (value) {
        //create a new item object, place data in
        var node = {
                value: value,
                left: null,
                right: null
            },

            //used to traverse the structure
            current;

        //special case: no items in the tree yet
        if (this._root === null) {
            this._root = node;
        } else {
            current = this._root;

            while(true) {

                //if the new value is less than this node's value, go left
                if (value < current.value) {

                    //if there's no left, then the new node belongs there
                    if (current.left === null) {
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }

                //if the new value is greater than this node's value, go right
                } else if (value > current.value) {

                    //if there's no right, then the new node belongs there
                    if (current.right === null) {
                        current.right = node;
                        break;
                    } else {
                        current = current.right;
                    }

                //if the new value is equal to the current one, just ignore
                } else {
                    break;
                }
            }
        }
    };

    contains (value) {
        var found = false;
        var current = this._root;

        //make sure there's a node to search
        while(!found && current) {

            //if the value is less than the current node's, go left
            if (value < current.value) {
                current = current.left;

            //if the value is greater than the current node's, go right
            } else if (value > current.value) {
                current = current.right;

            //values are equal, found it!
            } else {
                found = true;
            }
        }

        //only proceed if the node was found
        return found;
    };

    traverse (process) {

      //helper function
      var inOrder = node => {
          if (node) {

              //traverse the left subtree
              if (node.left !== null) {
                  inOrder(node.left);
              }

              //call the process method on this node
              process.call(this, node);

              //traverse the right subtree
              if (node.right !== null) {
                  inOrder(node.right);
              }
          }
      }

      //start with the root
      inOrder(this._root);
    };

    largestNode (value) {

      var current = this._root;

      while (current) {
        if(!current.right) {
          return current.value;
        }
        current = current.right;
      }
    };

    secondLargestNode (value) {

      var current = this._root;

      while (current) {
        if(current.left && !current.right) {
          return largestNode(current.left);
        }
        if(current.right && !current.right.left && !current.right.right) {
          return current.value;
        }
        current = current.right;
      }
    }

    /**
     * Removes the node with the given value from the tree. This may require
     * moving around some nodes so that the binary search tree remains
     * properly balanced.
     */
    remove (value) {

      var found = false;
      var parent = null;
      var current = this._root;
      var childCount;
      var replacement;
      var replacementParent;

      //make sure there's a node to search
      while( !found && current ) {

        //if the value is less than the current node's, go left
        if (value < current.value) {
            parent = current;
            current = current.left;

        //if the value is greater than the current node's, go right
        } else if (value > current.value) {
            parent = current;
            current = current.right;

        //values are equal, found it!
        } else {
            found = true;
        }
      }

      //only proceed if the node was found
      if (found) {

          //figure out how many children
          childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);

          //special case: the value is at the root
        if (current === this._root) {
            switch(childCount) {

              //no children, just erase the root
              case 0:
                this._root = null;
                break;

              //one child, use one as the root
              case 1:
                this._root = (current.right === null ? current.left : current.right);
                break;

              //two children, little work to do
              case 2:

                //new root will be the old root's left child...maybe
                replacement = this._root.left;

                //find the right-most leaf node to be the real new root
                while (replacement.right !== null) {
                    replacementParent = replacement;
                    replacement = replacement.right;
                }

                //it's not the first node on the left
                if (replacementParent !== null) {

                    //remove the new root from it's previous position
                    replacementParent.right = replacement.left;

                    //give the new root all of the old root's children
                    replacement.right = this._root.right;
                    replacement.left = this._root.left;
                } else {

                    //just assign the children
                    replacement.right = this._root.right;
                }

                //officially assign new root
                this._root = replacement;

            //no default
            }
        //non-root values
        } else {

          switch (childCount){

            //no children, just remove it from the parent
            case 0:
              //if the current value is less than its parent's, null out the left pointer
              if (current.value < parent.value) {
                  parent.left = null;

              //if the current value is greater than its parent's, null out the right pointer
              } else {
                  parent.right = null;
              }
              break;

            //one child, just reassign to parent
            case 1:
              //if the current value is less than its parent's, reset the left pointer
              if (current.value < parent.value){
                  parent.left = (current.left === null ? current.right : current.left);

              //if the current value is greater than its parent's, reset the right pointer
              } else {
                  parent.right = (current.left === null ? current.right : current.left);
              }
              break;

            //two children, a bit more complicated
            case 2:

              //reset pointers for new traversal
              replacement = current.left;
              replacementParent = current;

              //find the right-most node
              while(replacement.right !== null) {
                  replacementParent = replacement;
                  replacement = replacement.right;
              }

              replacementParent.right = replacement.left;

              //assign children to the replacement
              replacement.right = current.right;
              replacement.left = current.left;

              //place the replacement in the right spot
              if (current.value < parent.value) {
                  parent.left = replacement;
              } else {
                  parent.right = replacement;
              }
            //no default
          }
        }
      }
    };

    size () {
        var length = 0;

        this.traverse( node => length++ );

        return length;
    };

    toArray () {
        var result = [];

        this.traverse( node => result.push(node.value) );

        return result;
    };

    toString () {
        return this.toArray().toString();
    };

};
