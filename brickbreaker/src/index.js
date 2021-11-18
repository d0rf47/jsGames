import Game from "./game";

const GAME_HEIGHT = document.getElementById("gameScreen").height;
const GAME_WIDTH = document.getElementById("gameScreen").width;
const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
const game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);
let lastTime = 0;

function gameLoop(timestamp) {
  game.control();
  requestAnimationFrame(gameLoop);
}

gameLoop();
