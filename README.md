# Flocking Simulation Proposal

See this simulation live at [Flocking Simulation](https://schan1031.github.io/Flocking-Simulation/)

## What is Flocking?

Flocking is a behavioral phenomenon of birds, with similar parallels in the grouping behavior of fish and swarming of insects. Flocking can be simulated based on mathematical principals applied to each and every bird. There are no lead birds, only a set of behavioral rules which apply equally to every bird in the flock.

## Features

This simulation allows for customizing the parameters controlling the birds. Users can adjust the number of birds, velocity of birds, neighbor radius, and the flocking parameters which define the behavior of the birds, explained below. In addition, the simulation may be paused by clicking anywhere on the canvas.

## Simulation

This simulation was developed by defining the behavior of one single bird, and then applying it to a large array of birds. Each bird calculates its new velocity based on the surrounding birds and adjusts its position accordingly every frame. All calculations were performed in three dimensions. The parameters available are:
- Number of birds
- Neighbor radius
- Bird Velocity

In addition, birds are repelled from walls, applying a force in the opposite direction as they approach the wall. This is shown in the following sample:

```javascript
const wallX = this.flock.dims[0];

if (this.pos[0] > (wallX - 100)) {
  const diffX = wallX - this.pos[0];
  this.vel[0] += -1 / (diffX / 25);
}
if (this.pos[0] < 100) {
  this.vel[0] += 1 / (this.pos[0] / 25);
}
```

Birds are generated in random positions throughout the space, and given random direction and velocities, and through the rules of flocking, they will group up together.

```javascript
for (let i = 0; i < this.numBirds; i++) {
  const rand = colors[Math.floor(Math.random() * colors.length)];
  const pos = this.randomPos();
  const vel = this.randomVel();
  this.birds.push(new Birdy(this, {key: i, pos: pos, vel: vel, radius: 4, color: rand}));
}
```


## How does it work?

Flocking is governed by three rules of behavior. These three forces are **cohesion**, **alignment** and **separation**.

### Cohesion

Cohesion is the rule which keeps birds near each other by pulling birds in the direction of their neighbors. Cohesion is calculated by finding the average position of all nearby neighbors, and applying a vector in that direction.

### Alignment

Alignment is the rule which gives direction to a flock. Each bird looks at the average direction of all of its nearby neighbors and applies a force in that direction. This allows the flock to move in a direction instead of staying in one area.

### Separation

Separation is the rule which prevents birds from overlapping one another. As a bird approaches another, a force is applied in the opposite direction to prevent the birds from getting too close. The force grows stronger as birds get closer together.

## Future Steps

Some bonus features to be implemented in the future:
- [x] 3D calculations
- [x] Bird sprite animations (Two Choices)
- [ ] Predator factor (Partially functional, works better in 2D)
- [ ] Select a single bird and track movement
