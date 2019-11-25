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
      }
    }
    this.arrForChecking = [];
    this.successfulPoints = 0;
    this.allPoints = 0;
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
      if (orientation === 0) {
        firstcellShipX = firstcellShipX + 1;
      }
      if (orientation === 1) {
        firstcellShipY = firstcellShipY + 1;
      }
    }
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
      } else {
        this.generateShip();
      }
  }

  putShip(orientation, firstcellShipX, firstcellShipY) {
    let shipCells = [];
    this.arrForChecking.push(shipCells);

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
      shipCells.push([firstcellShipX, firstcellShipY]);
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

    if (this.successfulPoints === 20) {
      var successfulPoints = document.createElement("div");
      successfulPoints.innerHTML = "Количество попаданий: " + this.successfulPoints;
      document.body.appendChild(successfulPoints);

      var allPoints = document.createElement("div");
      allPoints.innerHTML = "Общее количество выстрелов: " + this.allPoints;
      document.body.appendChild(allPoints)
    }

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
          }  else {
            if (this.battleshipGrid[i][n].isKilled) {
              this.battleshipGrid[i][n] = document.createElement("div");
              this.battleshipGrid[i][n].className = "killed";
              this.battleshipGrid[i][n].isShip = true;
              this.battleshipGrid[i][n].isHit = true;
              this.battleshipGrid[i][n].isKilled = true;
              smallContainer.appendChild(this.battleshipGrid[i][n]);
            }
            else {
            this.battleshipGrid[i][n] = document.createElement("div");
            this.battleshipGrid[i][n].className = "hit";
            this.battleshipGrid[i][n].isShip = true;
            this.battleshipGrid[i][n].isHit = true;
            smallContainer.appendChild(this.battleshipGrid[i][n]);              
            }

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


  shoot(x, y) {
    this.battleshipGrid[x][y].isHit = true;
    this.allPoints = this.allPoints + 1;
    if (!this.battleshipGrid[x][y].isShip) {
      this.render();
      return;
    }
    this.successfulPoints = this.successfulPoints + 1;
    let shipCells = this.getShipCells(x, y);
    for (let shipCell of shipCells) {
      if(!this.battleshipGrid[shipCell[0]][shipCell[1]].isHit) {
        this.render();
        return;
      }
    }
    for (let shipCell of shipCells) {
      this.battleshipGrid[shipCell[0]][shipCell[1]].isKilled = true;
      for (let a = shipCell[0] - 1; a < shipCell[0] + 2; a++) {
        for (let b = shipCell[1] - 1; b < shipCell[1] + 2; b++) {
          if (!this.battleshipGrid[a][b].isShip) {
            this.battleshipGrid[a][b].isHit = true;
          }
        }
      }
    }
    this.render();
  }

  getShipCells(x, y) {
    for (let b=0; b<this.arrForChecking.length; b++) {
        for (let a=0; a<this.arrForChecking[b].length; a++) {
          if (this.arrForChecking[b][a][0] === x && this.arrForChecking[b][a][1] === y) {
            return this.arrForChecking[b];
            }
        } 
      }
    }
}
new Field().init()
