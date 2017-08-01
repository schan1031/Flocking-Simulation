export default class Birdy {
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

    // Defaults 0.2, 0.5, 0.2
    const sepFactor = 1;
    const alignmentFactor = 1;
    const cohesionFactor = 1;


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

      if (dist < this.flock.neighborRadius && bird.key !== this.key) {
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

    if (mag > 8) {
      this.vel[0] = this.vel[0] / mag * 8;
      this.vel[1] = this.vel[1] / mag * 8;
      this.vel[2] = this.vel[2] / mag * 8;
    }

    // Avoid Walls X
    if (this.pos[0] > 1450) {
      const diffX = 1600 - this.pos[0];
      this.vel[0] += -1 / (diffX / 25);
    }
    if (this.pos[0] < 100) {
      this.vel[0] += 1 / (this.pos[0] / 25);
    }

    // Avoid Walls Y
    if (this.pos[1] > 800) {
      const diffY = 900 - this.pos[1];
      this.vel[1] += -1 / (diffY / 25);
    }
    if (this.pos[1] < 100) {
      this.vel[1] += 1 / (this.pos[1] / 25);
    }

    // Avoid Walls Z
    if (this.pos[2] > 1400) {
      const diffZ = 1500 - this.pos[2];
      this.vel[2] += -1 / (diffZ / 25);
    }
    if (this.pos[2] < 100) {
      // console.log(this.vel[2]);
      this.vel[2] += 1 / (this.pos[2] / 25);
      // console.log(this.vel[2]);
    }

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos[2] += this.vel[2];

    // this.pos[0] = this.pos[0];
    // this.pos[1] = this.pos[1];

    // this.flock.wrap(this.pos);
  }

  draw(ctx) {

    const depth = this.pos[2];
    const rad = (1500 - depth)/1500 * 7 + 2;
    const colorVal = (rad - 2) * (100 / 7);

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], rad, 2*Math.PI, false);
    ctx.lineWidth = 0;
    // ctx.stroke();
    // ctx.fillStyle = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
