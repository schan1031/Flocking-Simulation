import Birdy from './bird3d';

export default class Flocky {
  constructor(num) {
    this.numBirds = num;
    this.birds = [];
    this.neighborRadius = 70;
    this.separationRadius = 25;
  }

  populateFlock() {
    const colors = ['black','red','blue','green','yellow','orange','purple'];
    for (let i = 0; i < this.numBirds; i++) {
      const rand = colors[Math.floor(Math.random() * colors.length)];
      const pos = this.randomPos();
      const vel = this.randomVel();
      this.birds.push(new Birdy(this, {key: i, pos: pos, vel: vel, radius: 4, color: 'black'}));
    }
    // this.birds.push(new Bird(this, {key: -5, pos: this.randomPos(), vel: this.randomVel(), radius: 4, color: 'yellow'}));
  }

  wrap(pos) {
    if (pos[0] > 1600) {
      pos[0] = 0;
    } else if (pos[0] < 0) {
      pos[0] = 1600;
    }
    if (pos[1] > 900) {
      pos[1] = 0;
    } else if (pos[1] < 0) {
      pos[1] = 900;
    }
  }

  randomPos() {
    const xPos = Math.floor(Math.random()*1600);
    const yPos = Math.floor(Math.random()*900);
    const zPos = Math.floor(Math.random()*1500);
    return [xPos, yPos, zPos];
  }

  randomVel() {
    const xVel = Math.floor(Math.random()*5) - 2.5;
    const yVel = Math.floor(Math.random()*5) - 2.5;
    const zVel = Math.floor(Math.random()*5) - 2.5;
    return [xVel, yVel, zVel];
  }

  moveBirds() {
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].move();
    }
  }

  draw(ctx) {
    this.moveBirds();
    ctx.clearRect(0, 0, 1600, 900);
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].draw(ctx);
    }
  }
}
