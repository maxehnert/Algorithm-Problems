/*

Write a function to find the 2nd largest element in a binary search tree ↴
A binary search tree is a binary tree in which, for each node:

The node's value is greater than all values in the left subtree.
The node's value is less than all values in the right subtree.
BSTs are useful for quick lookups. If the tree is balanced, we can search for a given value in the tree in O(\lg{n})O(lgn) time.
.
Breakdown
Let's start by solving a simplified version of the problem and see if we can adapt our approach from there. How would we find the largest element in a BST?

A reasonable guess is to say the largest element is simply the "rightmost" element.

So maybe we can start from the root and just step down right child pointers until we can't anymore (until the right child is None). At that point the current node is the largest in the whole tree.

Is this sufficient? We can prove it is by contradiction:

If the largest element were not the "rightmost," then the largest element would either:

be in some ancestor node's left subtree, or
have a right child.
But each of these leads to a contradiction:

If the node is in some ancestor node's left subtree it's smaller than that ancestor node, so it's not the largest.
If the node has a right child that child is larger than it, so it's not the largest.
So the "rightmost" element must be the largest.

How would we formalize getting the "rightmost" element in code?

We can use a simple recursive approach. At each step:

If there is a right child, that node and the subtree below it are all greater than the current node. So step down to this child and recurse.
Else there is no right child and we're already at the "rightmost" element, so we return its value.
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

Drat, okay so the second largest isn't necessarily the parent of the largest...back to the drawing board...

Wait. No. The second largest is the parent of the largest if the largest does not have a left subtree. If we can handle the case where the largest does have a left subtree, we can handle all cases, and we have a solution.

So let's try sticking with this. How do we find the second largest when the largest has a left subtree?

It's the largest item in that left subtree! Woah, we freaking just wrote a function for finding the largest element in a tree. We could use that here!

How would we code this up?

  def largest(root_node):
    if root_node.right is not None:
        return largest(root_node.right)
    return root_node.value

def find_second_largest(root_node):
    # case: empty tree
    if root_node is None:
        return None

    # case: we're currently at largest, and
    # largest has a left subtree
    # 2nd largest is largest in said subtree
    if root_node.left and not root_node.right:
        return largest(root_node.left)

    # case: we're at parent of largest,
    # and largest has no left subtree
    # so largest must be current node
    if root_node.right and \
       not root_node.right.left and \
       not root_node.right.right:
        return root_node.value

    # otherwise: step right
    return find_second_largest(root_node.right)
Okay awesome. This'll work. It'll take O(h)O(h) time (where hh is the height of the tree) and O(h)O(h) space.

But that hh space in the call stack ↴ is avoidable. How can we get this down to constant space?


*/

function Node(val){
  this.value = val;
  this.left = null;
  this.right = null;
}

function BinarySearchTree(){
  this.root = null;
}

BinarySearchTree.prototype.push = function(val){
   var root = this.root;

   if(!root){
      this.root = new Node(val);
      return;
   }

   var currentNode = root;
   var newNode = new Node(val);

   while(currentNode){
      if(val < currentNode.value){
          if(!currentNode.left){
             currentNode.left = newNode;
             break;
          }
          else{
             currentNode = currentNode.left;
        }
     }
     else{
         if(!currentNode.right){
            currentNode.right = newNode;
            break;
         }
         else{
            currentNode = currentNode.right;
         }
     }
  }

}

var bst = new BinarySearchTree();

bst.push(3);
bst.push(2);
bst.push(4);
bst.push(1);
bst.push(5);

let Node = val => {
  this.value = val;
  this.left = null;
  this.right = null;
};

let BinarySearchTree = () => this.root = null;

BinarySearchTree.prototype.push = val => {

  let root = this.root;

  if(!root) {
    this.root = new Node(val);
    return;
  }

  let currentNode = root;
  let newNode = new Node(val);

  while(currentNode) {
    if( val < currentNode.value) {
      if( !currentNode.left) {
        currentNode.left = newNode;
        break;

      } else {
          currentNode = currentNode.left;
      }
    } else {
        currentNode = currentNode.right;
    }
  }

}

let bst = new BinarySearchTree();

bst.push(3);
bst.push(2);
bst.push(4);
bst.push(1);
bst.push(5);
