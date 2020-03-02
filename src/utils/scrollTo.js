
var cubic = function cubic(value) {
    return Math.pow(value, 3);
};
var easeInOutCubic = function easeInOutCubic(value) {
    return value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
};

export function scrollTo(from, to) {
    var status = from.scrollTop > to.offsetTop ? 1 : -1;
    var beginTime = Date.now();
    var beginValue = from.scrollTop;
    var rAF = function (func) {
      return setTimeout(func, 16);
    };
    var frameFunc = function() {
      var progress = (Date.now() - beginTime) / 500;
      if (progress < 1) {
        from.scrollTop = beginValue +  (to.offsetTop - beginValue) * easeInOutCubic(progress);
        rAF(frameFunc);
      } else {
        from.scrollTop = to.offsetTop;
      }
    };
    rAF(frameFunc);
  }