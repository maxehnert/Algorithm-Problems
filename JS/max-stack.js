/*
* Question Setup
* You've implemented a Stack Class but you want to access the largest element in a stack
* So you have to write a new class that accesses your Stack class to store your stack and another for your largest integer.
* time complexity, O(1) for push, pop, and getMax.
*/

/*
 * I've recently read some more experienced peoples opinions on the use of classes in JS now and that it really isn't a good way design for JS, so although I'm enjoying using the es6 classes, I will probably go back to a standard prototypal inheritance. 
*/

class Stack {

  constructor() {

    this.items = [];
  }

  push( item ) {

    this.items.push(item);
  }

  pop() {

    if( this.items.length == 0 ) {

      return null;
    }

    return this.items.pop();
  }

  peek() {

    if( this.items.length == 0 ) {

      return null;
    }

    return this.items[ this.items.length - 1 ];
  }
}

class MaxStack {

  constructor() {

    this.stack = new Stack();
    this.maxsStack = new Stack();
  }

  push( item) {

    this.stack.push(item);

    if ( item >= this.maxsStack.peek() ) {
      this.maxsStack.push(item);
    }
  }

  pop() {

    var item = this.stack.pop();

    if( item == this.maxsStack.peek() ) {
      this.maxsStack.pop();
    }

    return item;
  }

  getMax() {

    return this.maxsStack.peek();
  }
}
