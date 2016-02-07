"use strict";

var req = new XMLHttpRequest();

var queryString = "Corvallis,or";
var apiKey = "fa7d80c48643dfadde2cced1b1be6ca1";

req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + queryString + "&appid=" + apiKey, false);
// console.log("Sending: " );
req.send(null);

var weather = JSON.parse(req.responseText);
console.log(weather);


console.log("The object returned contains these properties: ");
for (let property in weather) {
    console.log(property);
}