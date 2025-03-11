//Api call for weather information 
const apiKey = "80860ddd539207084ff6cdde13af5357";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
// Api call for reverse geocoding 
const apiUrl2 = "https://api.opencagedata.com/geocode/v1/json?q="
const apiKey2 = "a7a4c36e7e2b4105b6faada2a188a131"
const searchBtn = document.querySelector(".search button"); 
const inputText = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");
let tempValue = document.querySelector(".temp");
let locationValue = document.querySelector(".location");
let humidityValue = document.querySelector(".humidity");
let windValue = document.querySelector(".wind");

async function checkWeather(city) {
    let response, data, response2, locationData;
    weatherIcon.style.display = "none"
    const loadingAnimation = document.querySelector(".loading-animation")
    loadingAnimation.style.display = "block";
    
    try {
        response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");
        data = await response.json();
        
        response2 = await fetch(`${apiUrl2}${data.coord.lat},${data.coord.lon}&key=${apiKey2}`)
        if (!response2.ok) throw new Error("Location data not found");
        locationData = await response2.json()
    } catch(error) {
        document.querySelector(".location").innerHTML = "Error fetching weather"
        tempValue.innerHTML = "0" + "°C";
        humidityValue.innerHTML = "0" + "%"
        windValue.innerHTML = "0" + "mph"
        console.error("error fetching weather", error);

        return
    } finally {
        loadingAnimation.style.display = "none"    
    }



        console.log(data);
        console.log(locationData)

        weatherIcon.style.display = "block";

        tempValue.innerHTML = Math.round(data.main.temp) + "°C";
        humidityValue.innerHTML = data.main.humidity + "%"
        windValue.innerHTML = Math.round(data.wind.speed * 2.237) + "mph"
       
        let displayCity = locationData.results[0].components.city || locationData.results[0].components.town ||  locationData.results[0].components.village || "";               
        let displayState = locationData.results[0].components.state || "";
        let displayCountry = locationData.results[0].components.country;
        locationValue.innerHTML = `${displayCity} ${displayState} ${displayCountry}`;


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

}

inputText.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

searchBtn.addEventListener("click", () => {
    let city = inputText.value.trim();
   
    if (city === "") {
        locationValue.innerHTML = "Please enter a city name";
        return;
    }
    
    if (!/^[a-zA-Z\s\-\']+$/ .test(city)) {
        locationValue.innerHTML = "Invalid city name";
        return;
    }
        checkWeather(city);
})
