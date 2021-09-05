let homun;
let signal;
let drawer;
let menu;
let heart;

let imHL, imHR;
function preload() {
  imHL = loadImage("assets/homonL.png");
  imHR = loadImage("assets/homonR.png");
}

let wSig;
function setup() {
  var clientWidth = document.body.clientWidth;
  var clientHeight = windowHeight;
  var canvas = createCanvas(clientWidth, clientHeight);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  background(255, 255, 255);

  var w = int(clientWidth/4);
  if (clientWidth/max(600,clientHeight) > 2.3)
    w = int(w/2);
  wSig = w;

  let wSigLen = int(w/1.5);
  signal = new Signal(wSigLen);
  drawer = new Drawer(signal, height/2);
  drawer.x0 = int(clientWidth/2 - wSigLen/2);
  homun = new Homunculus(width/2, height/2-wSig/3, w/14);

  imHL.resize(int(wSig * 1.7),0);
  imHR.resize(int(wSig * 1.55),0);
  menu = new Menu(width/20, height/10);

  //menu.active = false;
  setMenu();
  var processingCanvas = document.getElementById('defaultCanvas0');
  if (processingCanvas != null)
    setClassStyleProperty('footer', 'display', 'none');
}

function draw() {
  background(255, 255, 255);

  signal.calcAndStep();
  drawer.start = signal.start;
  drawer.finish = signal.end;

  drawer.draw();
  drawBrain(signal, homun, wSig/2);

  homun.draw();
  menu.draw();
  //heart.manage();

  updateMouse();
}

var isMousePressed = false; tMousePressed=0;
var isDblMousePressed = false; tDblMousePressed=0;
function mousePressed(){

  tMousePressed = millis();
  if (isMousePressed){
    isDblMousePressed = true;
    tDblMousePressed  = millis();
  }
  isMousePressed = true;

}

function updateMouse(){
  if (millis() - tMousePressed > 250){
    isMousePressed = false;
  }
  if (millis() - tDblMousePressed > 350){
    isDblMousePressed = false;
  }
}

let fixedMenu = false;
function setMenu(){
  if (menuState === 'on'){
    fixedMenu = true;
  } else {
    fixedMenu = false;
  }
}

function changeWindowSize() {
  setup();
}

window.onresize = changeWindowSize;
var langButton = document.getElementById('language');
var menuButton = document.getElementById('menu');
menuButton.checked = false;
var lang = 'en'
var langInd = 0;

var menuState = 'off'

langButton.addEventListener("click", function() {
  lang = (this.checked) ? 'en' : 'ru';
  langInd = ['en', 'ru'].indexOf(lang);
  setup();
  //console.log(lang);
}, false);

menuButton.addEventListener("click", function() {
  menuState = (this.checked) ? 'on' : 'off';
  setMenu();
  //langInd = ['en', 'ru'].indexOf(lang);

  setup();
  console.log(menuState);
}, false);

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "interactive") {
         //same as:  ..addEventListener("DOMContentLoaded".. and   jQuery.ready
    }

    if (event.target.readyState === "complete") {
      setTimeout(function() {
        var processingCanvas = document.getElementById('defaultCanvas0');
        if (processingCanvas == null)
          setClassStyleProperty('footer', 'display', '');
      }, 2000);
    }
});


// progress
var i = 0;
function moveProgress() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
moveProgress();
