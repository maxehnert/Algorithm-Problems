

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

/*
 * I tried a few different ways of creating a binary sort tree in JS before settling on the contructor type.
 * This way provides a more modular method by adding constructors? such as (add, remove, contains, etc).
 * Using a new feature in ES6, classes, I was able to simplify this without needing to touch prototype.
 * This BST does more than what the origial question asked, but it gave me more practice with classes in ES6 and opens it up to add more features and search types to it.
*/


class BinarySearchTree {

    constructor() {
      this._root = null;
    };

    add (value) {
      //create a new item object, place data in
      var node = {
          value: value,
          left: null,
          right: null
        };

      //used to traverse the structure
      var current;

      //special case: no items in the tree yet
      if ( this._root === null ) {
          this._root = node;
      } else {
          current = this._root;

          while(true) {

            //if the new value is less than this node's value, go left
            if ( value < current.value ) {

                //if there's no left, then the new node belongs there
                if ( current.left === null ) {
                    current.left = node;
                    break;
                } else {
                    current = current.left;
                }

            //if the new value is greater than this node's value, go right
            } else if ( value > current.value ) {

                //if there's no right, then the new node belongs there
                if ( current.right === null ) {
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
      while( !found && current ) {

        //if the value is less than the current node's, go left
        if ( value < current.value ) {
            current = current.left;

        //if the value is greater than the current node's, go right
        } else if ( value > current.value ) {
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
          if ( node.left !== null ) {
              inOrder(node.left);
          }

          //call the process method on this node
          process.call(this, node);

          //traverse the right subtree
          if ( node.right !== null ) {
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

        if ( !current.right ) {

          return current.value;
        }
        current = current.right;
      }
    };

    secondLargestNode (value) {

      var current = this._root;

      while (current) {

        if ( current.left && !current.right ) {

          return largestNode(current.left);
        }
        if ( current.right && !current.right.left && !current.right.right ) {

          return current.value;
        }
        current = current.right;
      }
    };

    remove (value) {
      this._root = this._removeInner(value, this._root);
    };

    _removeInner (value, node) {
      if (node) {
        if (value < node.value) {
            node.left = this._removeInner(value, node.left);
        } else if (value > node.value) {
            node.right = this._removeInner(value, node.right);
        } else if (node.left && node.right) {
            node.value = this.findMinValue(node.right);
            node.right = this._removeInner(node.value, node.right);
        } else {
            node = node.left || node.right;
        }
      }

      return node;
    };

    findMinNode (node) {

      if ( !this.isEmpty() ) {
          if (node === void 0) {
            node = this._root;
          }
          while (node.left) {
            node = node.left;
          }

          return node;
      }
    };

    findMinValue (node) {

      var minNode = this.findMinNode(node);

      return minNode && minNode.value;
    };

    isEmpty () {

      return this._root === null;
    };

    getHeight (node) {

      if ( !this.isEmpty() ) {

        if ( node === void 0 ) {

          node = this._root;
        }
        if ( node.left === null && node.right === null ) {

          return 0;
        }
        if ( node.left === null ) {

          return ( this.getHeight(node.right) );
        }
        if ( node.right === null ) {

          return ( this.getHeight(node.left) );
        }

        return ( 1 + Math.max( this.getHeight(node.left), this.getHeight(node.right) ));
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
