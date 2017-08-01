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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bird__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__flock__ = __webpack_require__(2);



const f = new __WEBPACK_IMPORTED_MODULE_1__flock__["a" /* default */](200);
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Bird {
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
    const sepFactor = 0.2;
    const alignmentFactor = 0.5;
    const cohesionFactor = 0.5;


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
          const xSep = xDif/dist;
          const ySep = yDif/dist;

          const force = this.flock.separationRadius - dist;

          // Separation
          this.vel[0] += -1 * xSep * force * sepFactor;
          this.vel[1] += -1 * ySep * force * sepFactor;
        }

        count += 1;
      }
    }

    if (count > 0) {
      centroid[0] = centroid[0] / count;
      centroid[1] = centroid[1] / count;

      // Alignment
      flockVel[0] = flockVel[0] / count;
      flockVel[1] = flockVel[1] / count;

      this.vel[0] += flockVel[0] * alignmentFactor;
      this.vel[1] += flockVel[1] * alignmentFactor;


      // Cohesion
      let delVel = [centroid[0] - this.pos[0], centroid[1] - this.pos[1]];
      let delMag = Math.sqrt(delVel[0]*delVel[0] + delVel[1]*delVel[1]);
      delVel[0] = delVel[0] / delMag;
      delVel[1] = delVel[1] / delMag;

      this.vel[0] += delVel[0] * cohesionFactor;
      this.vel[1] += delVel[1] * cohesionFactor;

    }
  }

  move() {
    this.changeVel();

    let mag = Math.sqrt(this.vel[0]*this.vel[0] + this.vel[1]*this.vel[1]);

    if (mag > 4) {
      this.vel[0] = this.vel[0] / mag * 4;
      this.vel[1] = this.vel[1] / mag * 4;
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

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    this.pos[0] = this.pos[0];
    this.pos[1] = this.pos[1];

    this.flock.wrap(this.pos);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 2*Math.PI, false);
    ctx.lineWidth = 0;
    // ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bird;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bird__ = __webpack_require__(1);


class Flock {
  constructor(num) {
    this.numBirds = num;
    this.birds = [];
    this.neighborRadius = 50;
    this.separationRadius = 25;
  }

  populateFlock() {
    const colors = ['black','red','blue','green','yellow','orange','purple'];
    for (let i = 0; i < this.numBirds; i++) {
      const rand = colors[Math.floor(Math.random() * colors.length)];
      const pos = this.randomPos();
      const vel = this.randomVel();
      this.birds.push(new __WEBPACK_IMPORTED_MODULE_0__bird__["a" /* default */](this, {key: i, pos: pos, vel: vel, radius: 4, color: 'black'}));
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
    ctx.clearRect(0, 0, 1600, 900);
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].draw(ctx);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Flock;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map