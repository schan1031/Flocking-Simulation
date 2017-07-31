export default class Bird {
  constructor(flock, hash) {
    this.flock = flock;
    this.key = hash['key'];
    this.pos = hash['pos'];
    this.vel = hash['vel'];
    this.radius = hash['radius'];
    this.color = hash['color'];

    this.changeVel = this.changeVel.bind(this);
  }

  changeVel() {
    const birds = this.flock.birds;
    let centroid = [0, 0];
    let flockVel = [0, 0];

    let count = 0;
    for (let i = 0; i < birds.length; i++) {
      const bird = birds[i];

      // Distance
      const xDif = bird.pos[0] - this.pos[0];
      const yDif = bird.pos[1] - this.pos[1];
      const dist = Math.sqrt(xDif*xDif + yDif*yDif);

      if (dist < this.flock.neighborRadius && bird.key !== this.key) {
        centroid[0] += bird.pos[0];
        centroid[1] += bird.pos[1];

        flockVel[0] += bird.vel[0];
        flockVel[1] += bird.vel[1];

        if (dist < this.flock.separationRadius) {
          
        }

        count += 1;
      }
    }

    if (count > 0) {
      centroid[0] = centroid[0] / count;
      centroid[1] = centroid[1] / count;

      flockVel[0] = flockVel[0] / count;
      flockVel[1] = flockVel[1] / count;

      this.vel[0] += flockVel[0];
      this.vel[1] += flockVel[1];


      // Cohesion
      let delVel = [centroid[0] - this.pos[0], centroid[1] - this.pos[1]];
      let delMag = Math.sqrt(delVel[0]*delVel[0] + delVel[1]*delVel[1]);
      delVel[0] = delVel[0] / delMag;
      delVel[1] = delVel[1] / delMag;

      this.vel[0] += delVel[0];
      this.vel[1] += delVel[1];
    }

  }

  move() {
    this.changeVel();

    let scale = 1;
    let mag = Math.sqrt(this.vel[0]*this.vel[0] + this.vel[1]*this.vel[1]);

    if (mag > 3.5) {
      this.vel[0] = this.vel[0] / mag * 3;
      this.vel[1] = this.vel[1] / mag * 3;
    }

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.pos[0] = this.pos[0];
    this.pos[1] = this.pos[1];

    this.flock.wrap(this.pos);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 2*Math.PI, false);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
