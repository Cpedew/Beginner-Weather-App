const apiKey = "80860ddd539207084ff6cdde13af5357";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBtn = document.querySelector(".search button"); 
const inputText = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        let data = await response.json();

        let tempValue = document.querySelector(".temp");
        let cityValue = document.querySelector(".city");
        let humidityValue = document.querySelector(".humidity");
        let windValue = document.querySelector(".wind");

        if (!response.ok) {
            weatherIcon.src = "Images/cityNotFound.png"
            tempValue.innerHTML = "0" + "°C";
            humidityValue.innerHTML = "0" + "%"
            windValue.innerHTML = "0" + "mph"
            return cityValue.innerHTML = "City not found"
        }

        console.log(data);
 
        tempValue.innerHTML = Math.round(data.main.temp) + "°C";
        cityValue.innerHTML = data.name;
        humidityValue.innerHTML = data.main.humidity + "%"
        windValue.innerHTML = Math.round(data.wind.speed * 2.237) + "mph"

        let weatherIcons = {
            "Clear": "clearSky.png",
            "few clouds": "fewClouds.png",
            "scattered clouds": "scatteredClouds.png",
            "broken clouds": "brokenClouds.png",
            "overcast clouds": "brokenClouds.png",
            "Rain": "showerRain.png",
            "Drizzle": "rain.png",
            "Thunderstorm": "thunderstorm.png",
            "Snow": "snow.png",
            "Mist": "mist.png"
        }

        let weatherCondition = data.weather[0].main in weatherIcons ? data.weather[0].main : data.weather[0].description;
        let iconFile = weatherIcons[weatherCondition] || "mist.png";
        weatherIcon.src = `Images/weather-icons/${iconFile}`
} catch(error) {
    console.error("error fetching weather", error);
    document.querySelector(".city").innerHTML = "Error fetching weather"
}
}

searchBtn.addEventListener("click", () => {
    let city = inputText.value.trim();
    if (city) {
        checkWeather(city);
    } else {

    }

})