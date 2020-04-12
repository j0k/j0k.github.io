
var cText=255, cBack=0;
var t,s,fq;
function setup() {
  var clientWidth = document.body.clientWidth;
  var clientHeight = windowHeight;
  var canvas = createCanvas(clientWidth, clientHeight);

  canvas.parent('sketch-holder');

  background(255, 255, 255);
  textAlign(CENTER, CENTER);
  tLast = millis();
  var url = new URL(String(window.location));

  t = url.searchParams.get("t");
  s = url.searchParams.get("s");
  fq = url.searchParams.get("fq");

  if (t && !(t === ""))
    $("#text").val(t);

  if (t == null){
      t = t;
  }

  if (s && !(s === ""))
      $("#textSize").val(s);

  if (s == null){
      s = "60";
  }

  if (fq && !(fq === ""))
      $("#timePeriod").val(fq);

  if (fq == null){
      fq = "0.5";
  }

}

var tLast = 0;
var tP = 1.0; //timePeriod

var firstTime = 1;

function draw() {
  if (firstTime || (millis() - 1000<0)) {
    firstTime = 0;
    if (fq && !(fq === ""))
        $("#timePeriod").val(fq);
  }

  setProgress();
  background(cBack);

  var t = document.getElementById("text").value;
  var tW = int(document.getElementById("textSize").value);
  tP = parseFloat(document.getElementById("timePeriod").value);

  textSize(tW);
  fill(cText)
  text(t, width/2, height/2);
  changeColor();
  setHzLabel();
}

// re-code
function setHzLabel(){
  var hzElem = document.getElementById("hz");
  hzElem.textContent = nf(1/tP, 1, 2);
}

function changeColor(){
  if (millis() >= tLast + tP*1000){
    cText = 255 - cText;
    cBack  = 255 - cBack;
    tLast = millis();
  }
}

var lastP = 1;
function setProgress(){
  var but = $('#audio-progress-bar');
  var p = but.width() / but.parent().width();
  if (p != lastP){
    tP = p;
    lastP = p;
    $("#timePeriod").val(p);
  }
}

function genLink(){
  var href = window.location.origin + window.location.pathname;

  var tp = document.getElementById("text").value; // text param
  var sp = document.getElementById("textSize").value;
  var fqp = document.getElementById("timePeriod").value;

  href += "?t=" + encodeURIComponent(tp) + "&s=" + encodeURIComponent(sp) + "&fq=" + encodeURIComponent(fqp) ;
  console.log(href);
  alert("Location: " + href);
}
