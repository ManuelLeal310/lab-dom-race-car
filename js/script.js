window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButtonElement = document.getElementById("restart-button");
  let ourNewGame;

  startButton.addEventListener("click", function () {
    ourNewGame = new Game();
    startGame();
  });

  restartButtonElement.addEventListener("click", () => {
    window.location.reload();
    ourNewGame.gameOverScreen.style.display = "none";
    ourNewGame.gameScreen.style.display = "block";
    ourNewGame.player.element.remove();
    ourNewGame = new Game();
    ourNewGame.start();
  });

  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
      ourNewGame.player.directionY = -3;
      console.log("we are going up");
    } else if (event.code === "ArrowDown") {
      ourNewGame.player.directionY = 3;
    } else if (event.code === "ArrowLeft") {
      ourNewGame.player.directionX = -3;
    } else if (event.code === "ArrowRight") {
      ourNewGame.player.directionX = 3;
    } else if (event.code === "Space") {
      if (!ourNewGame.player.isShooting) {
        const theCarLeft = ourNewGame.player.positionLeft;
        const theCarTop = ourNewGame.player.positionTop;
        ourNewGame.projectiles.push(
          new projectile(
            ourNewGame.gameScreen,
            theCarLeft + 57.5,
            theCarTop - 50
          )
        );
        ourNewGame.player.isShooting = true;
      }
      setTimeout(() => {
        ourNewGame.player.isShooting = false;
      }, 1000);
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowUp") {
      ourNewGame.player.directionY = 0;
      console.log("we are going up");
    } else if (event.code === "ArrowDown") {
      ourNewGame.player.directionY = 0;
    } else if (event.code === "ArrowLeft") {
      ourNewGame.player.directionX = 0;
    } else if (event.code === "ArrowRight") {
      ourNewGame.player.directionX = 0;
    }
  });

  function startGame() {
    console.log("start game");
    ourNewGame.start();
  }
};
