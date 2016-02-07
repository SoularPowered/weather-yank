/*
Author: Shawn S Hillyer
Date: 02-06-2016
Course: CS290-400
Assignment: Week6

Note: Using the Bootstrap basic template for the HTML framework.
Source: http://getbootstrap.com/getting-started/#template
All javascript I wrote is in app.js for this assignment
*/

// I'm using the simple design pattern at http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/js-forms.html to add the event listener once DOm is loaded and bind the buttons, etc.

"use strict";

let apiKey = "fa7d80c48643dfadde2cced1b1be6ca1";
let data = {};

function bindButtons() {
    document.getElementById('zip-submit').addEventListener('click', function(event){
        let req = new XMLHttpRequest();

        // Build the first part of the query string
        let queryString = "q=" + document.getElementById("zip-code").value + ",us";
        
        
        // Send the GET request with the zip code
        req.open("GET", "http://api.openweathermap.org/data/2.5/weather?" + queryString + "&appid=" + apiKey, false);
        req.send(null);

        data = JSON.parse(req.responseText);
        console.log(data);

        console.log("The object returned contains these properties: ");
        for (let property in data) {
            console.log(property);
        }
        
        event.preventDefault(); // prevent page from reloading on click of form submit button
        
        updateWeatherInfo(data);
              
    })
}


function updateWeatherInfo(info) {
    console.log(data.name);
}


document.addEventListener('DOMContentLoaded', bindButtons);


// data.weather[0].description  retreives a short description
// data.coord.lon  data.coord.lat   --> longitude and latitude
// data.wind.speed
// data.name -- gives county