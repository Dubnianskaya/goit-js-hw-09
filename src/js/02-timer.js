import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import convertTime from "./helpers/02-convert-time"

const refs = {
    startBtn: document.querySelector("button[data-start]"),
    input: document.querySelector("#datetime-picker"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
    notification: document.querySelector(".notification"),
};

let selectedTime = null;
let currentTime = null;
let timerId = null;

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener("click", onStartClick)

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        checkTimeAvailable(selectedDates);
    },
};
flatpickr("#datetime-picker", options);

function checkTimeAvailable(calendarDate) {
    selectedTime = calendarDate[0].getTime();
    currentTime = Date.now();
      if (selectedTime > currentTime) {
        refs.startBtn.removeAttribute('disabled');
      } else {
        Notiflix.Notify.failure('Please choose a date in the future');
        const checkDisableBtn = refs.startBtn.hasAttribute('disabled');
        if (!checkDisableBtn) {
        refs.startBtn.setAttribute('disabled', true);
        }
      }
}

function onStartClick() {
    refs.input.setAttribute('disabled', true);
    refs.startBtn.setAttribute('disabled', true);
    timerId = setInterval(() => {
        currentTime = Date.now();
        const deltaTime = selectedTime - currentTime;
        if (selectedTime <= currentTime) {
            clearInterval(timerId);
            refs.notification.textContent = "Ура! Время пришло!";
            return;
        } 
        const time = convertTime(deltaTime);
        updateTime(time)
    }, 1000)
}

function updateTime({ days, hours, minutes, seconds }) {
refs.days.textContent = `${days}`;
refs.hours.textContent = `${hours}`;
refs.minutes.textContent = `${minutes}`;
refs.seconds.textContent = `${seconds}`;
}
