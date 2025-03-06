class Player {
  constructor(
    gameScreen,
    positionLeft,
    positionTop,
    playerWidth,
    playerHeigth,
    playerImageSrc
  ) {
    this.gameScreen = gameScreen;
    this.positionLeft = positionLeft;
    this.positionTop = positionTop;
    this.playerWidth = playerWidth;
    this.playerHeigth = playerHeigth;
    this.directionX = 0;
    this.directionY = 0;
    this.horn = new Audio("./assets/boom.mp3");
    this.horn.volume = 0.1;
    this.element = document.createElement("img");
    this.element.src = "./images/src/space_ship.png";
    this.element.style.position = "absolute";
    this.element.style.top = `${positionTop}px`;
    this.element.style.left = `${positionLeft}px`;
    this.element.style.width = `${playerWidth}px`;
    this.element.style.height = `${playerHeigth}px`;
    this.element.classList.add("spin");
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.positionLeft += this.directionX;
    this.positionTop += this.directionY;
    if (this.positionLeft < 40) {
      this.positionLeft = 40;
    }
    if (this.positionLeft + this.width > 460) {
      this.positionLeft = 460 - this.width;
    }
    if (this.positionTop < 0) {
      this.positionTop = 0;
    }
    if (this.positionTop + this.height > 640) {
      this.positionTop = 640 - this.width;
    }

    this.updatePosition();
    //console.log("inside the player move method");
  }
  updatePosition() {
    this.element.style.top = `${this.positionTop}px`;
    this.element.style.left = `${this.positionLeft}px`;
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
      this.horn.play();
      this.element.classList.add("spin");
      setTimeout(() => {
        this.element.classList.remove("spin");
      }, 750);
      return true;
    }
    return false;
  }
}
