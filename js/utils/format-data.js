const defaultDateOptions = {
  day: 'numeric',
  weekday: 'long',
  month: 'long',
}
export function formatDate(date, options = defaultDateOptions) {
  return new Intl.DateTimeFormat('en', options).format(date)
}

export function formatTemp(temp) {
  return `${Math.floor(temp)}°`
}

export function formatWeekList(rawData) {
  // const weeklist = [[],[],[],[],[]]
  let dayList = []
  const weeklist = []
  rawData.forEach((item, index) => {
    dayList.push(item)
    if ((index + 1) % 8 === 0) {
      weeklist.push(dayList)
      dayList = []
    }
  })
  console.log(weeklist)
  return weeklist
}
