export default class Ball {
  position = {
    x: 1,
    y: 1
  };
  src = new Image(25, 25);
  maxSpeedY = 5;
  maxSpeedX = 2;
  speed = {
    x: 2,
    y: 5
  };
  game;
  midPoint = 12.5;
  constructor(gameObj) {
    this.game = gameObj;
    this.maxSpeedY = gameObj.maxSpeed;
    this.speed.y = this.maxSpeedY;
    this.position.y = gameObj.height - this.src.height - 30;
    this.position.x = gameObj.width / 2 - this.src.width / 2;
    this.src.src = "../assets/ball.webp";
    this.src.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.game.ctx.clearRect(0, 0, 800, 600);
    this.game.ctx.drawImage(this.src, this.position.x, this.position.y);
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    this.checkBrickCollision();
    this.checkWallCollision();
    this.checkPaddleCollision();
    this.draw();
  }

  checkBrickCollision() {
    this.midPoint = this.position.x + 12.5;
    for (let i = 0; i < this.game.bricks.length; i++) {
      if (this.game.bricks[i].drawable) {
        const brickBtm =
          this.game.bricks[i].position.y + this.game.bricks[i].src.height;
        const brickTop = this.game.bricks[i].position.y;
        const ballTop = this.game.ball.position.y;
        const brickLeft = this.game.bricks[i].position.x;
        const brickRight =
          this.game.bricks[i].position.x + this.game.bricks[i].src.width;

        if (
          ballTop <= brickBtm &&
          ballTop >= brickTop &&
          this.midPoint >= brickLeft &&
          this.midPoint <= brickRight
        ) {
          this.speed.y = -this.speed.y;
          this.game.bricks.splice(i, 1);
          this.game.score += 1;
        }
      }
    }
  }

  checkWallCollision() {
    if (
      this.position.x <= 0 ||
      this.position.x + this.src.width >= this.game.width
    )
      this.speed.x = -this.speed.x;
    if (
      this.position.y + this.src.height >= this.game.height ||
      this.position.y <= 0
    )
      this.speed.y = -this.speed.y;
  }

  checkPaddleCollision() {
    const ballBtm = this.position.y + this.src.height;
    const paddleTop = this.game.paddle.position.y;

    if (ballBtm >= paddleTop && this.inBoundOfPaddle()) {
      this.speed.y = -this.speed.y;
      this.position.y = paddleTop - this.src.height;
    }
  }

  inBoundOfPaddle() {
    const paddleLeft = this.game.paddle.position.x;
    const paddleRight =
      this.game.paddle.position.x + this.game.paddle.src.width;

    if (
      this.position.x >= paddleLeft &&
      this.position.x + this.src.width <= paddleRight
    )
      return true;

    return false;
  }

  stop() {
    if (this.game.gameState === "play") {
      this.game.gameState = "pause";
      this.maxSpeedY = this.speed.y;
      this.maxSpeedX = this.speed.x;
      this.speed.x = 0;
      this.speed.y = 0;
    }
  }

  start() {
    if (this.game.gameState === "pause") {
      this.game.gameState = "play";
      this.speed.x = this.maxSpeedX;
      this.speed.y = this.maxSpeedY;
    }
  }
}
