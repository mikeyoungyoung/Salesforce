//This is the javascript used to create an onclick button on the Salesforce Case object that will call the Indico.io
//Language detection API and return the most probable language of the case
{
  !REQUIRESCRIPT("/soap/ajax/36.0/connection.js")
} {
  !REQUIRESCRIPT("/soap/ajax/36.0/apex.js")
}
var apiKey = XXXXXXXXX //replace with your indico.io API key
var xhttp = new XMLHttpRequest();
//Get the contents of the description of the case
// *** Note: this is hard coded right now based on the DOM ID of the case description field so there is probably a much better way to do this...
var subject = document.getElementById("cas15_ileinner").innerHTML
var data = JSON.stringify({
  'data': subject
});
xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var obj = JSON.parse(xhttp.responseText);
    var scores = obj.results;
    var scoreArray = [];
    for (var key in scores) {
      if (scores[key] > 0.8) { //pull back languages only if 80% likely or higher, would need fault handling for production grade implementation if none found
        console.log(key + ": " + scores[key]);
        scoreArray += [key, scores[key]];
      }
    }
    alert(scoreArray);
  }
};
xhttp.open("POST", "https://apiv2.indico.io/language?key=apiKey", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(data);
