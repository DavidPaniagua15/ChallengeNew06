var city = 'Atlanta'

//current time and date
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS');
var date = moment().format('dddd, MMMM Do YYYY')

var cityHist = [];

//save value submitted in the search box code//

$('.search').on("click", function (event) {
    event.preventDefault();
    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
    if (city === "") {
        return;
    };
    cityHist.push(city);

    localStorage.setItem('city', JSON.stringify(cityHist));
    fiveForecastEl.empty();
    getHistory();
    getWeatherToday();
});

//search history

var contHistEl = $('.cityHist');
function getHistory() {
    contHistEl.empty();

    for (let i = 0; i < cityHist.length; i++) {

        var rowEl = $('<row>');
        var btnEl = $('<button>').text('${cityHist[i]}')

        rowEl.addClass('row histBtnRow');
        btnEl.addClass('btn btn-outline-secondary histBtn');

        contHistEl.prepend(rowEl);
        rowEl.append(btnEl)
    } if (!city) {
        return;
    }

    //btn to start a search as well
    $('.histBtn').on("click", function (event) {
        event.preventDefault();
        city = $(this).text();
        fiveForecastEl.empty();
        getWeatherToday();
    });
};

//show the Today's card body
var cardTodayBody = $('.cardBodyToday')

//appliying the data from 'Today' and launch the five days forecast
function getWeatherToday() {
    var getUrlCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}';

    $(cardTodayBody).empty(); 

    $.ajax({
        url: getUrlCurrent,
        method: 'GET',
    }). then(function (resonponse) {
        $('.cardTodayCityName').text(resonponse.name);
        $('.cardTodayDate').text(date);

        //Items
        $('.icons').attr('src', 'https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png');
        //Temperature
        var pEl = $('<p>').text('temperature: ${response.main.temp} °F');
        cardTodayBody.append(pEl);
        //RealFeel
        var pElTemp = $('<p>').text('RealFeel: ${response.main.RealFeel} °F');
        cardTodayBody.append(pElTemp);
        //city long
        var cityLon = Response.coord.lon;
        //city latitude
        var cityLat = response.coord.lat;

        var getUrlUvi = 'https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}';

        $.ajax({
            url: getUrlUvi,
            Method: 'GET',
        }).then(function (response) {
            var pElUvi = $('<p>').text('UV Index: ');
            var uviSpan = $('<span>').text(response.current.uvi);
            var uvi = response.current.uvi;
            pElUvi.append(uviSpan);
            cardTodayBody.append(pElUvi);
            //set the UV
            if (uvi >= 0 && uvi <= 2) {
                uviSpan.attr('class', 'green');
            } else if (uvi > 2 && uvi <= 5) {
                uviSpan.attr('class', 'yellow')
            } else if (uvi > 5 && uvi <= 7) {
                uviSpan.attr('class', 'orange')
            } else if (uvi > 7 && uvi <= 10) {
                uviSpan.attr('class', 'red')
            } else {
                uviSpan.attr('class', 'purple')
            }
            
        });


    });
    getFiveDayForecast();

    function getFiveDayForecast() {
        var getUrlCurrent = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}';

        $.ajax({
            url: getUrlFiveDay,
            method: 'GET',

        })
    }
    getHistory();
    getWeatherToday();
};

initLoad();