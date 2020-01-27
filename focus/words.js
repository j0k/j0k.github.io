
var eWordsWant;
var eWordsWantText;
var eWordsWantTextElements = [];
window.onload = function(){
  eWordsWant = $("#wordsWant");
  eWordsWantText = eWordsWant.text();
  eWordsWantTextElements = $("#wordsWant").text().split(",").map(x => x.trim());
}
