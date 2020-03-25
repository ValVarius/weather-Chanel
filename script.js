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

var base = "http://api.openweathermap.org/data/2.5/forecast";
var city = "?q=seattle"
var key = "&appid=b4d27d3778961482cb9a9ec700e8650e"
var cityCounter = 0;

search();








// adding event listener to search button
$(searchButton).click(function(){
    
    city = "?q=" + inputSpace.val() + "&units=imperial"
    cityCounter++;
    localStorage.setItem(cityCounter, inputSpace.val());
    
    search();
})



function search(){
    
    var results;
    var hrlWho = base + city + key;
    
        
        $.ajax({
            url: hrlWho,
            method: "GET"
        })
            .then(function(response) {

            results = response;
            console.log(results);

            // current day
            currentCity.text(results.city.name + " (" + results.list[0].dt_txt.substr(0, 10) + ") ");
            var iconUrl = "http://openweathermap.org/img/wn/" + results.list[0].weather[0].icon + ".png";
            currentIcon.attr("src", iconUrl);
            currentTemperature.text("Temperature: "+ results.list[0].main.temp + "° F");
            currentHumidity.text("Humidity: " +results.list[0].main.humidity + "%");
            wind.text("Wind Speed: " + results.list[0].wind.speed  + " MPH")

            // uvIndex
            // first day
            day1.text(results.list[8].dt_txt.substr(0, 10));
            var iconUrl1 =  "http://openweathermap.org/img/wn/" + results.list[8].weather[0].icon + ".png";
            icon1.attr("src", iconUrl);
            dayTemp1.text("Temp: "+ results.list[8].main.temp + "° F");
            dayHumid1.text("Humidity: " +results.list[8].main.humidity + "%");

            // second day
            day2.text(results.list[16].dt_txt.substr(0, 10));
            var iconUrl2 =  "http://openweathermap.org/img/wn/" + results.list[16].weather[0].icon + ".png";
            icon2.attr("src", iconUrl);
            dayTemp2.text("Temp: "+ results.list[16].main.temp + "° F");
            dayHumid2.text("Humidity: " +results.list[16].main.humidity + "%");

            // third day
            day3.text(results.list[24].dt_txt.substr(0, 10));
            var iconUrl3 =  "http://openweathermap.org/img/wn/" + results.list[24].weather[0].icon + ".png";
            icon3.attr("src", iconUrl);
            dayTemp3.text("Temp: "+ results.list[24].main.temp + "° F");
            dayHumid3.text("Humidity: " +results.list[24].main.humidity + "%");

            // fourth day
            day4.text(results.list[32].dt_txt.substr(0, 10));
            var iconUrl4 =  "http://openweathermap.org/img/wn/" + results.list[32].weather[0].icon + ".png";
            icon4.attr("src", iconUrl);
            dayTemp4.text("Temp: "+ results.list[32].main.temp + "° F");
            dayHumid4.text("Humidity: " +results.list[32].main.humidity + "%");

            // fifth day
            day5.text(results.list[39].dt_txt.substr(0, 10));
            var iconUrl5 =  "http://openweathermap.org/img/wn/" + results.list[39].weather[0].icon + ".png";
            icon5.attr("src", iconUrl);
            dayTemp5.text("Temp: "+ results.list[39].main.temp + "° F");
            dayHumid5.text("Humidity: " +results.list[39].main.humidity + "%");

            
            })
            
};















    