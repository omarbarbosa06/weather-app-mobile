import { formatDate, formatTemp } from '../utils/format-data.js'
import { weatherConditionCodes } from './constants.js'
import { getLatLon } from './geolocation.js'
import { getCurrentWeather } from './services/weather.js'
function setCurrentCity($el, city) {
  $el.textContent = city
}
function setCurrentDate($el) {
  const date = new Date()
  const formattedDate = formatDate(date)
  $el.textContent = formattedDate
}
function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp)
}
function solarStatus(sunriseTime, sunsetTime) {
  const currentHours = new Date().getHours()
  const sunsetHours = sunsetTime.getHours()
  const sunriseHours = sunriseTime.getHours()

  if (currentHours > sunsetHours || currentHours < sunriseHours) {
    return 'night'
  }
  return 'morning'
}
function setBackground($el, conditionCode, solarStatus) {
  const size = window.matchMedia('(-webkit-min-device-pixel-ratio:2)').matches
  const weatherType = weatherConditionCodes[conditionCode]
  $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${
    size ? '@2x' : ''
  }.jpg)`
}
function showCurrentWeather($app, $loader) {
  $app.hidden = false
  $loader.hidden = true
}
function configCurrentWeather(weather) {
  const $app = document.querySelector('#app')
  const $loading = document.querySelector('#loading')
  //loader
  showCurrentWeather($app, $loading)
  //date
  const $currentWeatherDate = document.querySelector('#current-weather-date')
  setCurrentDate($currentWeatherDate)
  //city
  const $currentWeather = document.querySelector('#current-weather-city')
  const city = weather.name
  setCurrentCity($currentWeather, city)
  //temp
  const $currentTemp = document.querySelector('#current-weather-temp')
  const temp = weather.main.temp
  setCurrentTemp($currentTemp, temp)
  //background
  const sunriseTime = new Date(weather.sys.sunrise * 1000)
  const sunsetTime = new Date(weather.sys.sunset * 1000)
  const conditionCode = String(weather.weather[0].id).charAt(0)
  setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))
}

export default async function currentWeather() {
  //Geo //Api - weather // Config

  const { lat, lon, isError } = await getLatLon()
  if (isError) {
    return console.log('There is an error getting your location')
  }
  const { isError: currentWeatherError, data: weather } =
    await getCurrentWeather(lat, lon)
  if (currentWeatherError) {
    return console.log('Oh, there is an error with your weather request')
  }
  configCurrentWeather(weather)
}
