{
  !REQUIRESCRIPT("/soap/ajax/36.0/connection.js")
} {
  !REQUIRESCRIPT("/soap/ajax/36.0/apex.js")
}
var apiKey = XXXXXXXXXXXX //replace this with your indico.io API key
var xhttp = new XMLHttpRequest();
var subject = document.getElementById("tsk6_ileinner").innerHTML  //hard coded to body of task or email field ID, may need modification in your org
var data = JSON.stringify({
  'data': subject,
  'top_n': 3 // only pull back the top 3 results
});
xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    //console.log(data); 
    //console.log(xhttp.responseText); 
    var obj = JSON.parse(xhttp.responseText);
    var scores = obj.results;
    var scoreArray = [];
    for (var key in scores) {
      console.log(key + ": " + scores[key]);
      scoreArray += [key, scores[key]];
    }
    alert(scoreArray);
  }
};
xhttp.open("POST", "https://apiv2.indico.io/texttags?key=apiKey", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(data);
