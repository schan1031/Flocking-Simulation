import Bird from './bird';
import Flock from './flock';

const f = new Flock(150);
f.populateFlock();



document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 1200;
  canvasEl.height = 700;

  const ctx = canvasEl.getContext("2d");

  setInterval(() => {
    f.draw(ctx);
  }, 25);

});



// const game = new GameView(ctx);
// game.start();
