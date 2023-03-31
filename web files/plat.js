var player;
var bottomlazer;
var platforms;
var weight = 0.05;
var inweight;
var height = -4;
var inheight;
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
function changeweight() {
  weight = inweight.value;
}
function changeheight() {
  height = inheight.value;
}

function betterfall() {
  console.log(platforms);
  for (let elem = 0; elem < platforms.length; elem++) {
    console.log(elem);
    let plat = platforms[elem];
    if (offsetOverlap(bottomlazer, plat)) {
      if (offsetOverlap(player, plat)) {
        gravity = -0.5;
      } else {
        gravity = 0;
      }
      player.style.top =
        parseFloat(window.getComputedStyle(player).top.split("px")[0]) +
        gravity +
        "px";
      console.log("undefined");
      return undefined;
    }
  }
  if (gravity < 6.95) {
    gravity += weight;
  } else {
    gravity = 7;
  }
  player.style.top =
    parseFloat(window.getComputedStyle(player).top.split("px")[0]) +
    gravity +
    "px";
}
var curkey = [];
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
  if (curkey[38]) {
    for (let elem = 0; elem < platforms.length; elem++) {
      let plat = platforms[elem];
      if (offsetOverlap(bottomlazer, plat)) {
        gravity = height;
        player.style.top =
          parseFloat(window.getComputedStyle(player).top.split("px")[0]) +
          gravity +
          "px";
      }
    }
  }
  if (curkey[40]) {
    for (let elem = 0; elem < platforms.length; elem++) {
      let plat = platforms[elem];
      if (offsetOverlap(bottomlazer, plat)) {
        gravity = height * 1.5;
        player.style.top =
          parseFloat(window.getComputedStyle(player).top.split("px")[0]) +
          gravity +
          "px";
      }
    }
  }
}

function intervalother() {
  bottomlazer.style.left =
    window.getComputedStyle(player).left.split("px")[0] + "px";
  bottomlazer.style.top =
    parseInt(window.getComputedStyle(player).top.split("px")[0]) +
    parseInt(window.getComputedStyle(player).height.split("px")[0]) +
    "px";
  //console.info('otherinterval')
}
function definevars() {
  player = document.getElementById("player");
  bottomlazer = document.getElementById("lazerbottom");
  platforms = document.getElementsByClassName("platforms");
  inweight = document.getElementById("jumpweight");
  inheight = document.getElementById("jumpheight");
  const falltest = setInterval(betterfall, 1);
  const movetest = setInterval(testformove, 1);
  const otherinterval = setInterval(intervalother, 1);
}
