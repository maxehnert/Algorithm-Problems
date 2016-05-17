function debounce(cb, wait, immediate) {
  var timer;

  return function() {
    var self = this;
    var args = arguments;
    var later = function() {
      timer = null;
      if (!immediate) {
        cb.apply(self, args);
      }
    };

    var callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(later, wait);
    if (callNow) {
      cb.apply(self, args);
    }
  };
};
var eventFunc = debounce(function() {
  // do sweet stuff
}, 1000, true);

el.addEventListener('scroll', eventFunc);
