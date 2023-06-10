async function myPossitionWeather(bool,city) {
    try {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        // coordinates
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        const weatherURL = bool ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9928019ae35559d6d2cc2bf478ceead0` : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9928019ae35559d6d2cc2bf478ceead0` ;
        
        // fetch API request
        const response = await fetch(weatherURL);
        const data = await response.json();

        // --- adapt information
        data.main.temp -= 273.15;
        data.main.temp = data.main.temp.toFixed(1);
        data.main.feels_like -= 273.15;
        data.main.feels_like = data.main.feels_like.toFixed(1);
        data.main.temp_max -= 273.15;
        data.main.temp_max = data.main.temp_max.toFixed(1);
        data.main.temp_min -= 273.15;
        data.main.temp_min = data.main.temp_min.toFixed(1);
        let date = new Date(data.sys.sunrise *1000);
        let hours = date.getHours() + data.timezone/3600;
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        data.sys.sunrise = `${hours}:${minutes}:${seconds}`
        date = new Date (data.sys.sunset * 1000)
        hours = date.getHours() + data.timezone/3600;
        minutes = date.getMinutes();
        seconds = date.getSeconds();
        data.sys.sunset = `${hours}:${minutes}:${seconds}`
        data.timezone = `UTC${`:`}${data.timezone/3600}`
        // --- end
        
        let weatherRenderHTML = `
        <div class="my_possition_weather">
            <div class="weather_block">
                ${bool ? '<h2>Your Location</h2>' : `<h2>Searched Location</h2>`   }
                <div class="weather_header">            
                    <span>${data.name}</span>
                    <img src="http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.sys.country}.svg" alt="county_flag">
                    <span>[ ${data.coord.lon} | ${data.coord.lat} ]</span>
                </div>

                <div class="card_list">
                    <div class="card">
                        <h3>Weather <img src="./src/img/sun.png" alt="sun"></h3>
                        <p>Main: ${data.weather[0].main} </p>
                        <p>Description: ${data.weather[0].description}</p>
                    </div>

                    <div class="card">
                        <h3>Temperature <img src="./src/img/temperature.png" alt="temperature"></h3>
                        <p>Temperature: ${data.main.temp} °C</p>
                        <p>Feels like: ${data.main.feels_like} °C</p>
                        <p>Today: ${data.main.temp_min} °C - ${data.main.temp_max} °C</p>
                        <p></p>
                    </div>

                    <div class="card">
                        <h3>Wind <img src="./src/img/wind.png" alt="wind"></h3>
                        <p>Speed: ${data.wind.speed} m/s</p>
                        <p>Deg: ${data.wind.deg}°</p>
                    </div>

                    <div class="card">
                        <h3>Air indicators <img src="./src/img/humidity.png" alt="humidity"></h3>
                        <p>Pressure: ${data.main.pressure} hpa</p>
                        <p>Humidity: ${data.main.humidity} %</p>
                    </div>

                    <div class="card">
                        <h3>About <img src="./src/img/about.png" alt="about"></h3>
                        <p>Country: ${data.sys.country}</p>
                        <p>Sunrise: ${data.sys.sunrise}</p>
                        <p>Sunset: ${data.sys.sunset}</p>
                        <p>Timezone: ${data.timezone}</p>
                    </div>
                </div>
            </div>

            <div class="weather_block">
                <h2>Do you need the weather of another city? Find it!</h2>     
                <div class="search_weather">
                    <div>
                        <input id="search_city" type="text">
                        <button id="#findweather"> SEARCH </button>
                    </div>
                </div>
            </div>
        </div>
        `

        return weatherRenderHTML;

    } catch (err) {
        console.log(err);
        return `<div>Error</div>`;
    }
}
  
export default myPossitionWeather;