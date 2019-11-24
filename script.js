class Field {
  constructor() {
    this.arrShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    this.matrix = [];
    for (let i = 0; i < 12; i++) {
      this.matrix.push([]);
      for (let n = 0; n < 12; n++) {
        this.cell = {isShip: false};
        this.matrix[i].push(this.cell);
      }
    }
    this.firstCoordinate = [];
  }

  init() {
    while (this.arrShips.length > 0) {
      this.makeShip();
    }
    this.render();
  }

  makeRandomNumberFirstCell() {
    this.firstCoordinate = [];
    let firstcellShipX = Math.floor(1 + Math.random() * 10);
    let firstcellShipY = Math.floor(1 + Math.random() * 10);

    if (this.matrix[firstcellShipY][firstcellShipX].isShip === true) {
      this.makeRandomNumberFirstCell();
      return;
    }
    this.firstCoordinate.push(firstcellShipX, firstcellShipY);
  }

  chooseDirectionNumber() {
    return Math.floor(Math.random() * 2);
  }

  checkShip(firstcellShipX, firstcellShipY, direction) {
    let isAllowedDrow = true;
    for (let k = 0; k < this.arrShips[0]; k++) {
      let n = firstcellShipX;
      let i = firstcellShipY;
      for (let a = i - 1; a < i + 2; a++) {
        for (let b = n - 1; b < n + 2; b++) {
          if (this.matrix[b][a].isShip === true) {
            isAllowedDrow = false;
          }
        }
      }
      if (direction === 0) {
        firstcellShipX = firstcellShipX + 1;
      }
      if (direction === 1) {
        firstcellShipY = firstcellShipY + 1;
      }
    }
    if (isAllowedDrow) {
      this.drowShip(direction);
    }
    else {
      this.makeShip();
    }
  }

  makeShip() {
    this.makeRandomNumberFirstCell();
    let firstcellShipX = this.firstCoordinate[0];
    let firstcellShipY = this.firstCoordinate[1];
    let direction = this.chooseDirectionNumber();

    if (direction === 0) {
      if (firstcellShipX + this.arrShips[0] > 11) {
        this.makeShip();
        return;
      }
    }
    if (direction === 1) {
      if (firstcellShipY + this.arrShips[0] > 11) {
        this.makeShip();
        return;
      }
    }
    this.checkShip(firstcellShipX, firstcellShipY, direction);
  }

  drowShip(direction) {
    let firstcellShipX = this.firstCoordinate[0];
    let firstcellShipY = this.firstCoordinate[1];
    for (let k = 0; k < this.arrShips[0]; k++) {
      
      for (let i=1; i<12; i++) {
        for (let n=1; n<12; n++) {
          if (firstcellShipX === i) {
            if (firstcellShipY === n) {
              this.matrix[firstcellShipX][firstcellShipY].isShip = true;
            }
          }
        }
      }
      if (direction === 0) {
         firstcellShipX = firstcellShipX + 1;
      }
      if (direction === 1) {
         firstcellShipY = firstcellShipY + 1;
      }
    }
    this.arrShips.shift();
  }

  render() {
    for (let i = 1; i < 11; i++) {
      var smallContainer = document.createElement("div");
      smallContainer.className = "small-container";
      document.querySelector(".container").appendChild(smallContainer);
      for (let n = 1; n < 11; n++) {
        if (this.matrix[i][n].isShip === true) {
          this.matrix[i][n] = document.createElement("div");
          this.matrix[i][n].className = "ship";
          document.querySelector(".small-container").appendChild(this.matrix[i][n]);
          this.matrix[i][n].addEventListener("click", event => this.shoot(event))
        } else {
          this.matrix[i][n] = document.createElement("div");
          this.matrix[i][n].className = "sea";
          document.querySelector(".small-container").appendChild(this.matrix[i][n]);
          this.matrix[i][n].addEventListener("click", event => this.shoot(event))
        }
      }
    }
  }

  shoot(event) {
    if (this.event.target) {
      
    }
  }

}
new Field().init()
