class Field {
    constructor() {
        this.arrShips = [4, 3, 3];
        this.matrix = [];
        for (let i = 0; i < 12; i++) {
            this.matrix.push([]);
            for (let n = 0; n < 12; n++) {
                this.cell = false;
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

      if (this.matrix[firstcellShipY][firstcellShipX] === true) {
        this.makeRandomNumberFirstCell();
        return;
      }  
      this.firstCoordinate.push(firstcellShipX, firstcellShipY);   
    }
  
    chooseDirectionNumber() {
      return Math.floor(Math.random() * 2);
    }
  
    drowShip(firstcellShipX, firstcellShipY) {
      // for (let i = 1; i < 12; i++) {
      //   for (let n = 1; n < 12; n++) {
        let n = firstcellShipX;
        let i = firstcellShipY;
          for (let a=i-1; a<i+1; a++) {
            for (let b= n-1; b<n+1; b++) {
              if (this.matrix[a][b] === true) {
                this.makeShip();
                return;
              }
            }
          }
             // this.matrix[i][n] = true;
              
            
          
      //   }
      // }
    }
  
    makeShip() {
        this.makeRandomNumberFirstCell();
        let firstcellShipX = this.firstCoordinate[0];
        let firstcellShipY = this.firstCoordinate[1];
        var direction = this.chooseDirectionNumber();

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
        for (let i = 0; i < this.arrShips[0]; i++) {
          this.drowShip(firstcellShipX, firstcellShipY);
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
          if (this.matrix[i][n] === true) {
            this.matrix[i][n] = document.createElement("div");
            this.matrix[i][n].className = "ship";
            document.querySelector(".small-container").appendChild(this.matrix[i][n]);
          }
          else {
            this.matrix[i][n] = document.createElement("div");
            this.matrix[i][n].className = "sea";
            document.querySelector(".small-container").appendChild(this.matrix[i][n]);
          }
        }
      }
    }


}
  new Field().init()
  