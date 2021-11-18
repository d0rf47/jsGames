import InputHandler from "./input";
import Paddle from "./paddle";
import Ball from "./ball";
import Brick from "./brick";
import { Levels } from "./levels";
export default class Game {
  gameState = "stop";
  ctx;
  gameObjs = [];
  bricks = [];
  paddle;
  ball;
  width;
  height;
  score = 0;
  currLevel = 0;
  maxSpeed = 0;
  maxScore = 0;
  levels = Levels;
  maxLevel = this.levels.length;

  constructor(width, height, ctx) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    new InputHandler(this);
  }

  init() {
    document.getElementById("homeScreen").classList.add("invis");
    document.querySelector(".gameWrapper").classList.remove("invis");
    this.start();
    this.gameState = "play";
  }
  start() {
    this.maxSpeed = this.levels[this.currLevel].ballSpeed;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.initBricks();
  }

  control() {
    switch (this.gameState) {
      case "play":
        this.update();
        break;
      case "pause":
        this.ball.stop();
        break;
      case "stop":
        break;
      default:
        break;
    }
  }
  //add switch for game state
  update() {
    if (this.maxScore === this.score) {
      this.nextLevel();
    } else {
      this.ball.update();
      this.paddle.update();
      this.bricks.forEach((b) => b.update());
      this.updateScore();
    }
  }

  initBricks() {
    for (let i = 0; i < this.levels[this.currLevel].bricks.length; i++) {
      this.levels[this.currLevel].bricks[i].forEach((br) => {
        if (br === 1) {
          this.bricks.push(new Brick(this, i + 1, true));
          this.maxScore++;
        } else {
          this.bricks.push(new Brick(this, i + 1, false));
        }
      });
    }
  }

  updateScore() {
    document.getElementById("score").innerHTML = this.score;
  }

  nextLevel() {
    this.currLevel++;
    document.getElementById("level").innerHTML = this.currLevel;
    this.bricks = [];
    this.start();
    this.gameState = "pause";
  }
}
