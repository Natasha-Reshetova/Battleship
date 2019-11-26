class Battleship {
  init() {
    this.arrShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    this.battleshipGrid = [];
    for (let i = 0; i < 12; i++) {
      this.battleshipGrid.push([]);
      for (let n = 0; n < 12; n++) {
          var cell = {
          isShip: false,
          isHit: false,
          isKilled: false,
        };
        this.battleshipGrid[i].push(cell);
      }
    }
    this.shipCells = [];
    this.successfulPoints = 0;
    this.allPoints = 0;
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
    this.shipCells.push(shipCells);

    for (let k = 0; k < this.arrShips[0]; k++) {
      for (let i = 1; i < 12; i++) {
        this.battleshipGrid[firstcellShipX][firstcellShipY].isShip = true;
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
    if (document.querySelector(".block")) {
        document.querySelector(".block").remove();
        document.querySelector(".game-name").remove();
    }

    var gameName = document.createElement("h1");
    gameName.innerHTML = "Морской бой";
    gameName.className = "game-name";
    document.body.appendChild(gameName);

    var block = document.createElement("div");
    block.className = "block";
    document.body.appendChild(block);

    var container = document.createElement("div");
    container.className = "container";
    block.appendChild(container);

    if (this.successfulPoints === 20) {
      var info = document.createElement("div");
      info.className = "info";
      block.appendChild(info);

      var gameOver = document.createElement("div");
      gameOver.innerHTML = "Игра окончена!";
      gameOver.className = "game-over";
      info.appendChild(gameOver);

      var successfulPoints = document.createElement("div");
      successfulPoints.innerHTML = "Количество попаданий: " + this.successfulPoints;
      successfulPoints.className = "successful-points";
      info.appendChild(successfulPoints);

      var allPoints = document.createElement("div");
      allPoints.innerHTML = "Общее количество выстрелов: " + this.allPoints;
      allPoints.className = "all-points";
      info.appendChild(allPoints);

      var newGame = document.createElement("input");
      newGame.setAttribute("type", "button");
      newGame.setAttribute("value", "Новая игра");
      newGame.className = "new-game";
      newGame.addEventListener("click", () => this.startingNewGame());
      info.appendChild(newGame)
    }

    for (let i = 1; i < 11; i++) {
      var smallContainer = document.createElement("div");
      smallContainer.className = "small-container";
      document.querySelector(".container").appendChild(smallContainer);
      for (let n = 1; n < 11; n++) {
        let cell = document.createElement("div");

        if (!this.battleshipGrid[i][n].isHit) {
          cell.className = "game-cell sea";
        } else {
          if (this.battleshipGrid[i][n].isKilled) {
            cell.className = "game-cell killed";
          } else if (this.battleshipGrid[i][n].isShip) {
            cell.className = "game-cell hit";
          } else {
            cell.className = "game-cell miss";
          }
        }
            if (!this.battleshipGrid[i][n].isHit) {
              cell.addEventListener("click", () => this.shoot(i, n));
          }
          smallContainer.appendChild(cell);  
          }          
        }
    }


  shoot(x, y) {
    this.battleshipGrid[x][y].isHit = true;
    if (this.successfulPoints === 20) {
      return;
    }
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
    for (let b=0; b<this.shipCells.length; b++) {
        for (let a=0; a<this.shipCells[b].length; a++) {
          if (this.shipCells[b][a][0] === x && this.shipCells[b][a][1] === y) {
            return this.shipCells[b];
            }
        } 
      }
    }

  startingNewGame() {
    document.querySelector(".block").remove();
    document.querySelector(".game-name").remove();
    this.init()
  }
}
new Battleship().init()
