export default class InputHandler {
  constructor(game) {
    
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          game.paddle.moveLeft();
          break;
        case 39:
          game.paddle.moveRight();
          break;
        case 13:
          game.ball.start();
          break;
        case 27:
          game.ball.stop();
          break;
        case 32:
          game.init();
          break;
        default:
          return;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          game.paddle.stop();
          break;
        case 39:
          game.paddle.stop();
          break;
        default:
          break;
      }
    });
  }
}
