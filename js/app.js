/*
Author: Shawn S Hillyer
Date: 02-06-2016
Course: CS290-400
Assignment: Week6

Note: Using the Bootstrap basic template for the HTML framework.
Source: http://getbootstrap.com/getting-started/#template
All javascript I wrote is in app.js for this assignment
*/



"use strict";

let apiKey = "fa7d80c48643dfadde2cced1b1be6ca1";
let data = {};

function bindButtons() {
    // Bind reload() to the reset the page button
    document.getElementById("reset-page-btn").addEventListener('click', function(event){
        event.preventDefault();
        location.reload();
    });
    
    document.getElementById('zip-submit').addEventListener('click', function(event){
        let req = new XMLHttpRequest();

        // Build the first part of the query string
        let queryString = "q=" + document.getElementById("zip-code").value + ",us" + "&appid=" + apiKey + "&units=imperial";
        
        
        // Send the GET request with the zip code
        req.open("GET", "http://api.openweathermap.org/data/2.5/weather?" + queryString, false);
        req.send(null);
        event.preventDefault(); // Stops submit button from reloading page
        
        data = JSON.parse(req.responseText);
        
        // Make sure we got a valid code in the response object before trying to update page
        if (data.cod != "404") {
            hideErrorMessage();
            console.log(data);

            console.log("The object returned contains these properties: ");
            for (let property in data) {
                console.log(property);
            }
            displayWeatherInfo(data);
        }
        else {
            displayErrorMessage("The server did not find any data for that entry");
        }
              
    })
}


function displayWeatherInfo(info) {
    console.log(data.name);
    let resultsPanel = document.getElementById("results-panel");
    resultsPanel.removeAttribute("hidden");
    
    // City
    document.getElementById("city").textContent = data.name;
    
    // Current Temperature
    document.getElementById("current-temp").textContent = data.main.temp;
    
    // Humidity
    document.getElementById("humidity").textContent = data.main.humidity + "%";
    
    // Wind Speed
    document.getElementById("wind-speed").textContent = data.wind.speed + " miles per hour";
    
    document.getElementById("city-name").textContent = data.name;
}

function displayErrorMessage(msg) {
    hideWeatherInfo();
    document.getElementById("error-panel").removeAttribute("hidden");
    document.getElementById("error-message").textContent = msg;
}

function hideErrorMessage() {
    document.getElementById("error-panel").setAttribute("hidden", "");
}

function hideWeatherInfo() {
    document.getElementById("results-panel").setAttribute("hidden", "");
}


// I'm using the simple design pattern at http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/js-forms.html to add the event listener once DOm is loaded and bind the buttons, etc.
document.addEventListener('DOMContentLoaded', bindButtons);


// data.weather[0].description  retreives a short description
// data.coord.lon  data.coord.lat   --> longitude and latitude
// data.wind.speed
// data.name -- gives county