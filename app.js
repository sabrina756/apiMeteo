var map = L.map("map").setView([48.856614, 2.3522219], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


  const apikey = "0d47d640a383307597fca125db84f064";
  document.getElementById("search-by-city").addEventListener("submit", (e) => {
      e.preventDefault();
      const cityName = document.getElementById("city-name").value;
      cardUpdate(cityName)
  });
  function getWeather(cityName){
      const promise = new Promise((resolve, reject) => {
          fetch(`https://api-adresse.data.gouv.fr/search/?q=${cityName}&type=municipality`)
              .then(value => {
                  value.json().then(data => {
                      resolve(getWeatherByCoords(data.features[0].properties.city, data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]));
                  })
                      .catch((e) => {
                          reject(e)
                      })
              })
              .catch((e) => {
                  reject(e)
              })
      })
      return Promise.resolve(promise)
  }
  console.log(getWeather("Paris"))
  async function getWeatherByCoords(cityName, lat, lon){
      const promise = new Promise((resolve, reject) => {
          let weatherData = {
              city: cityName,
              temp: "temp",
              weatherType: "weatherType",
              weatherIcon: "weatherIcon",
              windSpeed: "windSpeed",
              precipitation: "precipitation",
              humidity: "humidity"
          }
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&lang=fr&units=metric`)
              .then(value => {
                  value.json()
                      .then(data => {
                          let precipitation = 0;
                          if(data.rain !== undefined){
                              precipitation = Object.values(data.rain)[0] * 100;
                          }
                          weatherData.temp = data.main.temp;
                          weatherData.weatherType = data.weather[0];
                          weatherData.weatherIcon = data.weather[0].icon+"@2x.png";
                          weatherData.windSpeed = data.wind.speed;
                          weatherData.precipitation = precipitation
                          weatherData.humidity = data.main.humidity;
                          resolve(weatherData)
                      })
                      .catch((e) => {
                          reject(e)
                      })
              })
              .catch((e) => {
                  reject(e)
              })
      })
      return Promise.resolve(promise);
  }
  console.log(getWeatherByCoords("Paris"))
 
