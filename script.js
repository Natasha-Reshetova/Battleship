class Field {
  constructor() {
    this.arrShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    this.matrix = [];
    for (let i = 0; i < 12; i++) {
      this.matrix.push([]);
      for (let n = 0; n < 12; n++) {
        this.cell = {
          isShip: false,
          isHit: false,
          isKilled: false
        };
        this.matrix[i].push(this.cell);
        this.arr = [];
      }
    }
    this.firstCoordinate = [];
    this.arrForChecking = [];
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

  chooseOrientationNumber() {
    return Math.floor(Math.random() * 2);
  }

  checkShip(firstcellShipX, firstcellShipY, orientation) {
    let isAllowedDrow = true;
    this.arr = [];
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
      this.arr.push([[firstcellShipX, firstcellShipY], false]);
      if (orientation === 0) {
        firstcellShipX = firstcellShipX + 1;
      }
      if (orientation === 1) {
        firstcellShipY = firstcellShipY + 1;
      }
    }
    if (isAllowedDrow) {
      this.drowShip(orientation, this.arr);
      this.arr = [];
    } else {
      this.arr = [];
      this.makeShip();
    }
  }

  makeShip() {
    this.makeRandomNumberFirstCell();
    let firstcellShipX = this.firstCoordinate[0];
    let firstcellShipY = this.firstCoordinate[1];
    let orientation = this.chooseOrientationNumber();

    if (orientation === 0) {
      if (firstcellShipX + this.arrShips[0] > 11) {
        this.makeShip();
        return;
      }
    }
    if (orientation === 1) {
      if (firstcellShipY + this.arrShips[0] > 11) {
        this.makeShip();
        return;
      }
    }
    this.checkShip(firstcellShipX, firstcellShipY, orientation);
  }

  drowShip(orientation) {
    if (this.arr.length !== 0) {
      this.arrForChecking.push(this.arr);
      this.arr = [];
    }
    let firstcellShipX = this.firstCoordinate[0];
    let firstcellShipY = this.firstCoordinate[1];
    for (let k = 0; k < this.arrShips[0]; k++) {

      for (let i = 1; i < 12; i++) {
        for (let n = 1; n < 12; n++) {
          if (firstcellShipX === i) {
            if (firstcellShipY === n) {
              this.matrix[firstcellShipX][firstcellShipY].isShip = true;
            }
          }
        }
      }
      if (orientation === 0) {
        firstcellShipX = firstcellShipX + 1;
      }
      if (orientation === 1) {
        firstcellShipY = firstcellShipY + 1;
      }
    }
    this.arrShips.shift();
  }

  render() {
    if (document.querySelector(".container")) {
        document.querySelector(".container").remove();
    }

    var container = document.createElement("div");
    container.className = "container";
    document.body.appendChild(container);

    for (let i = 1; i < 11; i++) {
      var smallContainer = document.createElement("div");
      smallContainer.className = "small-container";
      document.querySelector(".container").appendChild(smallContainer);
      for (let n = 1; n < 11; n++) {
        if (this.matrix[i][n].isShip) {
          if (!this.matrix[i][n].isHit) {
            this.matrix[i][n] = document.createElement("div");
            this.matrix[i][n].className = "ship";
            this.matrix[i][n].isShip = true;
            this.matrix[i][n].isHit = false;
            smallContainer.appendChild(this.matrix[i][n]);
            this.matrix[i][n].addEventListener("click", () => this.shoot(i, n))
          } else {
            this.matrix[i][n] = document.createElement("div");
            this.matrix[i][n].className = "hit";
            this.matrix[i][n].isShip = true;
            this.matrix[i][n].isHit = true;
            smallContainer.appendChild(this.matrix[i][n]);
          }
        } else {
          if (this.matrix[i][n].isHit) {
            this.matrix[i][n] = document.createElement("div");
            this.matrix[i][n].className = "miss";
            this.matrix[i][n].isShip = false;
            this.matrix[i][n].isHit = true;
            smallContainer.appendChild(this.matrix[i][n]);
          }
          else {
            this.matrix[i][n] = document.createElement("div");
            this.matrix[i][n].className = "sea";
            this.matrix[i][n].isShip = false;
            this.matrix[i][n].isHit = false;
            smallContainer.appendChild(this.matrix[i][n]);
            this.matrix[i][n].addEventListener("click", () => this.shoot(i, n))
          }
        }
      }
    }
  }


  shoot(i, n) {
    this.matrix[i][n].isHit = true;
    if (this.matrix[i][n].isShip) {
      for (let b=0; b<this.arrForChecking.length; b++) {
        for (let a=0; a<this.arrForChecking[b].length; a++) {
          if (this.arrForChecking[b][a][0][0] === i && this.arrForChecking[b][a][0][1] === n) {
            this.arrForChecking[b][a][1] = true;
            if (this.arrForChecking[b][a][1]) {
              for (let k=0; k<this.arrForChecking[b]; k++) {
              if (!this.arrForChecking[b][k][1]) {
                break;
                }
              }
            }
          }
        }
          
      }
      
    }
    this.render();
  }
}
new Field().init()
