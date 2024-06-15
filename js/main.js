// Search Input
const searchLocationInput = document.getElementById("searchLocation");
// Row Section
const row = document.getElementById("row");
// Today
const dayToday = document.getElementById("dayToday");
const dateToDay = document.getElementById("dateToDay");
const cityToday = document.getElementById("cityToday");
const tempToday = document.getElementById("tempToday");
const condToday = document.getElementById("condToday");
const imgToday = document.getElementById("imgToday");
const humToday = document.getElementById("humToday");
const windSpeedToday = document.getElementById("windSpeedToday");
const dirToday = document.getElementById("dirToday");
// Tomorrow
const tomorrowDay = document.getElementById('tomorrowDay');
const iconTomorrow = document.getElementById('iconTomorrow');
const maxTempTomorrow = document.getElementById('maxTempTomorrow');
const minTempTomorrow = document.getElementById('minTempTomorrow');
const condTomorrow = document.getElementById('condTomorrow');
// After Tomorrow
const afterTomorrowDay = document.getElementById('afterTomorrowDay');
const iconAfterTomorrow = document.getElementById('iconAfterTomorrow');
const maxTempAfterTomorrow = document.getElementById('maxTempAfterTomorrow');
const minTempAfterTomorrow = document.getElementById('minTempAfterTomorrow');
const condAfterTomorrow = document.getElementById('condAfterTomorrow');



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        // Get Data According to User Location
        getWeatherData(`${lat},${long}`);
    })
}
else {
    alert("Geolocation isn't exist in your device")
}




const apiKey = "167328d6a4174f16a41122830241406"
const apiURL = "https://api.weatherapi.com/v1/forecast.json?key="
const apiDays = "3"

async function getWeatherData(Location) {
    let res = await fetch(`${apiURL}${apiKey}&q=${Location}&days=${apiDays}`);
    let data = await res.json();
    row.classList.replace('d-none','d-flex');
    displayTodayWeather(data);
    displayTomorrowWeather(data);
    displayAfterTomorrowWeather(data) ;
}


searchLocationInput.addEventListener("input", function () {
    getWeatherData(`${searchLocationInput.value}`);

});


function displayTodayWeather(data) {
    const todayDate = data.current.last_updated;
    let date = new Date(todayDate);
    // Esm el youm
    const todayDayName = date.toLocaleString('en-us', { weekday: 'long' });
    // Raqm el youm
    const todayDayNum = date.getDate();
    // Esm el shahr
    const todayMonth = date.toLocaleString(`en-us`, { month: 'long' });
    // City Name
    const cityName = data.location.name;
    // Temp
    const Temp = data.current.temp_c;
    // Condition Text
    const condText = data.current.condition.text;
    // Condition Img
    const condImage = `https:${data.current.condition.icon}`;
    // Humidity
    const Hum = data.current.humidity;
    // windSpeed 
    const windSpeed = data.current.wind_kph;
    // windDir
    const windDir = data.current.wind_dir;

    dayToday.innerHTML = todayDayName;
    dateToDay.innerHTML = `${todayDayNum} ${todayMonth}`
    cityToday.innerHTML = cityName;
    tempToday.innerHTML = `${Temp}°C`;
    condToday.innerHTML = condText;
    imgToday.setAttribute("src", condImage);
    humToday.innerHTML = Hum;
    windSpeedToday.innerHTML = windSpeed;
    dirToday.innerHTML = windDir;
}

function displayTomorrowWeather(data) {
    const tomorrowData = data.forecast.forecastday[1];
    const tomorrowDate = tomorrowData.date;
    let date = new Date(tomorrowDate);

    // DayName
    const tomorrowDayName = date.toLocaleString('en-us', { weekday: 'long' });
    // Max Temp
    const tomorrowMaxTemp = tomorrowData.day.maxtemp_c;
    // Min Temp
    const tomorrowMinTemp = tomorrowData.day.mintemp_c;
    // Condition Text
    const tomorrowCondText = tomorrowData.day.condition.text;
    // Condition Img
    const tomorrowCondImage = `https:${tomorrowData.day.condition.icon}`;


    tomorrowDay.innerHTML = tomorrowDayName;
    iconTomorrow.setAttribute('src', tomorrowCondImage);
    maxTempTomorrow.innerHTML = `${tomorrowMaxTemp}°C`;
    minTempTomorrow.innerHTML = `${tomorrowMinTemp}°C`;
    condTomorrow.innerHTML = tomorrowCondText;






}

function displayAfterTomorrowWeather(data) {
    const afterTomorrowData = data.forecast.forecastday[2];
    const afterTomorrowDate = afterTomorrowData.date;
    let date = new Date(afterTomorrowDate);

    // DayName
    const afterTomorrowDayName = date.toLocaleString('en-us', { weekday: 'long' });
    // Max Temp
    const afterTomorrowMaxTemp = afterTomorrowData.day.maxtemp_c;
    // Min Temp
    const afterTomorrowMinTemp = afterTomorrowData.day.mintemp_c;
    // Condition Text
    const afterTomorrowCondText = afterTomorrowData.day.condition.text;
    // Condition Img
    const afterTomorrowCondImage = `https:${afterTomorrowData.day.condition.icon}`;


    afterTomorrowDay.innerHTML = afterTomorrowDayName;
    iconAfterTomorrow.setAttribute('src', afterTomorrowCondImage);
    maxTempAfterTomorrow.innerHTML = `${afterTomorrowMaxTemp}°C`;
    minTempAfterTomorrow.innerHTML = `${afterTomorrowMinTemp}°C`;
    condAfterTomorrow.innerHTML = afterTomorrowCondText;

}