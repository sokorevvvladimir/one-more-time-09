import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      
      if (selectedDates[0].getTime() < Date.now()) {
          alert("Please choose a date in the future")
      } 
      refs.btnStart.disabled = false;

      refs.btnStart.addEventListener('click', () => {
          refs.btnStart.disabled = true;
          timerId = setInterval(() => { countdown() }, 1000)
      })
      
      const countdown = () => {
              let timeToDate = selectedDates[0].getTime() - Date.now();
              const result = convertMs(timeToDate);
          
          refs.days.textContent = result.days;
          refs.hours.textContent = result.hours;
          refs.minutes.textContent = result.minutes;
          refs.seconds.textContent = result.seconds;

         
          if (refs.days.textContent === "00" && refs.hours.textContent === "00" && refs.minutes.textContent === "00" && refs.seconds.textContent === "00") {
              clearInterval(timerId);
          }
          };
      }
  
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
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const fp = flatpickr("#datetime-picker", options);
