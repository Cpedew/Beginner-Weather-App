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

        if(data.weather[0].main == "Clear") {
            weatherIcon.src = "Images/weather-icons/clearSky.png"
        }else if(data.weather[0].description == "few clouds") {
            weatherIcon.src = "Images/weather-icons/fewClouds.png"
        }else if(data.weather[0].description == "scattered clouds") {
            weatherIcon.src = "Images/weather-icons/scatteredClouds.png"
        }else if(data.weather[0].description == "broken clouds" || "overcast clouds") {
            weatherIcon.src = "Images/weather-icons/brokenClouds.png"
        }else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "Images/weather-icons/showerRain.png"
        }else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "Images/weather-icons/rain.png"
        }else if(data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "Images/weather-icons/thunderstorm.png"
        }else if(data.weather[0].main == "Snow") {
            weatherIcon.src = "Images/weather-icons/snow.png"
        }else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "Images/weather-icons/mist.png"
        }
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