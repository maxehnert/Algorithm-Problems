/**
 * Write a function that will duplicate each value in the array after it's initial value.
 * The function should be called as a callback on an array.
 *
 * start with this [1,2,3,4,5] end with this [1,1,2,2,3,3,4,4,5,5]
 * should be able to call it like arr.duplicate();
 *
 */


/**
 * Directly extending the Array prototype
 */

 Array.prototype.duplicate = function() {
    var self = this;
    var arrCopy = Array.from(self);
    var len = arrCopy.length;

    for (var i = 0; i < len; i++) {
      self.splice((arrCopy[i] + i), 0, arrCopy[i]);
    }

    return self;
};

/**
 * Another approach using Object.defineProperty to create the property on the prototype
 */
Object.defineProperty(Array.prototype, 'duplicate', {
  value() {
    var self = this;
    var arrCopy = Array.from(self);
    var len = arrCopy.length;

    for (var i = 0; i < len; i++) {
      self.splice((arrCopy[i] + i), 0, arrCopy[i]);
    }

    return self;
  }
});

/**
 * ES6 way of doing the same as Object.defineProperty, but using Object.assign
 */
Object.assign(Array.prototype, {
  duplicate() {
    var self = this;
    var arrCopy = Array.from(self);
    var len = arrCopy.length;

    for (var i = 0; i < len; i++) {
      self.splice((arrCopy[i] + i), 0, arrCopy[i]);
    }

    return self;
  }
});


var arr = [1,2,3,4,5];

arr.duplicate(); // -> [1,1,2,2,3,3,4,4,5,5]
