export default class Paddle {
  width;
  height;
  src = new Image(325, 120);
  position = {
    x: 1,
    y: 1
  };
  midPoint;
  maxSpeed = 7.5;
  currSpeed = 0;
  game;

  constructor(gameObj) {
    this.game = gameObj;
    this.width = 325;
    this.height = 120;
    this.position.y = gameObj.height - this.height + 50;
    this.position.x = gameObj.width / 2 - this.width / 2;
    this.src.src = "../assets/paddle.webp";
    this.src.onload = () => {
      gameObj.ctx.drawImage(this.src, this.position.x, this.position.y);
    };
  }

  draw() {
    this.game.ctx.drawImage(this.src, this.position.x, this.position.y);
  }

  update() {
    this.position.x += this.currSpeed;
    this.draw();
  }

  moveLeft() {
    if (this.position.x > 10) this.currSpeed = -this.maxSpeed;
    else this.currSpeed = 0;
  }

  moveRight() {
    if (this.position.x + this.src.width < 790) this.currSpeed = this.maxSpeed;
    else this.currSpeed = 0;
  }

  stop() {
    this.currSpeed = 0;
  }
}
