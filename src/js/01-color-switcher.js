function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const startBtn = document.querySelector('button[data-start]');
const endBtn = document.querySelector('button[data-stop]');
let colorChanger;

endBtn.setAttribute('disabled', '');
startBtn.addEventListener('click', () => {
    startBtn.setAttribute('disabled', '');
    endBtn.removeAttribute('disabled');
    colorChanger = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
})
endBtn.addEventListener('click', () => {
    endBtn.setAttribute('disabled', '');
    startBtn.removeAttribute('disabled');
    clearInterval(colorChanger);
})