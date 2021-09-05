// https://www.openprocessing.org/sketch/854987

let photo, maskImage, maskImage2;
var n=640;
var ps= [];
var pg;

function preload() {
   photo = loadImage('./../img/herejustnow.jpg');
   maskImage = loadImage("./../assets/brainMask3.png");
   maskImage2 = loadImage("./../assets/brainMask4.png");
}
//
function setup() {
  var clientWidth = document.body.clientWidth;
  var clientHeight = windowHeight;
  var imItem = document.getElementById('imObjBrainMask');
  var canvas = createCanvas(imItem.offsetWidth, imItem.offsetHeight-10);
  //var canvas = createCanvas(maskImage2.width, maskImage2.height);
  //maskImage2
  //pg = createGraphics(clientWidth, clientHeight);

  canvas.parent('sketch-holder');
  background(255, 255, 255);
  //createCanvas(maskImage.width-10, maskImage.height-10);
  //photo.mask(maskImage);
  image(photo, width/3-(photo.width/2), height/2-(photo.height/2));

  for (let i=0; i<n; i++)
    ps[i]=  createVector(random(width), random(height));
  //background(0);
  colorMode(HSB);
}

var dc = 0.01;
var c=0, cNext=1;
function draw() {
  c = lerp(c,cNext,dc);
  fill('rgba(0, 0, 0, 0.01)');
  noStroke();
  rect(0, 0, width, height);
  stroke(255);
  let f0= 0.002*frameCount + c;
  let f1= 0.015*frameCount + c;
  let f2= 0.01*frameCount + c;
  for (let i=0; i<n; i++) {
    let p= ps[i];
    let ang=(noise( 0.003*p.x + f0, 0.003*p.y ))*4*PI;
    let v= createVector(0.7*cos(ang)+ 0.4*cos(f1), 0.7*sin(ang) + 0.4* cos(f2));
    p.add(v);
    if ( random(1.0)<0.01 ||p.x<0 || p.x>width || p.y<0 || p.y>height)
      ps[i]= createVector(random(width), random(height));
    let magSq= v.magSq();
    strokeWeight(1 + 0.5/(0.004+magSq));
    stroke(100*sqrt(magSq), 255, 255);
    point(p.x, p.y);

    //canvas.mask(maskImage);
    //image(maskImage,-5,-5);
    //tint(255, 100);
    //image(maskImage2,-5,-5);
  }
  if (mouseX > 0 && mouseY<width && mouseY >0 && mouseY < height){
    if (pmouseX != mouseX || pmouseY != mouseY)
      cNext += 0.05 * (mouseX - pmouseX)  +  0.05 * (mouseY - pmouseY) ;
  }

}

function mousePressed(){
  cNext += 1;
}
