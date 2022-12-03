var key = '64f2ee2a8261daa4d9f780f5b365f275';
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
    
}