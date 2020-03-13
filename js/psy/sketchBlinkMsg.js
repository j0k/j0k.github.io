
var cText=255, cBack=0;
function setup() {
  var clientWidth = document.body.clientWidth;
  var clientHeight = windowHeight;
  var canvas = createCanvas(clientWidth, clientHeight);

  canvas.parent('sketch-holder');

  background(255, 255, 255);
  textAlign(CENTER, CENTER);
  tLast = millis();
}

var tLast = 0;
var tP = 1.0;
function draw() {
  background(cBack);

  var t = document.getElementById("text").value;
  var tW = int(document.getElementById("textSize").value);
  tP = parseFloat(document.getElementById("timePeriod").value);

  textSize(tW);
  fill(cText)
  text(t, width/2, height/2);
  changeColor();

}

function changeColor(){
  if (millis() >= tLast + tP*1000){
    cText = 255 - cText;
    cBack  = 255 - cBack;
    tLast = millis();
  }
}
