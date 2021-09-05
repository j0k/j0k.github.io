var R = x => x;
R = x => Math.round(x);

var toSec = x => R(x);
var toMin = x => R(x/60);
var toHour = x => R(x/60/60);
var toDay = x => R(x/60/60/24);
var toWeek = x => R(x/60/60/24/7);
var toMonth = x => R(x/60/60/24/30);
var toYear = x => R(x/60/60/24/30/12);

function getTimes(){
  item = document.getElementById("times");
  values = item.value.replace(/[\[\]\s]/g, '');
  values = values.split(',');
  values = values.map(Number);
  return values;
}

function createArrays(){
  times = getTimes();

  funcs = [toSec, toMin, toHour, toDay, toWeek, toMonth, toYear];

  A = funcs.map(x => times.map(x));
  return A;
}

function chooseRepr(){
  var radios = document.getElementsByName('round');


  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      if (radios[i].value === 'int'){
        R = Math.round;
      } else if (radios[i].value === 'nth'){
        var dig = parseInt(document.getElementById("nthDig").value);
        R = x => Math.round((10**dig) * x)/10**dig;
      } else if (radios[i].value === 'none'){
        R = x=>x;
      };

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}

function createTable(){
  chooseRepr();

  A = createArrays(); // 7 x [3]
  t = document.getElementById("tableTimes");

  e0 = A[0];
  for(var i=0; i< e0.length ; i++){
    var minValue = 9999999999;
    var indexMin = -1;
    for(var d=0; d < A.length ; d++){

      if (t.rows.length <= 1+i+1)
        t.insertRow();
      while (t.rows[1+i].cells.length <= 1+d+1)
        t.rows[1+i].insertCell(); //(A[d][i])

      t.rows[1+i].cells[1+d].innerText = (A[d][i]);
      t.rows[1+i].cells[1+d].style.fontWeight = '';
      t.rows[1+i].cells[1+d].style.background = '';


      if ((A[d][i] < minValue) && (A[d][i] >= 1)){
        minValue = A[d][i];
        indexMin = d;
      }

    }

    if (indexMin>=0){
      t.rows[1+i].cells[8].innerText = minValue + " " + t.rows[0].cells[indexMin+1].innerText;
      t.rows[1+i].cells[indexMin+1].style.fontWeight='bold';
      t.rows[1+i].cells[indexMin+1].style.background = '#9f9'
    }


    t.rows[1+i].cells[0].innerText = i+1;
  }
}


var rad = document.getElementsByName('round');
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        // (prev) ? console.log(prev.value): null;
        createTable();
        if (this !== prev) {
            prev = this;
        }
        //console.log(this.value)
    });
}
