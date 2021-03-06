import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDomElement } from './utils/dom.js'
import { createPeriodTime } from './period-time.js'
import draggable from './draggable.js'
function tabPanelTemplate(id) {
  return `
  <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul class="dayWeather-list" id="dayWeather-list-${id}">

      </ul>
    </div>
  </div>
  `
}
function createTabPanel(id) {
  const $panel = createDomElement(tabPanelTemplate(id))
  if (id > 0) {
    $panel.hidden = true
  }
  return $panel
}
function configWeeklyWeather(weeklist) {
  const $container = document.querySelector('.tabs')
  weeklist.forEach((day, index) => {
    const $panel = createTabPanel(index)
    $container.append($panel)
    day.forEach((weather, indexWeather) => {
      $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather))
    })
  })
}
export default async function weeklyWeather() {
  const $container = document.querySelector('.weeklyWeather')
  const { lat, lon, isError } = await getLatLon()
  if (isError) {
    return console.log('There is an error getting your location')
  }
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(
    lat,
    lon
  )
  if (weeklyWeatherError) {
    return console.log(
      'Oh, there is an error with your forecast weather request'
    )
  }
  const weeklist = formatWeekList(weather.list)
  configWeeklyWeather(weeklist)

  //Checking if mobile to enable dragging since it gives issues in desktop
  let $draggableCSS = document.querySelector('.weeklyWeather-marker')
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    draggable($container)
  } else {
    $draggableCSS.classList.add('no-before')
  }
}
