// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const startBtn = document.querySelector('button[data-start]');
const futureData = document.querySelector('#datetime-picker');
const outputDays = document.querySelector('[data-days]');
const outputHours = document.querySelector('[data-hours]');
const outputMinutes = document.querySelector('[data-minutes]');
const outputSeconds = document.querySelector('[data-seconds]');
 
startBtn.disabled = true;
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
        if (selectedDates[0] < new Date()) {
           Notiflix.Notify.failure("Please choose a date in the future");
      }  else {
      startBtn.disabled = false;
      startBtn.addEventListener("click", () => { enterTimeData(selectedDates[0]) });
    }
    },
};

flatpickr(futureData, options);

function enterTimeData(selectedDate) {
  timerId = setInterval(() => {
    const validTime = selectedDate - new Date();

    startBtn.disabled = true;
    futureData.disabled = true;

    if (validTime > 0) {
      const { days, hours, minutes, seconds } = convertMs(validTime);
      outputDays.textContent = days;
      outputHours.textContent = hours;
      outputMinutes.textContent = minutes;
      outputSeconds.textContent = seconds;
    } else {
      clearInterval(timerId);
    };
  }, 1000);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
  
	 function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days =  addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours =  addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes =  addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds =  addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}