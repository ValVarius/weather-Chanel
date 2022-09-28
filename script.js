// targeting the dynamic element of the page
var searchButton = $("#button-addon2");
var inputSpace = $("#inputSpace");
var list = $("#list");
// today's card
var currentCity = $(".currentCity");
var currentIcon = $("#currentIcon");
var currentTemperature = $(".currentTemperature");
var currentHumidity = $(".currentHumidity");
var uvIndex = $(".uvIndex");
var uvNumber = $("#uvNumber");
var wind = $(".wind");
// 5 days cards
var day1 = $("#day1-title");
var icon1 = $("#icon1");
var dayTemp1 = $("#tempday1");
var dayHumid1 = $("#humiday1");

var day2 = $("#day2-title");
var icon2 = $("#icon2");
var dayTemp2 = $("#tempday2");
var dayHumid2 = $("#humiday2");

var day3 = $("#day3-title");
var icon3 = $("#icon3");
var dayTemp3 = $("#tempday3");
var dayHumid3 = $("#humiday3");

var day4 = $("#day4-title");
var icon4 = $("#icon4");
var dayTemp4 = $("#tempday4");
var dayHumid4 = $("#humiday4");

var day5 = $("#day5-title");
var icon5 = $("#icon5");
var dayTemp5 = $("#tempday5");
var dayHumid5 = $("#humiday5");

var base = "https://api.openweathermap.org/data/2.5/forecast"; //lat=35&lon=139
var city = "";
var key = "&appid=b4d27d3778961482cb9a9ec700e8650e";
var cityCounter = 0;
var lat = "";
var lng = "";
var stored = allStorage();
// console.log(stored);
function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values;
}

function retrieve() {
  //Storing all the keys into an Array
  var k = Object.keys(localStorage);
  var v = Object.values(localStorage);
  console.log(k);
  console.log(k.length);
  console.log(v[0]);
  console.log(v.length);

  // set the counter to the maximum index plus one
  // Loops creates as many il as there are cities stored in the local storage and displays their names
  for (let i = 0; i < k.length; i++) {
    if (cityCounter < k[i]) {
      cityCounter = k[i];
    }

    var newItem = $("<li>", { class: "list-group-item" });
    var newSpan = $("<span>", { class: "delete" });
    newItem.text(v[i].toUpperCase());
    newSpan.text("x");
    newItem.append(newSpan);
    $(".list-group").append(newItem);

    // Loops assigns a click event to each delete button next to the city name
    $(".delete").click(function () {
      console.log(this);

      $(this).text("");
      console.log($(this).closest("li").text());

      var deletedName = $(this).closest("li").text();
      $(this).closest("li").remove();
      // look for name in local storage and delete it.
      console.log(v);
      for (let i = 0; i < v.length; i++) {
        if (v[i] === deletedName) {
          localStorage.removeItem(k[i]);
        }
      }
    }); //Endo of delete click
  }
  // adding click event to the old items to display the data again
  $(".list-group-item").click(function () {
    console.log(
      $(this)
        .text()
        .substr(0, $(this).text().length - 1)
    );
    var input = $(this).text();
    input = input.substr(0, input.length - 1);
    if (input) {
      city = "?q=" + input + "&units=imperial";
      search();
    }
  }); //Endo of display click
} //END of the retrieve function

function addToScreen(name) {
  console.log(name);
  // appending new city
  var newItem = $("<li>", { class: "list-group-item" });
  var newSpan = $("<span>", { class: "delete" });
  newItem.text(name);
  newSpan.text("x");
  newItem.append(newSpan);
  $(".list-group").append(newItem);
  // adding click event to new item to be deleted by the user

  var k = Object.keys(localStorage);
  var v = Object.values(localStorage);

  $(".delete").click(function () {
    $(this).text("");
    console.log($(this).closest("li").text());
    var deletedName = $(this).closest("li").text();
    $(this).closest("li").remove();
    // look for name in local storage and delete it.
    console.log(v);
    for (let i = 0; i < v.length; i++) {
      if (v[i] === deletedName) {
        localStorage.removeItem(k[i]);
      }
    }
  }); //Endo of delete click

  // adding click event to the new item to display the data again
  $(".list-group-item").click(function () {
    console.log(
      $(this)
        .text()
        .substr(0, $(this).text().length - 1)
    );

    var input = $(this).text();
    input = input.substr(0, input.length - 1);

    if (input) {
      city = "?q=" + input + "&units=imperial";
      search();
    }
  }); //Endo of display click
}

// adding event listener to search button
$(searchButton).click(function () {
  var input = inputSpace.val();

  //   should check if city already present in local storage
  if (input) {
    city = "?q=" + inputSpace.val() + "&units=imperial";
    cityCounter++;
    let present = stored.find((item) => item == inputSpace.val().toLowerCase());

    if (typeof present == "undefined") {
      console.log("INPUT city not yet present");
      cityCounter++;
      let newCity = inputSpace.val().toLowerCase();
      localStorage.setItem(cityCounter, newCity);
      stored.push(newCity);
      addToScreen(newCity.toUpperCase());
    } else {
      console.log("INPUT city already present");
    }

    search();
  }
});

//function gets weather data on the city and displays it
function search() {
  var results;
  var hrlWho = base + city + key;

  $.ajax({
    url: hrlWho,
    method: "GET",
  }).then(function (response) {
    results = response;
    console.log(results);
    // All sections are populated with data retrieved
    // current day
    currentCity.text(
      results.city.name.toUpperCase() + " (" + results.list[0].dt_txt.substr(0, 10) + ") "
    );

    // if city already present do not add to list
    let present = stored.find(
      (item) => item == results.city.name.toLowerCase()
    );

    if (typeof present == "undefined") {
      console.log("city not yet present");
      cityCounter++;
      let newCity = results.city.name.toLowerCase();
      localStorage.setItem(cityCounter, newCity);
      stored.push(newCity);
      addToScreen(newCity.toUpperCase());
    } else {
      console.log("city already present");
    }

    $("#local").text(results.city.name);
    var iconUrl =
      "http://openweathermap.org/img/wn/" +
      results.list[0].weather[0].icon +
      ".png";
    currentIcon.attr("src", iconUrl);
    currentTemperature.text(
      "Temperature: " + intoFahrenheit(results.list[0].main.temp) + "° F"
    );
    currentHumidity.text("Humidity: " + results.list[0].main.humidity + "%");
    wind.text("Wind Speed: " + results.list[0].wind.speed + " MPH");

    function intoFahrenheit(num) {
      // (300K − 273.15) × 9/5 + 32 = 80.33°F
      if (num > 200) {
        let res = ((num - 273.15) * 9) / 5 + 32;
        return Math.trunc(res);
      } else return num;
    }

    // first day
    day1.text(results.list[8].dt_txt.substr(0, 10));
    var iconUrl1 =
      "http://openweathermap.org/img/wn/" +
      results.list[8].weather[0].icon +
      ".png";
    icon1.attr("src", iconUrl);
    dayTemp1.text("Temp: " + intoFahrenheit(results.list[8].main.temp) + "° F");
    dayHumid1.text("Humidity: " + results.list[8].main.humidity + "%");

    // second day
    day2.text(results.list[16].dt_txt.substr(0, 10));
    var iconUrl2 =
      "http://openweathermap.org/img/wn/" +
      results.list[16].weather[0].icon +
      ".png";
    icon2.attr("src", iconUrl);
    dayTemp2.text(
      "Temp: " + intoFahrenheit(results.list[16].main.temp) + "° F"
    );
    dayHumid2.text("Humidity: " + results.list[16].main.humidity + "%");

    // third day
    day3.text(results.list[24].dt_txt.substr(0, 10));
    var iconUrl3 =
      "http://openweathermap.org/img/wn/" +
      results.list[24].weather[0].icon +
      ".png";
    icon3.attr("src", iconUrl);
    dayTemp3.text(
      "Temp: " + intoFahrenheit(results.list[24].main.temp) + "° F"
    );
    dayHumid3.text("Humidity: " + results.list[24].main.humidity + "%");

    // fourth day
    day4.text(results.list[32].dt_txt.substr(0, 10));
    var iconUrl4 =
      "http://openweathermap.org/img/wn/" +
      results.list[32].weather[0].icon +
      ".png";
    icon4.attr("src", iconUrl);
    dayTemp4.text(
      "Temp: " + intoFahrenheit(results.list[32].main.temp) + "° F"
    );
    dayHumid4.text("Humidity: " + results.list[32].main.humidity + "%");

    // fifth day
    day5.text(results.list[39].dt_txt.substr(0, 10));
    var iconUrl5 =
      "http://openweathermap.org/img/wn/" +
      results.list[39].weather[0].icon +
      ".png";
    icon5.attr("src", iconUrl);
    dayTemp5.text(
      "Temp: " + intoFahrenheit(results.list[39].main.temp) + "° F"
    );
    dayHumid5.text("Humidity: " + results.list[39].main.humidity + "%");

    // getting coordinates
    lat = results.city.coord.lat;
    lng = results.city.coord.lon;

    console.log(lat + "&" + lng);
    // retrieving the uv index
    var hrlWhoUV =
      " https://api.openweathermap.org/data/2.5/uvi?appid=b4d27d3778961482cb9a9ec700e8650e&lat=" +
      lat +
      "&lon=" +
      lng;
    // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
    $.ajax({
      url: hrlWhoUV,
      method: "GET",
    }).then(function (response) {
      var uvResponse = response.value;

      uvNumber.text(uvResponse);

      if (uvResponse <= 2) {
        uvNumber.css("background-color", "greenyellow");
      } else if ((uvResponse > 2) & (uvResponse <= 5)) {
        uvNumber.css("background-color", "yellow");
      } else if ((uvResponse > 5) & (uvResponse <= 7)) {
        uvNumber.css("background-color", "orange");
      } else if ((uvResponse > 7) & (uvResponse <= 10)) {
        uvNumber.css("background-color", "red");
      } else {
        uvNumber.css("background-color", "rgb(197, 17, 197)");
      }
    });
  });
}

// // retrieve the last serches. create li with a class "open" and span each with class "close"
retrieve();
// this function is called and given the showPosition function as parameter
getLocation();
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
// This extract the coordinates and store them in the var 'city', then search method  is then called.
function showPosition(response) {
  lat = response.coords.latitude;
  lng = response.coords.longitude;
  city = "?lat=" + lat + "&lon=" + lng;
  console.log("Latitude: " + response.coords.latitude);
  console.log("Longitude: " + response.coords.longitude);
  search();
}
