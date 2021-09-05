class Homunculus {
  // var x,y,size;

  /// var dt0=1000, dt1 = 1*1000, dt2=2*1000, dt3=1*1000, dt4=5*1000;

  // priv

  constructor(x, y, size){
    this.nPhase = 0;
    this.heart = new Heart(x + size * 0.1, y - size*0.6, size/2);

    this.x = x;
    this.y = y;
    this.size = size;
    this.rH = size*4/5;

    this.dt0=1000;
    this.dt1 = 1*1000;
    this.dt2=2*1000;
    this.dt3=1*1000;
    this.dt4=5*1000;

    this.a     = PI/2;
    this.aLeg  = PI/6;
    this.aHand = PI/1.7;

    this.cBody = 0;
    this.cHead = 0;

    this.n0PT  = 0;
    this.n1PT  = 0;
    this.n2PT  = 0;
    this.n3PT  = 0;
    this.n4PT  = 0; // n1 phase time

    this.hzHand = 30;
    this.handA = 0.4;
  }

  //float a=PI/2;
  //float aLeg=PI/6, aHand=PI/1.7, rH = 0;

  //int cBody, cHead;


  // float n0PT=0, n1PT = 0, n2PT=0, n3PT=0, n4PT; // n1 phase time
  //
  draw(){
    var t = millis();


    strokeWeight(2);
    this.phaseManager();
    if (this.nPhase == 1){
      this.drawPhase1();
    } else if (this.nPhase == 2){
      this.drawPhase1();
      this.drawPhase2();
    }
    else if (this.nPhase == 3){
      this.drawPhase1();
      this.drawPhase2();

    }
    else if (this.nPhase == 4){
      this.drawPhase4();
      this.drawPhase2();
      this.heart.manage();
    }
  }
  //
  phaseManager(){
    var t = millis();
    if (this.nPhase == 0){
      if ((t - this.n0PT ) >= this.dt0){
        this.nPhase ++;
        this.n1PT = t;
        this.cBody = color(random(255), random(255), random(255));
        return;
      }
    }
    else if (this.nPhase == 1){
      if ((t - this.n1PT ) >= this.dt1){
        this.nPhase ++;
        this.n2PT = t;
        this.cHead = color(random(255), random(255), random(255));
        return;
      }
    }
    else if (this.nPhase == 2){
      if ((t - this.n2PT ) >= this.dt2){
        this.nPhase ++;
        this.n3PT = t;
        return;
      }
    }
     else if (this.nPhase == 3){
      if ((t - this.n3PT ) >= this.dt3){
        this.nPhase ++;
        this.n4PT = t;
        return;
      }
    } else if (this.nPhase == 4){
      if ((t - this.n4PT ) >= this.dt4){
        this.nPhase = 0;
        this.n0PT = t;
        return;
      }
    }
  }
  //
  //
  //var phaseTS;
  drawPhase1(){
    let x=this.x, y=this.y;
    let p = (millis() - this.n1PT) / this.dt1;
    p = min(p,1);

    let r = this.size;
    stroke(this.cBody);

    // legs
    let a = this.a;
    let aLeg = this.aLeg;
    line(x,y,x + p*r*cos(a-aLeg), y + p*r * sin(a-aLeg));
    line(x,y,x + p*r*cos(a+aLeg), y + p*r * sin(a+aLeg));

    // body
    line(x,y,x , y - p*r*1.2 );

    // hands
    let yh =  y - r*3.5/5;
    let aHand = this.aHand;
    let rH = this.rH;
    line(x,yh, x + p*rH*cos(a - aHand), yh + p*rH*sin(a - aHand));
    line(x,yh, x + p*rH*cos(a + aHand), yh + p*rH*sin(a + aHand));
  }
  //
  drawPhase2(){
    let p = (millis() - this.n2PT) / this.dt2;
    let x=this.x, y=this.y;
    p = min(p,1);
     // head
    fill(this.cHead);
    stroke(this.cHead);
    ellipse(x,y-this.size*1.1, p*this.size/2.5, p*this.size/2.5);
  }
  //

  //
  drawPhase4(){
    let p = (millis() - this.n1PT) / this.dt1;
    let p4 = (millis() - this.n4PT) / this.dt4;
    let x=this.x, y=this.y;
    p = min(p,1);

    let r = this.size;
    stroke(this.cBody);

    // legs
    let a=this.a;
    let aLeg = this.aLeg;
    let handA = this.handA;
    let aHand = this.aHand;
    let hzHand = this.hzHand;
    let rH = this.rH;
    line(x,y,x + p*r*cos(a-(aLeg+handA*sin(p4*hzHand))), y + p*r * sin(a-(aLeg+handA*sin(p4*hzHand))));
    line(x,y,x + p*r*cos(a+(aLeg+handA*sin(p4*hzHand))), y + p*r * sin(a+(aLeg+handA*sin(p4*hzHand))));

    // body
    line(x,y,x , y - p*r*1.2 );

    // hands
    let yh =  y - r*3.5/5;
    line(x,yh, x + p*rH*cos(a - (aHand + handA*sin(p4*hzHand))), yh + p*rH*sin(a - (aHand + handA*sin(p4*hzHand))));
    line(x,yh, x + p*rH*cos(a + aHand + handA*sin(p4*hzHand)), yh + p*rH*sin(a + aHand + handA*sin(p4*hzHand)));
  }
}
