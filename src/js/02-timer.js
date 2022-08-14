import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const input = document.getElementById('datetime-picker');
const button = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let interval;
button.disabled = true;
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  if (String(value).length === 1) {
    return '0' + value;
  }
  return value;
}
function createNotification() {
  const div = document.createElement('div');
  div.classList.add('notification');
  div.innerHTML = 'Please choose a date in the future';
  return div;
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDate]) {
    const date = new Date();
    if (selectedDate.getTime() <= date.getTime()) {
      document.body.append(createNotification());
      setTimeout(() => {
        document.querySelector('.notification').remove();
      }, 4000);
      return;
    }
    button.disabled = false;
  },
};
flatpickr(input, options);
button.addEventListener('click', () => {
  input.disabled = true;
  const inputValue = input.value;
  interval = setInterval(() => {
    const currentMs = new Date().getTime();
    const selectedMs = Date.parse(inputValue);
    const ms = selectedMs - currentMs;
    const values = convertMs(ms);
    days.innerHTML = addLeadingZero(values.days);
    hours.innerHTML = addLeadingZero(values.hours);
    minutes.innerHTML = addLeadingZero(values.minutes);
    seconds.innerHTML = addLeadingZero(values.seconds);
    if (ms < 1000) {
      input.disabled = false;
      return clearInterval(interval);
    }
  }, 1000);
  button.disabled = true;
});
