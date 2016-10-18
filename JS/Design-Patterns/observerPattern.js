function ObserverList() {
  this.observerList = []
}

ObserverList.prototype.add = function(obj) {
  return this.observerList.push(obj)
}

ObserverList.prototype.count = function() {
  return this.observerList.length
}

ObserverList.prototype.get = function(index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index]
  }
}

ObserverList.prototype.indexOf = function(obj, startIndex) {
  var i = startIndex
  var oList = this.observerList

  while (i < oList.length) {
    if (oList[i] === obj) {
      return i
    }
    i++
  }

  return -1
}

ObserverList.prototype.removeAt = function(index) {
  this.observerList.splice(index, 1)
}
