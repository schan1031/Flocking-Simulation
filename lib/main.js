import Bird from './bird';
import Flock from './flock';
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

document.getElementById("header").addEventListener('click', () => {
  if (options.style.display === 'flex') {
    options.style.display = 'none';
  } else {
    options.style.display = 'flex';
  }
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = vw;
  canvasEl.height = vh;

  const ctx = canvasEl.getContext("2d");

  setInterval(() => {
    f.draw(ctx);
  }, 20);
});



// const game = new GameView(ctx);
// game.start();
