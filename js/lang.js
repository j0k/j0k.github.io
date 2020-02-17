function setClassStyleProperty(cls, prop, value){
  items = document.getElementsByClassName(cls);
  for (var i=0;i<items.length;i++){
    items[i].style[prop] = value;
  }
}

function handleLanuageChange(cb) {
  if (cb.checked) {
    // check en
    setClassStyleProperty('ru', 'display', 'none')
    setClassStyleProperty('en', 'display', '')
  } else {
    // check ru
    setClassStyleProperty('en', 'display', 'none')
    setClassStyleProperty('ru', 'display', '')
  }
  // document.getElementById("debug").innerHTML = "whatever "+ cb.checked;
}


function ready() {
   handleLanuageChange(document.getElementById('language'));
 }

document.addEventListener("DOMContentLoaded", ready);
