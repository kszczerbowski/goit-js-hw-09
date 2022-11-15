import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const calendar = document.querySelector('input#datetime-picker');
const countdownBtn = document.querySelector('button[data-start]');
const timerParts = document.querySelectorAll('span.value');
let difference;
let convertedDifference;
let chosenDate;
let timer;
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    const timeArr = [days, hours, minutes, seconds];
    return { days, hours, minutes, seconds, timeArr };
  }
function addLeadingZero(value) {
  return value.padStart(2, '0');
}

countdownBtn.setAttribute('disabled', '');
flatpickr(calendar, {
    parseDate: (datestr, format) => {
        return moment(datestr, format, true).toDate();
      },
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
        Notify.failure("Please choose a date in the future");
        countdownBtn.setAttribute('disabled', '');
      } else {
        countdownBtn.removeAttribute('disabled');
      }
    chosenDate = selectedDates[0];
    },
});
countdownBtn.addEventListener('click', () => {
  timer = setInterval(() => {
      difference = chosenDate - new Date();
      convertedDifference = convertMs(difference);
      for (let i=0; i<4; i++) {
        timerParts[i].textContent = convertedDifference.timeArr[i].toString().length === 1 ? addLeadingZero(convertedDifference.timeArr[i].toString()) : convertedDifference.timeArr[i].toString();
      }
      const timerPartsCopy = [...timerParts]
      if (timerPartsCopy.every(timerPart => timerPart.textContent === "00")) {
        clearInterval(timer);
      }
    }, 1000);
})