class obstacle {
  constructor(gameScreen) {
    this.possibleXPositions = this.left = Math.floor(Math.random() * 600);
    this.top = -200;
    this.width = 125;
    this.heigth = 190;
    this.element = document.createElement("img");
    this.element.src = "./images/src/enemy.png";
    this.element.style.position = "absolute";
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.heigth}px`;
    gameScreen.appendChild(this.element);
  }
  move() {
    this.top += 3;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }
}
