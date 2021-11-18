export default class Brick {
  game;
  src = new Image(150, 70);
  row = 1;
  drawable = true;
  position = {
    x: 5,
    y: 1
  };

  constructor(gameObj, row, drawable) {
    this.src.src = "../assets/brick.webp";
    this.game = gameObj;
    this.row = row;
    this.drawable = drawable;
    this.checkPosition();
    this.src.onload = () => {
      this.draw();
    };
  }

  draw() {
    if (this.drawable)
      this.game.ctx.drawImage(this.src, this.position.x, this.position.y);
  }
  update() {
    this.draw();
  }

  checkPosition() {
    const lastBrick = this.game.bricks[this.game.bricks.length - 1];

    if (lastBrick) {
      if (this.row > lastBrick.row) {
        this.position.y = lastBrick.position.y + this.src.height + 5;
        this.position.x = 5;
      } else {
        this.position.x = lastBrick.position.x + this.src.width * 1.05;
        this.position.y = lastBrick.position.y;
      }
    }
  }
}
