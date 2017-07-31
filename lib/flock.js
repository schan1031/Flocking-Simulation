import Bird from './bird';

export default class Flock {
  constructor(num) {
    this.numBirds = num;
    this.birds = [];
    this.neighborRadius = 100;
    this.separationRadius = 25;
  }

  populateFlock() {
    for (let i = 0; i < this.numBirds; i++) {
      const pos = this.randomPos();
      const vel = this.randomVel();
      this.birds.push(new Bird(this, {key: i, pos: pos, vel: vel, radius: 5, color: 'black'}));
    }
  }

  wrap(pos) {
    if (pos[0] > 1200) {
      pos[0] = 0;
    } else if (pos[0] < 0) {
      pos[0] = 1200;
    }
    if (pos[1] > 700) {
      pos[1] = 0;
    } else if (pos[1] < 0) {
      pos[1] = 700;
    }
  }

  randomPos() {
    const xPos = Math.floor(Math.random()*1200);
    const yPos = Math.floor(Math.random()*700);
    return [xPos, yPos];
  }

  randomVel() {
    const xVel = Math.floor(Math.random()*5) - 2.5;
    const yVel = Math.floor(Math.random()*5) - 2.5;
    return [xVel, yVel];
  }

  moveBirds() {
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].move();
    }
  }

  draw(ctx) {
    this.moveBirds();
    ctx.clearRect(0, 0, 1200, 700);
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].draw(ctx);
    }
  }
}
