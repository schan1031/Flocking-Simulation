document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 1200;
  canvasEl.height = 700;

  const ctx = canvasEl.getContext("2d");

  ctx.beginPath();
  ctx.arc(100, 100, 20, 0, 2*Math.PI, true);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 4;
  ctx.stroke();

  // const game = new GameView(ctx);
  // game.start();
});
