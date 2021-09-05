class Heart {
  constructor(x, y, d){
    this.x = x;
    this.y = y;
    this.d = d;

    this.dt = [100,100,100,100,1000];
    this.dp = [-1,+1,-1,+1,0];

    this.dtSum = this.dt.reduce((x,y) => x+y, 0);

    this.tIn = 0;
    this.phase = 0;
  }

  insideArray(timePassed){
    var t = 0;
    for(var i=0 ; i<this.dt.length; i++){
      if (timePassed < t + this.dt[i]) {
        var p = (timePassed - t) / this.dt[i]
        if (this.dp[i] == -1)
          p = 1 - p;
        else if (this.dp[i] == 0)
          p = 1;

        return [i,p];
      } else {
        t += this.dt[i];
      }
    }
    return [this.dt.length - 1, 1];
  }

  manage(){
    if (millis() - this.tIn > this.dtSum){
      this.tIn = millis();
    }

    var p = 0;
    var tPass = millis() - this.tIn;
    [this.phase, p] = this.insideArray(tPass);
    this.draw(p);

  }

  draw(p){
    let t = millis();
    let tCyc = (t - this.tIn);
    let nP = 0; // n. of Phase
    if (millis() > this.dt1+this.dt2+this.dt3){

    }
    //p = 1-abs(cos(millis()/300));
    noStroke();
    fill(color(255,0,0));
    let r = this.d/2;
    triangle(this.x,this.y + p*r*1.2,this.x-r*p,this.y, this.x,this.y);
    triangle(this.x,this.y + p*r*1.2,this.x+r*p,this.y, this.x,this.y);
    arc(this.x-p*r/2+p*r/20, this.y+1, p*(r + r/10), p*r, PI,  2*PI);
    arc(this.x+p*r/2-p*r/20, this.y+1, p*(r + p*r/10), p*r, PI,  2*PI);

  }
}
