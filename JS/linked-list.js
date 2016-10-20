function Node(data) {
  this.data = data;
  this.next = null;
}

function SinglyList() {
  this._length = 0;
  this.head = null;
}

SinglyList.prototype.add = function(value) {
  var node = new Node(value)
  var currentNode = this.head

  if (!currentNode) {
    this.head = node
    this._length++

    return node
  }

  while (currentNode.next) {
    currentNode = currentNode.next
  }

  currentNode.next = node

  this._length++

  return node
}
