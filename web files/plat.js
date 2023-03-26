var player;
var leftlazer;
var platform;
var platform2;
var gravity = 0;
function offsetOverlap(a, b) {
  let xa = a.offsetLeft;
  let ya = a.offsetTop;
  let ha = a.offsetHeight;
  let wa = a.offsetWidth;
  let xb = b.offsetLeft;
  let yb = b.offsetTop;
  let wb = b.offsetWidth;
  let hb = b.offsetHeight;
  let xa2 = xa + wa;
  let ya2 = ya + ha;
  let xb2 = xb + wb;
  let yb2 = yb + hb;
  if (
    ((xa >= xb && xa <= xb2) ||
      (xb >= xa && xb <= xa2) ||
      (xa2 <= xb2 && xa2 >= xb) ||
      (xb2 <= xa2 && xb2 >= xa)) &&
    ((ya >= yb && ya <= yb2) ||
      (ya <= yb && yb <= ya2) ||
      (ya2 <= yb2 && ya2 >= yb) ||
      (yb2 <= ya2 && yb2 >= ya))
  ) {
    return true;
  } else {
    return false;
  }
}
function testforfall() {
  if (
    offsetOverlap(leftlazer, platform) ||
    offsetOverlap(leftlazer, platform2)
  ) {
    if (offsetOverlap(leftlazer, platform)) {
      var plattouch = platform;
    } else {
      var plattouch = platform2;
    }
    if (offsetOverlap(player, plattouch)) {
      gravity = -0.5;
      player.style.top =
        parseFloat(window.getComputedStyle(player).top.split("px")[0]) +
        gravity +
        "px";
    } else {
      gravity = 0;
    }
  } else {
    if (gravity < 6.95) {
      gravity += 0.05;
    } else {
      gravity = 7;
    }
    //console.info(gravity)
    player.style.top =
      parseFloat(window.getComputedStyle(player).top.split("px")[0]) +
      gravity +
      "px";
  }
  //console.info('falltest')
}
var curkey = [, ,];
document.addEventListener("keydown", (event) => move(event));
document.addEventListener("keyup", (event) => antimove(event));
function move(even) {
  curkey[even.keyCode] = true;
  //console.info(curkey.keyCode)
  //console.info('movetest')
}
function antimove(evennt) {
  curkey[evennt.keyCode] = false;
  //console.info(curkey.keyCode)
}
function testformove() {
  if (curkey[37] /*left*/) {
    player.style.left =
      parseFloat(window.getComputedStyle(player).left.split("px")[0]) +
      -2 +
      "px";
  }
  if (curkey[39] /*right*/) {
    player.style.left =
      parseFloat(window.getComputedStyle(player).left.split("px")[0]) +
      2 +
      "px";
  }
  if (
    curkey[38] /*up*/ &&
    (offsetOverlap(leftlazer, platform) || offsetOverlap(leftlazer, platform2))
  ) {
    gravity = -4;
    player.style.top =
      parseFloat(window.getComputedStyle(player).top.split("px")[0]) +
      gravity +
      "px";
  }
  if (
    curkey[40] /*down*/ &&
    (offsetOverlap(leftlazer, platform) || offsetOverlap(leftlazer, platform2))
  ) {
    gravity = -6;
    player.style.top =
      parseFloat(window.getComputedStyle(player).top.split("px")[0]) +
      gravity +
      "px";
  }
}
function intervalother() {
  leftlazer.style.left =
    window.getComputedStyle(player).left.split("px")[0] + "px";
  leftlazer.style.top =
    parseInt(window.getComputedStyle(player).top.split("px")[0]) +
    parseInt(window.getComputedStyle(player).height.split("px")[0]) +
    "px";
  //console.info('otherinterval')
}
function definevars() {
  player = document.getElementById("player");
  leftlazer = document.getElementById("lazer1");
  platform = document.getElementById("platform");
  platform2 = document.getElementById("platform2");
  const falltest = setInterval(testforfall, 1);
  const movetest = setInterval(testformove, 1);
  const otherinterval = setInterval(intervalother, 1);
}
