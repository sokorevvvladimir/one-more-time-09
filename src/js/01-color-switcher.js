import throttle from 'lodash.throttle';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
};
let intervalId = null;


const bodyColorChange = (e) => {
    intervalId = setInterval(() => {
        const color = getRandomHexColor();
        refs.body.style.backgroundColor = color;
    }, 1000)
    
    e.currentTarget.disabled = true;
};

const colorStop = () => {
    clearInterval(intervalId);
    refs.btnStart.disabled = false;
};

refs.btnStart.addEventListener('click', throttle(bodyColorChange), 1000);
refs.btnStop.addEventListener('click', colorStop);
