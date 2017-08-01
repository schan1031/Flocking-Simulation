import Bird from './bird';
import Flock from './flock';
import Flocky from './flock3d';

const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const f = new Flocky(300, vw, vh, 1500);
f.populateFlock();

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
