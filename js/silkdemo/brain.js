var mouseInBrain = false;
function drawBrain(signal, homun, r){
  let centerX = width/2;
  let centerY = height/2;

  fill(color(255,125,0));

  //ellipse(centerX, centerY+200, 100,100 );

  fill(color(255,255,0));
  //ellipse(centerX-60, centerY+170, 120,120 );
  //ellipse(centerX+60, centerY+170, 120,120 );

  //bezier(100, 100, 100, 170, 200, 170, 200, 100);
  el20(0, centerX, centerY, r, 1, true);
  el20(0, centerX, centerY, r,-1, false);
  //image(imHR, centerX-320+70,centerY-320-240);
  if (dist(mouseX, mouseY, centerX, centerY)<=r){
    mouseInBrain = true;
    strokeWeight(15);
    let sc =color(0,255,0, 50);
    //image(imHL, centerX-320-390,centerY-320-250 );
    //image(imHR, centerX-320+70,centerY-320-240);
    image(imHL, centerX-r*2.3,centerY -r*1.8);
    image(imHR, centerX-r*0.75,centerY - r*1.75);


    //el20(sc, centerX, centerY, 320,1, false);
    //el20(sc, centerX, centerY, 320,-1, false);

    if (isMousePressed){
      signal.ultraSlowA = random(0,max(signal.ultraSlowAf, signal.ultraSlowAs)*2);
      signal.deltaA = random(0,max(signal.deltaAf, signal.deltaAs)*2);
      signal.thetaA = random(0,max(signal.thetaAf, signal.thetaAs)*2);
      signal.alphaA = random(0,max(signal.alphaAf, signal.alphaAs)*2);
      signal.betaA = random(0,max(signal.betaAf, signal.betaAs)*4);
      signal.gammaA = random(0,max(signal.gammaAf, signal.gammaAs)*6);

      signal.ultraSlow.A = random(0,max(signal.ultraSlowAf, signal.ultraSlowAs)*2);
      signal.delta.A = random(0,    max(signal.deltaAf    , signal.deltaAs)*2);
      signal.theta.A = random(0,    max(signal.thetaAf    , signal.thetaAs)*2);
      signal.alpha.A = random(0,    max(signal.alphaAf    , signal.alphaAs)*2);
      signal.beta.A = random(0,     max(signal.betaAf     , signal.betaAs)*2);
      signal.gamma.A = random(0,    max(signal.gammaAf    , signal.gammaAs)*2);
      homun.cHead = color(random(255), random(255), random(255));
     }
  } else {
    if (isMousePressed){
      homun.cBody = color(random(255), random(255), random(255));
    }
    mouseInBrain = false;
    if (isDblMousePressed){

    }
  }

  //image(imHL, centerX-320-390,centerY-320-250);

  textAlign(CENTER);

  //fill(0);
  strokeWeight(1);
  textSize(20);
  textAlign(RIGHT);
  text("silk", centerX-0, centerY+r*1.6);
  textAlign(LEFT);
  fill(mColor);
  noStroke();
  text("mind", centerX+0, centerY+r*1.6);
  mColor += dmColor;
  if (mColor > 155){
    mColor = 155;
    dmColor = -abs(dmColor);
  }
  else if (mColor < 0){
    mColor = 0;
    dmColor = +abs(dmColor);
  }

}
var mColor=0;
var dmColor = 5;

function el20(strokeColor, xc, yc, r, dv, mozh){
  if (dist(mouseX, mouseY, xc, yc)<=r)
    strokeWeight(2);
  else
    strokeWeight(1);

  let a0 = 0;
  let da = 0.6;
  let a = 0;
  let dam = 0.015;
  let ba = PI/2;
  a = ba;
  if (mozh){
    fill(color(255,125,0));
    noStroke();
    arc(xc, yc + r, r/2, r/2, 0,  +PI);
    //ellipse(xc, yc + r, r/2, r/2);
  }
  for(var i=0;i<8;i++){
    if (i==1)
      da = 0.4;
    let x1 = r * cos(a);
    let y1 = r * sin(a);

    let a2 = dv*da + a;
    da -= dam;
    let x2 = r * cos(a2);
    let y2 = r * sin(a2);

    let xmc = (x1+x2)/2;
    let ymc = (y1+y2)/2;
    let d   = dist(x1,y1,x2,y2);
    fill(color(255,255,255));

    if (i==0){
      noStroke();
      ellipse(xc + xmc, yc + ymc, d/1.05, d/1.05);
    }
    stroke(strokeColor);
    noFill();
    fill(color(0,0,255));
    noFill();
    arc(xmc + xc, ymc + yc, d, d, a-PI/2,  a+PI/2);

    a = a2;
  }
  //arc(50, 50, 800, 800, PI/2, PI+QUARTER_PI, OPEN);

}

function logoText(){
}
