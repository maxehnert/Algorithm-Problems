
/*
This was the origial question I started with:

Write a function to find the 2nd largest element in a binary search tree.

This grew into something much larger however so I removed any of the content from IC regarding the question because of lack of relevancy.
*/


/*
 * I tried a few different ways of creating a binary search tree in JS before settling on the contructor type.
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
