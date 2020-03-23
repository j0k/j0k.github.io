class Item {
  constructor(menu, text, x, y, w, h, active){
    this.menu = menu;
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.active = active;
    this.inactColor = color(200,200,200,220);
    let p = 255/100;
    this.actColor   = color(70 * p, 62 * p, 80 * p);

  }

  draw(){
    noStroke();
    var textColor = 87;
    if (!this.active)
      textColor = 157;
    //stroke(textColor);

    if (mouseInRect(this)){
      this.menu.timeIn = millis();
    }

    if (this.active && mouseInRect(this)){

      fill(this.actColor);
      textColor = 0;
      noStroke();
      this.drawEllipse(this.x-20, this.y + this.h/2, 10);
      if(isMousePressed && !isDblMousePressed){
        this.menu.timeIn = 0;
        isMousePressed = false;
        this.action();
        //this.menu.active = false;
        //this.active = true;
      }
    }
    else{
      fill(this.inactColor);
      noStroke();
      //stroke(127);
    }
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h);
    textAlign(LEFT, CENTER);
    textSize(15);
    strokeWeight(1);
    fill(textColor);
    text(this.text, this.x + 10, this.y + this.h/2);
  }

  action(){

  }

  drawEllipse(x,y,r){
    let r2x = r * abs(sin(millis()/500));
    let r2y = r * abs(cos(millis()/400));
    ellipse(x,y,r2x, r2y);

  }
}

class Menu{

  constructor(x,y){
    this.items = [];
    this.active = false;
    this.liveTime = 1000;

    let w = 200;
    let h = 35;
    var title = ["", ""];
    var i = 1;
    var titles = [
      ["-=:[ MENU ]:=-", "-=:[ МЕНЮ ]:=-"],
      ["Open Mind", "Распахнуть сознание"],
      ["Homunculus ?", "Гомункулус ?"],
      ["EEG/BCI ?", "ЭЭГ/МКИ ?"],
      ["Neu-Jitsu", "Ней-Джитсу"],
      ["Neurofeedback", "Нейрофидбек"],
      ["Algorithmics Delight", "Очарование алгоритмов"],
      ["Logo", "Logo"]
    ]

    for (var i = 0; i< titles.length; i++){
      title = titles[i][langInd];
      var it = new Item(this, title, x, y + (h + 3)*i , w, h, true);
      this.items.push(it);
    }

    this.items[1].action = function(){
      window.open("about.html", "_self");
    }

    this.items[2].action = function(){
      window.open("https://en.wikipedia.org/wiki/Cortical_homunculus", "_blank");
    }

    this.items[3].action = function(){
      let urls = [
        "https://en.wikipedia.org/wiki/Brain%E2%80%93computer_interface",
        "https://ru.wikipedia.org/wiki/%D0%9D%D0%B5%D0%B9%D1%80%D0%BE%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%BD%D1%8B%D0%B9_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%84%D0%B5%D0%B9%D1%81"
      ];

      window.open(urls[langInd], "_blank");
    }

    this.items[4].action = function(){      
      window.open("neujitsu/index.html", "_self");
    }

    this.items[7].action = function(){
      window.open("logo.html", "_blank");
    }


    https://en.wikipedia.org/wiki/Brain%E2%80%93computer_interface
    this.items[0].active = false;
    // this.items[4].active = false;
    this.items[5].active = false;
    this.items[6].active = false;

    if (fixedMenu)
      this.active = true;
  }

  draw(){
    noStroke();
    if (this.items.length > 0 ){
      let d = max(1,dist(mouseX, mouseY, this.items[0].x, this.items[0].y)/100);
      let pLive = ((millis() - this.timeIn) / this.liveTime) * d;

      if (pLive <=0.05)
        pLive = 0;
      pLive = min(pLive, 1);

      this.checkMouse(pLive);
      if (this.active){
        fill(this.items[0].actColor); stroke(this.items[0].actColor);
        rect(this.items[0].x, this.items[0].y-10, this.items[0].w*(1-pLive), 5);

        for(var i=0; i<this.items.length;i++){
          this.items[i].draw();
        }
      }
    }
  }

  checkMouse(pLive){
    if ( (pLive>=1.0 && this.active )){
      this.active = false;
      //isDblMousePressed = false;
    }

    //console.log(pLive);
    if (isDblMousePressed && !mouseInBrain && (pLive>=1 || isNaN(pLive))){
      this.active = true;
      let my = mouseY - 10;
      for(var i=0; i<this.items.length;i++){
        this.items[i].x = mouseX-10;
        this.items[i].y = my + (this.items[i].h+3)*i;
      }
    }

    if (fixedMenu)
      this.active = true;
  }
}

function inRect(x,y,r){
  if ((x>=r.x && x<=r.x + r.w) && (y >= r.y && y <= r.y+r.h))
    return true;
  else
    return false;
}

function mouseInRect(r){
  return inRect(mouseX, mouseY, r);
}
