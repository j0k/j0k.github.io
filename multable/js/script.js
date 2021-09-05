function createTable(){
  ///chooseRepr();

  var A=[]; // 7 x [3]
  tm = document.getElementById("mulTable");
  var t = document.createElement("table");

  var leftI = 0;
  var row   = 0;
  for(var i = 0; i < 16; i++){
    A.push([]);
    for (var j= 0; j < 16; j++){
        A[i].push(i*j);
    }
  }

  // create head
  var bases = [];
  for (var i=0;i<=35; i ++){
    var e = document.getElementById("bid" + i);
    if (e && e.checked){
      bases.push(i);
    }
  }

  // var bases = [2,3,10,16];
  //console.log(A);
  for(var row=0; row<17; row++){
    t.insertRow();
    if (row == 0){
      t.rows[0].insertCell();
      for(var v=0; v<16; v++){
        t.rows[0].insertCell();

        var sp = createSpan(bases, v, A);

        t.rows[0].cells[v+1].appendChild(sp);
      }
    } else {
      for(var ind=0; ind<17; ind++){
        t.rows[row].insertCell();

        if (ind == 0){
          var sp = createSpan(bases, row-1, A);
          t.rows[row].cells[0].appendChild(sp);
        } else {
          var sp = createRawSpan(bases, (ind - 1) * (row - 1), A);
          t.rows[row].cells[ind].appendChild(sp);
        }
      }
    }

  }

  t.id = "mulTable";
  tm.replaceWith(t);
  //tm.id = "mulTable";
}

function createBaseHead(){
  var bases = document.getElementById("digs");
  bases.innerHTML = '';
  var t     = document.createElement("table");
  bases.appendChild(t);
  t.insertRow();
  var ind = 0;
  var row = 0;
  var inR = 8; // in row
  // bases.appendChild(t);
  for(var i = 2; i<=35; i++){
    var sp = document.createElement("div");
    var bi = document.createElement("input"); // base input
    var l = document.createElement("label");

    bi.type = "checkbox";
    bi.id   = "bid" + i;
    l.textContent = i.toString(2) + " " + i.toString() + " " + i.toString(16)+ " " + i.toString(i+1);

    sp.appendChild(bi);
    sp.appendChild(l);
    //console.log(sp);

    if (ind % (inR) == 0){
      //var br = document.createElement("br"); // base input
      //console.log("row", i, inR, row);
      t.insertRow();
      row ++ ;
      //t.rows[0].insertCell();
    }


    t.rows[row].insertCell(); //(A[d][i])
    //console.log(ind, parseInt(ind / inR));
    t.rows[row].cells[ind % inR].appendChild(sp);
    // bases.appendChild(bi);
    // bases.appendChild(l);
    ind ++ ;
  }

  document.getElementById("bid2").checked = true;
  document.getElementById("bid3").checked = true;
  document.getElementById("bid10").checked = true;
  document.getElementById("bid16").checked = true;

  for(var i =2;i<=35;i++){
    var title = "bid"+i;
    //console.log(title);
    var e = $('#'+title);
    e.change(createTable);
  }
}


function createSpan(bases, v, A){
  var obj = document.createElement("div");
  for(var bi=0; bi<bases.length; bi++){
    var base = bases[bi];
    l = document.createElement("label");
    l.textContent = A[1][v].toString(base);
    obj.appendChild(l);
    br = document.createElement("br");
    obj.appendChild(br);
  }
  return obj;
}

function createRawSpan(bases, v, A){
  var obj = document.createElement("div");
  for(var bi=0; bi<bases.length; bi++){
    var base = bases[bi];
    l = document.createElement("label");
    l.textContent = v.toString(base);
    obj.appendChild(l);
    br = document.createElement("br");
    obj.appendChild(br);
  }
  return obj;
}
//createBaseHead();

document.onreadystatechange = function() {
  createBaseHead();
  createTable();
}
