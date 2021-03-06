/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flock3d__ = __webpack_require__(3);


let numBirds = 0;

$( "#slider-1" ).bind( "slidechange", function(event, ui) {
    numBirds = ui.value;
});

const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

const f = new __WEBPACK_IMPORTED_MODULE_0__flock3d__["a" /* default */](vw, vh, 800);
f.populateFlock();

let options = document.getElementById("options");
let pause = document.getElementById("pause");

document.getElementById("header").addEventListener('click', () => {
  if (options.style.display === 'flex') {
    options.style.display = 'none';
  } else {
    options.style.display = 'flex';
  }
});

let help = document.getElementById('info');

document.getElementById('helpheader').addEventListener('click', () => {
  if (help.style.display === 'block') {
    help.style.display = 'none';
  } else {
    help.style.display = 'block';
  }
});

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = vw;
  canvasEl.height = vh;

  const ctx = canvasEl.getContext("2d");

  let timer = setInterval(() => {
    f.draw(ctx);
  }, 20);

  let counter = 2;
  canvasEl.addEventListener('click', () => {
    if (counter % 2 === 0) {
      clearInterval(timer);
      counter += 1;
      pause.style.display = 'block';
    } else {
      timer = setInterval(() => {
        f.draw(ctx);
      }, 20);
      counter += 1;
      pause.style.display = 'none';
    }
  });
});

const canvas = document.getElementById('game-canvas');
const birds = document.getElementById('birds');
const balls = document.getElementById('balls');
const flap = document.getElementById('flappy');

balls.addEventListener('click', () => {
  canvas.classList.remove('birdBack');
  canvas.classList.remove('flappy');
});

birds.addEventListener('click', () => {
  canvas.classList.add('birdBack');
  canvas.classList.remove('flappy');
});

flap.addEventListener('click', () => {
  canvas.classList.add('flappy');
  canvas.classList.remove('birdBack');
});


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bird3d__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__predator__ = __webpack_require__(5);



class Flocky {
  constructor(dimX, dimY, dimZ) {
    this.numBirds = 300;
    this.birds = [];
    this.neighborRadius = 60;
    this.separationRadius = 40;
    this.dims = [dimX, dimY, dimZ];
    this.getSliderVals = this.getSliderVals.bind(this);

    // Sprites
    this.img = new Image();
    this.img.src = 'assets/images/flappybird.png';
    this.imgFlip = new Image();
    this.imgFlip.src = 'assets/images/flappybirdflip.png';

    this.birdImg = new Image();
    this.birdImg.src = 'assets/images/bird.png';
    this.birdImgFlip = new Image();
    this.birdImgFlip.src = 'assets/images/birdflipped.png';
  }

  getSliderVals() {
    this.cohesion = $("#cohesion").val();
    this.alignment = $("#alignment").val();
    this.separation = $("#separation").val();
    this.velocity = $("#velocity").val();
    this.radius = $("#radius").val();
    this.numBirds = $("#numbirds").val();
  }

  populateFlock() {
    const colors = ['white','red','blue','green','purple'];
    for (let i = 0; i < this.numBirds; i++) {
      const rand = colors[Math.floor(Math.random() * colors.length)];
      const pos = this.randomPos();
      const vel = this.randomVel();
      this.birds.push(new __WEBPACK_IMPORTED_MODULE_0__bird3d__["a" /* default */](this, {key: i, pos: pos, vel: vel, radius: 4, color: rand}));
    }
    // Possible predator bird with different behavior.
    // this.birds.push(new Predator(this, {key: -1, pos: this.randomPos(), vel: this.randomVel(), radius: 20, color: 'orange'}));
  }

  randomPos() {
    const xPos = Math.floor(Math.random()*this.dims[0]);
    const yPos = Math.floor(Math.random()*this.dims[1]);
    const zPos = Math.floor(Math.random()*this.dims[2]);
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
    this.getSliderVals();
    this.moveBirds();
    ctx.clearRect(0, 0, this.dims[0], this.dims[1]);
    for (let i = 0; i < this.birds.length; i++) {
      if (this.birds[i].key < this.numBirds) {
        this.birds[i].draw(ctx);
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Flocky;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Birdy {
  constructor(flock, hash) {
    this.flock = flock;
    this.key = hash['key'];
    this.pos = hash['pos'];
    this.vel = hash['vel'];
    this.radius = this.flock.radius;
    this.color = hash['color'];
    this.counter = 0;
    this.frame = -1;
    this.birdInd = -1;
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

    let theme = $('input[name=theme]:checked').val();

    const depth = this.pos[2];
    const rad = (800 - depth)/800 * 7 + 2;
    const colorVal = (rad - 2) * (100 / 7);

    if (theme === 'balls') {

      // Balls
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], rad, 2*Math.PI, false);
      ctx.lineWidth = 0;
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();

    } else if (theme === 'flappy') {

      // Flappy birds
      const fac = Math.floor(((800 - depth) / 1600 + 0.5)*100)/100;
      let xSize = 40 * fac * 1.4;
      xSize += (this.vel[2] - 6);
      const ySize = 30 * fac * 1.4;

      const xLoc = [0, 28, 56];
      const yLoc = 490;
      const xLocFlip = [490, 462, 434];
      let num = this.frame;

      if (this.counter % 20 === 0) {
        this.frame = Math.floor(Math.random() * 3);
      }

      if (this.vel[0] > 0) {
        ctx.drawImage(this.flock.img, xLoc[num], yLoc, 20, 15, this.pos[0], this.pos[1], xSize, ySize);
      } else {
        ctx.drawImage(this.flock.imgFlip, xLocFlip[num], yLoc, 20, 15, this.pos[0], this.pos[1], xSize, ySize);
      }
      this.counter += 1;
    } else {

      // Birdy

      const fac = Math.floor(((800 - depth) / 1600 + 0.5)*100)/100;
      let xSize = 64 * fac * 2;
      xSize += (this.vel[2] - 6);
      const ySize = 55 * fac * 2;

      const xLoc = [0, 64, 128, 192];
      const yLoc = [14, 80];

      if (this.counter % 6 === 0) {
        this.frame += 1;
      }

      if (this.counter % 24 === 0) {
        this.birdInd += 1;
      }
      let num = this.frame % 4;
      let yInd = this.birdInd % 2;

      if (this.vel[0] > 0) {
        ctx.drawImage(this.flock.birdImg, xLoc[num], yLoc[yInd], 64, 55, this.pos[0], this.pos[1], xSize, ySize);
      } else {
        ctx.drawImage(this.flock.birdImgFlip, xLoc[num], yLoc[yInd], 64, 55, this.pos[0], this.pos[1], xSize, ySize);
      }
      this.counter += 1;

    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Birdy;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Predator {
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
/* unused harmony export default */



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map