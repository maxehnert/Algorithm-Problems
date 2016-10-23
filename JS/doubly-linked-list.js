function Node(data) {
  this.data = data
  this.prev = null
  this.next = null
}

function DoublyList() {
  this._length = 0
  this.head = null
  this.tail = null
}

DoublyList.prototype.add = function(value) {
  var node = new Node(value)

  if (this._length) {
    this.tail.next = node
    node.previous = this.tail
    this.tail = node
  } else {
    this.head = node
    this.tail = node
  }

  this._length++

  return node
}
