import Bird from './bird';
import Flock from './flock';

const f = new Flock(200);
f.populateFlock();



document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 1600;
  canvasEl.height = 900;

  const ctx = canvasEl.getContext("2d");

  setInterval(() => {
    f.draw(ctx);
  }, 20);

});



// const game = new GameView(ctx);
// game.start();
