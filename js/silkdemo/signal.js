class Generator {
  calc(){}
  step(){}
}

class Wave extends Generator {

  constructor(hz, A, phi){
    super();
    this.c   = 0;

    this.hz  = hz;
    this.A   = A;
    this.phi = phi;
    this.x = 0;
    this.cA = 0.5;
  }

  calc(){
    var y = this.c + this.cA* this.A*sin(this.hz * this.x + this.phi);
    return y;
  }

  step(){
    this.x += 1;
  }
}

class RandSignal extends Generator {
  constructor(){
      super();
      this.prev = 0;
      this.y = 0;
      this.x = 0;
  }

  calc(){
    let y = this.prev + 5*(-1 + random(2));
    return y;
  }

  step(){
    this.prev =  this.y;
    this.x += 1;
  }
}

class Signal extends Generator{


  // Generator ultraSlow, delta, theta, alpha, beta, gamma;
  // float ultraSlowAs,ultraSlowAf, ultraSlowA;
  // float deltaAs, deltaAf, deltaA;
  // float thetaAs, thetaAf, thetaA;
  // float alphaAs, alphaAf, alphaA;
  // float betaAs, betaAf, betaA;
  // float gammaAs, gammaAf, gammaA;
  // //float ultraSlowAs,ultraSlowAf;
  // //float delta, theta, alpha, beta, gamma;
  // Generator randSign;

  constructor(w){
    super();
    this.sig = [];
    this.start = 0;
    this.end = 0;
    this.gAmp = 0;
    this.setup(w);
  }
  //
  setup(w){
    var cHz = 0.02;
    this.ultraSlow = new Wave(0.2 * cHz,100,0);
    this.delta = new Wave(2 * cHz,100,0);
    this.theta = new Wave(6 * cHz,1,0);
    this.alpha = new Wave(10 * cHz,0,0);
    this.beta  = new Wave(25 * cHz,10,0);
    this.gamma = new Wave(40 * cHz,0,0);

    this.ultraSlowAs = 30;
    this.ultraSlowA  = 30;
    this.ultraSlowAf = 2;

    this.deltaAs = 20;
    this.deltaA  = 20;
    this.deltaAf = 3;

    this.thetaAs = 0;
    this.thetaA  = 0;
    this.thetaAf = 3;

    this.alphaAs = 60;
    this.alphaA  = 60;
    this.alphaAf = 20;

    this.betaAs = 0;
    this.betaA  = 0;
    this.betaAf = 30;

    this.gammaAs = 0;
    this.gammaA  = 0;
    this.gammaAf = 20;

    this.randSign = new RandSignal();

    this.sig = Array.apply(null, Array(w)).map(x => 0);
    for(var i=0; i<w; i++){
      this.sig[i] = 0;
    }
    this.end = w-1;
    // console.log(this.sig);
  };
  //

  calc(){
    let ultraSlowY = this.ultraSlow.calc();
    let deltaY = this.delta.calc();
    let thetaY = this.theta.calc();
    let alphaY = this.alpha.calc();
    let betaY  = this.beta.calc();
    let gammyY = this.gamma.calc();

    let r = this.randSign.calc();
    let y = ultraSlowY + deltaY + thetaY + alphaY + betaY + gammyY;//randSign.calc();
    let rs = this.randSign;
    let mouseAmp = abs(pmouseX - mouseX) + abs(pmouseY - mouseY);
    //println(" "+y + " " + rs.y + " " + rs.prev + " " + mouseAmp);

    return y;
  }

  step(){
    this.randSign.step();
    this.ultraSlow.step();
    this.delta.step();
    this.theta.step();
    this.alpha.step();
    this.beta.step();
    this.gamma.step();
  };
  //
  lerpWave(){
    let th = 50;
    let c  = 0.01;
    let r  = random(0.01);
    let mouseAmp = abs(pmouseX - mouseX) + abs(pmouseY - mouseY);

    if (mouseAmp > th){
       this.ultraSlowA = lerp(this.ultraSlowA, this.ultraSlowAf, c + r);
       this.deltaA     = lerp(this.deltaA, this.deltaAf, c + r);
       this.thetaA     = lerp(this.thetaA, this.thetaAf, c + r);
       this.alphaA     = lerp(this.alphaA, this.alphaAf, c + r);
       this.betaA      = lerp(this.betaA,  this.betaAf,  c + r);
       this.gammaA     = lerp(this.gammaA, this.gammaAf, c + r);
    } else {
      this.ultraSlowA = lerp(this.ultraSlowA, this.ultraSlowAs, c + r);
      this.deltaA     = lerp(this.deltaA, this.deltaAs, c + r);
      this.thetaA     = lerp(this.thetaA, this.thetaAs, c + r);
      this.alphaA     = lerp(this.alphaA, this.alphaAs, c + r);
      this.betaA      = lerp(this.betaA,  this.betaAs,  c + r);
      this.gammaA     = lerp(this.gammaA, this.gammaAs, c + r);
    }

    this.upA();
  }
  //
  upA(){
    this.ultraSlow.A = this.ultraSlowA;
    this.delta.A     = this.deltaA;
    this.theta.A     = this.thetaA;
    this.alpha.A     = this.alphaA;
    this.beta.A      = this.betaA;
    this.gamma.A     = this.gammaA;
  }
  //
  checkInc(v, w, d){
    var v2 = v + 1*d;
    if (v2<0)
      v2 = w-1;

    v2 %= w;
    return v2;
  }
  //
  //
  calcAndStep(){
    let y = this.calc();
    let w = this.sig.length;

    this.start = this.checkInc(this.start, w, +1);
    var prevPoint = this.checkInc(this.start, w, -1);

    this.end = this.checkInc(this.end, w, +1);
    var prevLastPoint = this.checkInc(this.end, w, -1);
    this.sig[this.end] = y;//s.sig[prevLastPoint];

    this.step();
    this.lerpWave();
  }
};
