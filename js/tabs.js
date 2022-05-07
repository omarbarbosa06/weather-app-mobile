const $tabContainer = document.querySelector('#tabs')
const $tabList = $tabContainer.querySelectorAll('.tab')

const today = new Date()
let weekday = today.getDay()
let $currentTabActive = document.querySelector('.tab[aria-selected="true"]')

const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
function nextDay(day) {
  if (day === 6) {
    return 0
  }
  return day + 1
}

$tabList.forEach(($tab, index) => {
  $tab.addEventListener('click', handleSelectTabClick)
  if (index === 0) {
    $tab.textContent = 'Today'
    weekday = nextDay(weekday)
    return false
  }
  $tab.textContent = week[weekday]
  weekday = nextDay(weekday)
})

function handleSelectTabClick(event) {
  const $tabActive = document.querySelector('.tab[aria-selected="true"]')
  const $tabSelected = event.target

  if ($currentTabActive.textContent === $tabSelected.textContent) {
    return
  }
  $tabActive.removeAttribute('aria-selected')
  $tabSelected.setAttribute('aria-selected', true)

  const id = $tabSelected.id
  const $tabPanel = document.querySelector(`[aria-labelledby=${id}`)
  const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`)
  $tabPanel.hidden = false
  $tabPanelSelected.hidden = true
  $currentTabActive = event.target
}
