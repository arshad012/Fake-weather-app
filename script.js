const weather_app = document.querySelector('.weather-app');

const submit_btn = document.getElementById('submit');
submit_btn.addEventListener('click', startInitialLoading);

const initial_div = document.querySelector('.initial-div');
const timeBoxes = document.querySelectorAll('.time');
const initial_timer = document.querySelector('.initial-timer');
let timer = 10;

function startTimer () {
    let index = 0;
    const intervalId = setInterval(() => {
        timer -= 1;
        // initial_timer.innerText = timer;
        timeBoxes[index].classList.add('current-time');
        const pre = timeBoxes[index].previousElementSibling;
        if(pre) {
            console.log('')
            pre.classList.remove('current-time');
        }
        index++;

        if(timer == 0) {
            clearInterval(intervalId);
            setTimeout(() => showWeatherApp(), 1000);
        }
    }, 1000);
}

window.onload = () => {
    startTimer();
}

function showWeatherApp() {
    initial_div.style.display = 'none';
    weather_app.style.display = 'block';
}


const messagesArr = [
    'Loading...',
    'Searching location...',
    'Analyzing the cloud...',
    'Looking outside your window...',
    'Getherting information....'
];

function startInitialLoading() {
    const input = document.getElementById('input').value;
    if(input == '') {
        alert('Please enter location');
        return;
    };

    submit_btn.setAttribute('disabled', true);
    submit_btn.style.opacity = '0.5';
    submit_btn.style.cursor = 'not-allowed';

    const information = document.querySelector('.information');
    const message = document.querySelector('.message');
    let messageIndex = 0;
    message.innerText = messagesArr[messageIndex];

    const progress = document.querySelector('.progress');
    
    information.style.display = 'block';
    let width = 0;

    let firstIntervalDone = false;
    let secondIntervalDone = false;

    const loading = setInterval(() => {
        width += Math.floor(Math.random()*10);
        if(width<=100) {
            progress.innerText = `${width}%`;
        } else {
            progress.innerText = `${100}%`;
        }
        progress.style.width = `${width}%`;

        if(width >= 100) {
            clearInterval(loading);
            firstIntervalDone = true;
            finalMessage(firstIntervalDone, secondIntervalDone);
        }
    }, 1000);


    const messageInterval = setInterval(() => {
        messageIndex++;
        message.innerText = messagesArr[messageIndex];
        if(messageIndex == 4) {
           clearInterval(messageInterval);
           secondIntervalDone = true;
           finalMessage(firstIntervalDone, secondIntervalDone);
        }
    }, 4000);
}


function finalMessage(firstIntervalDone, secondIntervalDone) {
    if(firstIntervalDone && secondIntervalDone) {

        setTimeout(() => {
            weather_app.innerHTML = null;
            const last_window = document.querySelector('.last-window');
            last_window.style.display = 'block';
            weather_app.append(last_window);
        }, 1000);
    }
}