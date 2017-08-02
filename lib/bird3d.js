export default class Birdy {
  constructor(flock, hash) {
    this.flock = flock;
    this.key = hash['key'];
    this.pos = hash['pos'];
    this.vel = hash['vel'];
    this.radius = this.flock.radius;
    this.color = hash['color'];
    this.counter = 0;
    this.frame = 1;
    this.changeVel = this.changeVel.bind(this);
  }

  changeVel() {

    // Defaults 0.2, 0.5, 0.2
    const sepFactor = this.flock.separation;
    const alignmentFactor = this.flock.alignment;
    const cohesionFactor = this.flock.cohesion;

    const birds = this.flock.birds;
    let centroid = [0, 0, 0];
    let flockVel = [0, 0, 0];

    let count = 0;
    for (let i = 0; i < birds.length; i++) {
      const bird = birds[i];

      // Distance
      const xDif = bird.pos[0] - this.pos[0];
      const yDif = bird.pos[1] - this.pos[1];
      const zDif = bird.pos[2] - this.pos[2];
      const dist = Math.sqrt(xDif*xDif + yDif*yDif + zDif*zDif);

      if (dist < this.flock.neighborRadius && bird.key !== this.key && bird.key < this.flock.numBirds) {
        centroid[0] += bird.pos[0];
        centroid[1] += bird.pos[1];
        centroid[2] += bird.pos[2];

        flockVel[0] += bird.vel[0];
        flockVel[1] += bird.vel[1];
        flockVel[2] += bird.vel[2];

        if (dist < this.flock.separationRadius) {
          const xSep = xDif/dist;
          const ySep = yDif/dist;
          const zSep = zDif/dist;

          const force = this.flock.separationRadius - dist;

          // Separation
          this.vel[0] += -1 * xSep * force * sepFactor;
          this.vel[1] += -1 * ySep * force * sepFactor;
          this.vel[2] += -1 * zSep * force * sepFactor;

          // Predator
          // if (bird.key === -1) {
          //   if (xDif < 0) {
          //     this.vel[0] += 10;
          //   } else {
          //     this.vel[0] -= 10;
          //   }
          //
          //   if (yDif < 0) {
          //     this.vel[1] += 10;
          //   } else {
          //     this.vel[1] -= 10;
          //   }
          // }
        }

        count += 1;
      }
    }

    if (count > 0) {
      centroid[0] = centroid[0] / count;
      centroid[1] = centroid[1] / count;
      centroid[2] = centroid[2] / count;

      // Alignment
      flockVel[0] = flockVel[0] / count;
      flockVel[1] = flockVel[1] / count;
      flockVel[2] = flockVel[2] / count;

      this.vel[0] += flockVel[0] * alignmentFactor;
      this.vel[1] += flockVel[1] * alignmentFactor;
      this.vel[2] += flockVel[2] * alignmentFactor;


      // Cohesion
      let delVel = [centroid[0] - this.pos[0], centroid[1] - this.pos[1], centroid[2] - this.pos[2]];
      let delMag = Math.sqrt(delVel[0]*delVel[0] + delVel[1]*delVel[1] + delVel[2]*delVel[2]);
      delVel[0] = delVel[0] / delMag;
      delVel[1] = delVel[1] / delMag;
      delVel[2] = delVel[2] / delMag;

      this.vel[0] += delVel[0] * cohesionFactor;
      this.vel[1] += delVel[1] * cohesionFactor;
      this.vel[2] += delVel[2] * cohesionFactor;

    }
  }

  move() {
    this.changeVel();

    let mag = Math.sqrt(this.vel[0]*this.vel[0] + this.vel[1]*this.vel[1] + this.vel[2]*this.vel[2]);

    if (mag > this.flock.velocity) {
      this.vel[0] = this.vel[0] / mag * this.flock.velocity;
      this.vel[1] = this.vel[1] / mag * this.flock.velocity;
      this.vel[2] = this.vel[2] / mag * this.flock.velocity;
    }

    // Avoid Walls X
    const wallX = this.flock.dims[0];
    const wallY = this.flock.dims[1];
    const wallZ = this.flock.dims[2];

    if (this.pos[0] > (wallX - 100)) {
      const diffX = wallX - this.pos[0];
      this.vel[0] += -1 / (diffX / 25);
    }
    if (this.pos[0] < 100) {
      this.vel[0] += 1 / (this.pos[0] / 25);
    }

    // Avoid Walls Y
    if (this.pos[1] > wallY - 100) {
      const diffY = wallY - this.pos[1];
      this.vel[1] += -1 / (diffY / 25);
    }
    if (this.pos[1] < 100) {
      this.vel[1] += 1 / (this.pos[1] / 25);
    }

    // Avoid Walls Z
    if (this.pos[2] > wallZ - 100) {
      const diffZ = wallZ - this.pos[2];
      this.vel[2] += -1 / (diffZ / 25);
    }
    if (this.pos[2] < 100) {
      this.vel[2] += 1 / (this.pos[2] / 25);
    }

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos[2] += this.vel[2];
  }

  draw(ctx) {

    const depth = this.pos[2];
    const rad = (800 - depth)/800 * 7 + 2;
    const colorVal = (rad - 2) * (100 / 7);

    // ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1], rad, 2*Math.PI, false);
    // ctx.lineWidth = 0;
    // ctx.fillStyle = this.color;
    // ctx.fill();
    // ctx.closePath();

    // Flappy birds
    const fac = Math.floor(((800 - depth) / 1600 + 0.5)*100)/100;
    const xSize = 40 * fac;
    const ySize = 30 * fac;

    const xLoc = [0, 28, 56];
    const xLocFlip = [490, 462, 434];
    let num = this.frame;

    if (this.counter % 20 === 0) {
      this.frame = Math.floor(Math.random() * 3);
    }

    if (this.vel[0] > 0) {
      ctx.drawImage(this.flock.img, xLoc[num], 490, 20, 15, this.pos[0], this.pos[1], xSize, ySize);
    } else {
      ctx.drawImage(this.flock.imgFlip, xLocFlip[num], 490, 20, 15, this.pos[0], this.pos[1], xSize, ySize);
    }

    this.counter += 1;

  }
}
