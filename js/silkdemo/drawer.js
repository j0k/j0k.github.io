  class Drawer {

  constructor(signal, y0){
    this.start = 0;
    this.finish = 0;

    this.x0 = 0;
    this.y0 = 0;

    this.s  = signal;
    this.w  = this.s.sig.length;
    this.y0 = y0;
  }

  draw(){
    stroke(0);
    let w = this.w;

    let wF=w/3; // w of fading
    if (this.finish < this.start){

      for(var i=this.start; i<this.w-1; i++){
        let coef = 1;
        if ((i-this.start) < wF){
          coef = min((i-this.start) / wF, 1);
        }
        if ((i-this.start) > w-wF){
          coef = min((w - (i-this.start)) / wF, 1);
        }

        line(this.x0 + i-this.start  , this.y0 + this.s.sig[i]   * coef,
             this.x0 + i+1-this.start, this.y0 + this.s.sig[i+1] * coef);
      }

      for(var i=0; i<this.start-1; i++){
        var coef = 1;
        var l = i+(this.w-this.start);

        if (l <= wF){
          coef = min(abs(l / wF), 1);
        }
        else if (l >= w - wF){
          coef = min(abs((w - l) / wF), 1);
        }

        //println("coef = " + coef);
        line(this.x0 + l  , this.y0 + this.s.sig[i]   * coef,
             this.x0 + l+1, this.y0 + this.s.sig[i+1] * coef);
      };
    }

    this.debug();
  }

  debug(){
    //println(str(start) + " " + str(finish));
  }
}
