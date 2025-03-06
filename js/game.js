class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameOverscreen = document.getElementById("game-end");
    this.scoreElement = document.getElementById("score");
    this.livesElemente = document.getElementById("lives");
    this.player = new Player(
      this.gameScreen,
      85,
      400,
      125,
      180,
      "./images/src/space_ship.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.projectiles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.counter = 0;
  }
  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
    this.counter = 0;
  }
  gameLoop() {
    //console.log("game loop");
    this.counter++;
    if (this.counter % 160 === 0) {
      this.obstacles.push(new obstacle(this.gameScreen));
    }
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }

  update() {
    this.player.move();
    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObstacle = this.obstacles[i];
      currentObstacle.move();
      if (this.player.didCollide(currentObstacle)) {
        //console.log("bang!!!");
        this.obstacles.splice(i, 1);
        currentObstacle.element.remove();
        this.lives--;
        this.livesElemente.innerText = this.lives;
      }
      if (this.lives === 0) {
        this.gameIsOver = true;
      }
      if (currentObstacle.top > 650) {
        this.score++;
        this.scoreElement.innerText = this.score;
        this.obstacles.splice(i, 1);
        currentObstacle.element.remove();
      }
    }
    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObstacle = this.obstacles[i];
      currentObstacle.move();
      for (let j = 0; j < this.projectiles.length; j++) {
        const currentProjectile = this.projectiles[j];
        currentProjectile.move();
        if (currentProjectile.didCollide(currentObstacle)) {
          this.projectiles.splice(j, 1);
          currentProjectile.element.remove();
          j--;
          this.obstacles.splice(i, 1);
          currentObstacle.element.remove();
          i--;
        }
      }
    }
    for (let k = 0; k < this.projectiles.length; k++) {
      const currentProjectile = this.projectiles[k];
      currentProjectile.move();
    }
  }

  gameOver() {
    this.gameScreen.style.display = "none";
    this.gameOverscreen.style.display = "block";
  }
}
