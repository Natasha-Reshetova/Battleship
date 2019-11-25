class Field {
  constructor() {
    this.arrShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    this.battleshipGrid = [];
    for (let i = 0; i < 12; i++) {
      this.battleshipGrid.push([]);
      for (let n = 0; n < 12; n++) {
          var cell = {
          isShip: false,
          isHit: false,
          isKilled: false,
          shipCells: []
        };
        this.battleshipGrid[i].push(cell);
        this.arr = [];
      }
    }
    this.arrForChecking = [];
  }

  init() {
    while (this.arrShips.length > 0) {
      this.generateShip();
    }
    this.render();
  }

  getRandomFirstCell() {
    let firstcellShipX = Math.floor(1 + Math.random() * 10);
    let firstcellShipY = Math.floor(1 + Math.random() * 10);
    return [firstcellShipX, firstcellShipY];
  }

  chooseOrientationNumber() {
    return Math.floor(Math.random() * 2);
  }

  canPutShip(firstcellShipX, firstcellShipY, orientation) {
    let isAllowedDrow = true;
    this.arr = [];
    for (let k = 0; k < this.arrShips[0]; k++) {
      let n = firstcellShipX;
      let i = firstcellShipY;
      for (let a = i - 1; a < i + 2; a++) {
        for (let b = n - 1; b < n + 2; b++) {
          if (this.battleshipGrid[b][a].isShip === true) {
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
    // if (isAllowedDrow) {
    //   this.putShip(orientation, this.arr);
    //   this.arr = [];
    // } else {
    //   this.arr = [];
    //   this.generateShip();
    // }
    return isAllowedDrow;
  }

  generateShip() {
    let randomCell = this.getRandomFirstCell();
    let firstcellShipX = randomCell[0];
    let firstcellShipY = randomCell[1];
    let orientation = this.chooseOrientationNumber();

    if (orientation === 0) {
      if (firstcellShipX + this.arrShips[0] > 11) {
        this.generateShip();
        return;
      }
    }
    if (orientation === 1) {
      if (firstcellShipY + this.arrShips[0] > 11) {
        this.generateShip();
        return;
      }
    }
    let isAllowedDrow = this.canPutShip(firstcellShipX, firstcellShipY, orientation);
      if (isAllowedDrow) {
        this.putShip(orientation, firstcellShipX, firstcellShipY);
        this.arr = [];
      } else {
        this.arr = [];
        this.generateShip();
      }
  }

  putShip(orientation, firstcellShipX, firstcellShipY) {
    if (this.arr.length !== 0) {
      this.arrForChecking.push(this.arr);
      this.arr = [];
    }
    // let firstcellShipX = this.firstCoordinate[0];
    // let firstcellShipY = this.firstCoordinate[1];
    for (let k = 0; k < this.arrShips[0]; k++) {

      for (let i = 1; i < 12; i++) {
        for (let n = 1; n < 12; n++) {
          if (firstcellShipX === i) {
            if (firstcellShipY === n) {
              this.battleshipGrid[firstcellShipX][firstcellShipY].isShip = true;
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
        if (this.battleshipGrid[i][n].isShip) {
          if (!this.battleshipGrid[i][n].isHit) {
            this.battleshipGrid[i][n] = document.createElement("div");
            this.battleshipGrid[i][n].className = "ship";
            this.battleshipGrid[i][n].isShip = true;
            this.battleshipGrid[i][n].isHit = false;
            smallContainer.appendChild(this.battleshipGrid[i][n]);
            this.battleshipGrid[i][n].addEventListener("click", () => this.shoot(i, n))
          } else {
            this.battleshipGrid[i][n] = document.createElement("div");
            this.battleshipGrid[i][n].className = "hit";
            this.battleshipGrid[i][n].isShip = true;
            this.battleshipGrid[i][n].isHit = true;
            smallContainer.appendChild(this.battleshipGrid[i][n]);
          }
        } else {
          if (this.battleshipGrid[i][n].isHit) {
            this.battleshipGrid[i][n] = document.createElement("div");
            this.battleshipGrid[i][n].className = "miss";
            this.battleshipGrid[i][n].isShip = false;
            this.battleshipGrid[i][n].isHit = true;
            smallContainer.appendChild(this.battleshipGrid[i][n]);
          }
          else {
            this.battleshipGrid[i][n] = document.createElement("div");
            this.battleshipGrid[i][n].className = "sea";
            this.battleshipGrid[i][n].isShip = false;
            this.battleshipGrid[i][n].isHit = false;
            smallContainer.appendChild(this.battleshipGrid[i][n]);
            this.battleshipGrid[i][n].addEventListener("click", () => this.shoot(i, n))
          }
        }
      }
    }
  }


  shoot(i, n) {
    this.battleshipGrid[i][n].isHit = true;
    if (this.battleshipGrid[i][n].isShip) {
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
