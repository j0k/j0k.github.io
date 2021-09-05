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
  var url = new URL(String(window.location));
  var l = url.searchParams.get("l")
  if (l === "en")
    document.getElementById('language').checked = true;
  else if (l === "ru")
    document.getElementById('language').checked = false;

  handleLanuageChange(document.getElementById('language'));
}

document.addEventListener("DOMContentLoaded", ready);
