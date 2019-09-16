export function sec2min(duration) {
  var pad = function(num, size) {
      return ("000" + num).slice(size * -1);
    },
    time = parseFloat(duration).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3);

  return pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);
}
