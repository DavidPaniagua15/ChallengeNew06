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
})