class projectile {
  constructor(gameScreen, carLeft, carTop) {
    this.left = carLeft;
    this.top = carTop;
    this.width = 50;
    this.heigth = 100;
    this.boom = new Audio("./assets/laser.mp3");
    this.boom.volume = 0.1;
    this.boom.play();
    this.element = document.createElement("img");
    this.element.src = "./images/src/laser.png";
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.heigth}px`;
    gameScreen.appendChild(this.element);
  }
  move() {
    this.top -= 6;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
