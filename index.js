$(document).ready(function () {
  init();
});
var quotesReadFromBackup = true;
var loadContentFromApi = function (url, id1, id2) {
  var xhttp = new XMLHttpRequest();
  var currentIndex = 0;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(this.responseText);
      if (res["results"] !== undefined) {
        res = res["results"]
      }
      console.log(res)
      setInterval(function () {
        var currentObj = res[currentIndex];
        currentIndex = (currentIndex < res.length) ? currentIndex + 1 : 0;
        document.getElementById(id1).innerHTML = currentObj[id1];
        document.getElementById(id2).innerHTML = '-' + currentObj[id2];
      }, 10000);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
var loadLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
var showPosition = function (position) {
  $("#location").append("<span>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude + "</span>");
}
var init = function () {
  $(".drag").draggable();
  loadContentFromApi("assets/backup-quotes.js", "content", "author");
  loadContentFromApi("https://ghibliapi.herokuapp.com/films", "title", "description");
  loadLocation();
  setInterval(function () {
    $('#time').html(new Date().toLocaleTimeString())
  }, 1000);
}
var toggle = function () {
  quotesReadFromBackup = !quotesReadFromBackup;
  if (quotesReadFromBackup) {
    $('.toggleQuote').text('Get quotes from api')
    loadContentFromApi("backup-quotes.js", "content", "author");
  } else {
    $('.toggleQuote').text('Get quotes from backup')
    loadContentFromApi("https://api.quotable.io/quotes", "content", "author")
  }
}
