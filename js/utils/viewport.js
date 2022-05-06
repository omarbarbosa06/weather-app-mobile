export function setViewportSize($el) {
  const viewPort = getViewPort()
  $el.style.blockSize = `${viewPort}px`
}
export function getViewPort() {
  return window.innerHeight
}

export function onViewPortResize(callback) {
  window.addEventListener('resize', callback)
}

export function offViewPortResize(callback) {
  window.removeEventListener('resize', callback)
}

export function viewPortSize($el) {
  setViewportSize($el)

  onViewPortResize(() => setViewportSize($el))
}
