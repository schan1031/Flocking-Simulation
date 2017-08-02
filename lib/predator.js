export default class Predator {
  constructor(flock, hash) {
    this.flock = flock;
    this.key = hash['key'];
    this.pos = hash['pos'];
    this.vel = hash['vel'];
    this.radius = hash['radius'];
    this.color = hash['color'];
  }

  move() {
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
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 2*Math.PI, false);
    ctx.lineWidth = 0;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
