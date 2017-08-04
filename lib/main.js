import Flocky from './flock3d';

let numBirds = 0;

$( "#slider-1" ).bind( "slidechange", function(event, ui) {
    numBirds = ui.value;
});

const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const f = new Flocky(vw, vh, 800);
f.populateFlock();

let options = document.getElementById("options");
let pause = document.getElementById("pause");

document.getElementById("header").addEventListener('click', () => {
  if (options.style.display === 'flex') {
    options.style.display = 'none';
  } else {
    options.style.display = 'flex';
  }
});

let help = document.getElementById('info');

document.getElementById('helpheader').addEventListener('click', () => {
  if (help.style.display === 'block') {
    help.style.display = 'none';
  } else {
    help.style.display = 'block';
  }
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = vw;
  canvasEl.height = vh;

  const ctx = canvasEl.getContext("2d");

  let timer = setInterval(() => {
    f.draw(ctx);
  }, 20);

  let counter = 2;
  canvasEl.addEventListener('click', () => {
    if (counter % 2 === 0) {
      clearInterval(timer);
      counter += 1;
      pause.style.display = 'block';
    } else {
      timer = setInterval(() => {
        f.draw(ctx);
      }, 20);
      counter += 1;
      pause.style.display = 'none';
    }
  });
});

const canvas = document.getElementById('game-canvas');
const birds = document.getElementById('birds');
const balls = document.getElementById('balls');
const flap = document.getElementById('flappy');

balls.addEventListener('click', () => {
  canvas.classList.remove('birdBack');
  canvas.classList.remove('flappy');
});

birds.addEventListener('click', () => {
  canvas.classList.add('birdBack');
  canvas.classList.remove('flappy');
});

flap.addEventListener('click', () => {
  canvas.classList.add('flappy');
  canvas.classList.remove('birdBack');
});
