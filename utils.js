const date = new Date().toLocaleDateString('fr-FR');
document.getElementById("date").innerText = date

function firstCapitalLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function cardUpdate(cityName) {
    getWeather(cityName).then(async value => {
        document.getElementById("city-date").children.item(0).innerText = value.city
        document.getElementById("weather").children.item(0).src = "./image/images/weatherIcons/" + value.weatherIcon;
        
        document.getElementById("temp").innerText = parseInt(value.temp) + " °C"
        document.getElementById("weather-type").innerText = firstCapitalLetter(value.weatherType.description)
        document.getElementById("wind-value").innerText = parseInt(value.windSpeed) + "km/h"
        document.getElementById("precipitation-value").innerText = parseInt(value.precipitation) + "%"
        document.getElementById("humidity-value").innerText = parseInt(value.humidity) + "%"
    })
}

cardUpdate("Paris") // Permet de mettre la vie par défaut a Paris.
let citysName = []
document.getElementById("city-name").addEventListener("input", (e) => {
    citysName = []
    if (e.target.value.length >= 3) {
        fetch(`https://api-adresse.data.gouv.fr/search/?q=${e.target.value}&type=municipality`).then(value => {
            value.json().then(data => {
                data.features.forEach(val => {
                    citysName.push(val.properties.label + " " + val.properties.postcode)
                })
                console.log(citysName)
            }).catch(e => console.error(e))
        }).catch(e => console.error(e))
    }
})
document.getElementById("city-name").addEventListener("focus", (e) => {
    console.log("test")
})