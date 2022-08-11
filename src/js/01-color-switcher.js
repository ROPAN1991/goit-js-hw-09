import throttle from 'lodash.throttle'

const buttonStart = document.querySelector('[data-start]')
const buttonStop = document.querySelector('[data-stop]')
let interval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

function changeBodyWithInterval() {
  clearInterval(interval)
  return setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor()
  }, 1000)
}

const throttleChangeColor = throttle(changeBodyWithInterval, 1000)

buttonStart.addEventListener('click', () => {
  interval = throttleChangeColor()
})

buttonStop.addEventListener('click', () => {
  clearInterval(interval)
})