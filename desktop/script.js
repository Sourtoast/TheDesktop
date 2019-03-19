const  { ipcRenderer }  = require('electron')
const config = require('../config').localization

var clocks = document.querySelectorAll('[data-class="clock"]')
var dates = document.querySelectorAll('[data-class="date"]')
var datesAlt = document.querySelectorAll('[data-class="date-alt"]')
var days = document.querySelectorAll('[data-class="day"]')

var city = document.querySelector('#city-name')
var weather = document.querySelector('#weather-text')
var realFeel = document.querySelector('#realfeel')
var weatherIcon = document.querySelector('#weather-icon')

hooks()
updateTime()
updateweather()

function hooks() {
	var powerButtons = document.querySelectorAll('[data-class="power"]')
	for (let e of powerButtons) {
		e.addEventListener('click', (event) => {
			ipcRenderer.send('power', e.dataset.action)
		})
  }
}

function updateTime() {
    let today = new Date()

    let hours = (today.getHours() < 10) ? '0' + today.getHours() : today.getHours()
    let minutes = (today.getMinutes() < 10) ? '0' + today.getMinutes() : today.getMinutes()
    for(let e of clocks) {
        e.innerHTML = `${hours}:${minutes}`
    }

    let weekDays = config.weekDaysNames
    // ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']
    let weekDay = weekDays[today.getDay()]
    let monthDay = today.getDate()
    let monthNames = config.monthNames
    // ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
    let monthName = monthNames[today.getMonth()]

    for(let e of dates) {
        e.innerHTML = `${monthDay} ${monthName.substr(0,3)} ${today.getFullYear()}`
    }

    for(let e of datesAlt) {
        e.innerHTML = `${weekDay}, ${monthDay} ${monthName}`
    }

    for(let e of days) {
        e.innerHTML = weekDay
    }

    setTimeout(updateTime, 60000)
}

function updateweather() {
    ipcRenderer.send('weather', 'get')
    setTimeout(updateweather, 1728000)
}

ipcRenderer.on('weather', (event, arg) => {
    if(arg) {
        city.innerHTML = arg.cityName
        weather.innerHTML = `${arg.temperature}&deg;C ${arg.weatherText}`
        realFeel.innerHTML = `Real Feel: ${arg.realfeel}&deg;C`
        weatherIcon.src = `./weather-icons/${arg.icon}.svg`
    }
})

