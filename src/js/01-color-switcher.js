import randomColor from './helpers/01-random-color';

const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
    body: document.querySelector("body"),
};
refs.startBtn.addEventListener("click", onColorChangeStart);
refs.stopBtn.addEventListener("click", onColorChangeStop);
let colorId = null;

function onColorChangeStart() {
    colorId = setInterval(() => {
        refs.body.style.backgroundColor = randomColor();
    }, 1000)
    refs.startBtn.setAttribute('disabled', true)
}
function onColorChangeStop() {
    clearInterval(colorId);
    refs.startBtn.removeAttribute('disabled')
}
