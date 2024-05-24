const car = document.getElementById('car');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const redLight = document.getElementById('redLight');
const yellowLight = document.getElementById('yellowLight');
const greenLight = document.getElementById('greenLight');

let carAnimation;
let signalInterval;
let currentLight = 'red';

function moveCar() {
    let position = parseInt(car.style.left) || 50;
    clearInterval(carAnimation);
    carAnimation = setInterval(() => {
        if (position >= window.innerWidth - car.offsetWidth - 50) {
            clearInterval(carAnimation);
        } else {
            position++;
            car.style.left = position + 'px';
        }
    }, 10);
}

function highlightSignal(color) {
    const lights = ['red', 'yellow', 'green'];
    lights.forEach(light => {
        const lightElement = document.getElementById(light + 'Light');
        if (light === color) {
            lightElement.style.backgroundColor = color;
        } else {
            lightElement.style.backgroundColor = 'black';
        }
    });
}

function changeSignal() {
    signalInterval = setInterval(() => {
        if (currentLight === 'red') {
            currentLight = 'green';
            highlightSignal('green');
            moveCar();
        } else if (currentLight === 'green') {
            currentLight = 'yellow';
            highlightSignal('yellow');
        } else {
            currentLight = 'red';
            highlightSignal('red');
        }
    }, 2000);
}

startButton.addEventListener('click', () => {
    clearInterval(signalInterval);
    changeSignal();
});

stopButton.addEventListener('click', () => {
    clearInterval(signalInterval);
    highlightSignal('red');
    currentLight = 'red';
    clearInterval(carAnimation);
});

highlightSignal('red');
