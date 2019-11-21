class Field {
    constructor() {
      var startNumber = 0;
      this.massiv = [];
      for (let i = 0; i < 10; i++) {
        this.container = document.createElement("div");
        this.container.className = "container";
        document.body.appendChild(this.container);
  
        for (let n = 0; n < 10; n++) {
          this.cell = document.createElement("div");
          this.cell.className = "sea";
          this.cell.number = startNumber++;
          this.cell.positionX = n;
          this.cell.positionY = i;
          this.massiv.push(this.cell);
          this.container.appendChild(this.cell);
          this.cell.addEventListener("click", (event) => this.shoot(event));
        }
      }
    }
  
    init() {
      this.makeShip4();
      this.makeShip3();
      this.makeShip3();
      //   this.makeShip2();
      //   this.makeShip2();
      //   this.makeShip2();
    //   this.makeShip1();
    //   this.makeShip1();
    //   this.makeShip1();
    //   this.makeShip1();
    }
  
    makeRandomNumberFirstCell() {
      let firstCellShipNumber = Math.floor(Math.random() * 100);
      if (this.massiv[firstCellShipNumber].className === "ship") {
        this.makeRandomNumberFirstCell();
        return firstCellShipNumber;
      } else {
        return firstCellShipNumber;
      }
    }
  
    chooseDirectionNumber() {
      return Math.floor(Math.random() * 4);
    }
  
    drowShip(firstcellShip) {
      for (var i = 0; i < this.massiv.length; i++) {
        if (this.massiv[i].number == firstcellShip) {
          this.massiv[i].className = "ship";
          return;
        }
      }
    }
  
    makeShip4() {
      var firstcellShip = this.makeRandomNumberFirstCell();
      var direction = this.chooseDirectionNumber();
      if (direction === 0) {
        if (this.massiv[firstcellShip].positionY < 3) {
          this.makeShip4();
          return;
        }
      }
      if (direction === 1) {
        if (this.massiv[firstcellShip].positionX > 6) {
          this.makeShip4();
          return;
        }
      }
      if (direction === 2) {
        if (this.massiv[firstcellShip].positionY > 6) {
          this.makeShip4();
          return;
        }
      }
      if (direction === 3) {
        if (this.massiv[firstcellShip].positionX < 3) {
          this.makeShip4();
          return;
        }
      }
      for (let i = 0; i < 4; i++) {
        this.drowShip(firstcellShip);
        if (direction === 0) {
          firstcellShip = firstcellShip - 10;
        }
        if (direction === 1) {
          firstcellShip = firstcellShip + 1;
        }
        if (direction === 2) {
          firstcellShip = firstcellShip + 10;
        }
        if (direction === 3) {
          firstcellShip = firstcellShip - 1;
        }
      }
    }
  
    makeShip3() {
      var firstcellShip = this.makeRandomNumberFirstCell();
      var direction = this.chooseDirectionNumber();
      if (direction === 0) {
        if (this.massiv[firstcellShip].positionY < 2) {
          this.makeShip3();
          return;
        }
        if (this.massiv[firstcellShip].className === "ship" || 
        this.massiv[firstcellShip - 10].className === "ship" ||
          this.massiv[firstcellShip - 20].className === "ship") {
          this.makeShip3();
          return;
          }
      }
      if (direction === 1) {
        if (this.massiv[firstcellShip].positionX > 7) {
          this.makeShip3();
          return;
        }
        if (
          this.massiv[firstcellShip].className === "ship" ||
          this.massiv[firstcellShip + 1].className === "ship" ||
          this.massiv[firstcellShip + 2].className === "ship") {
          this.makeShip3();
          return;
        }
      }
      if (direction === 2) {
        if (this.massiv[firstcellShip].positionY > 7) {
          this.makeShip3();
          return;
        }
        if (
          this.massiv[firstcellShip].className === "ship" ||
          this.massiv[firstcellShip + 10].className === "ship" ||
          this.massiv[firstcellShip + 20].className === "ship") {
          this.makeShip3();
          return;
        }
      }
      if (direction === 3) {
        if (this.massiv[firstcellShip].positionX < 2) {
          this.makeShip3();
          return;
        }
        if (
          this.massiv[firstcellShip].className === "ship" ||
          this.massiv[firstcellShip - 1].className === "ship" ||
          this.massiv[firstcellShip - 2].className === "ship") {
          this.makeShip3();
          return;
        }
      }
      for (let i = 0; i < 3; i++) {
        this.drowShip(firstcellShip);
        if (direction === 0) {
          firstcellShip = firstcellShip - 10;
        }
        if (direction === 1) {
          firstcellShip = firstcellShip + 1;
        }
        if (direction === 2) {
          firstcellShip = firstcellShip + 10;
        }
        if (direction === 3) {
          firstcellShip = firstcellShip - 1;
        }
      }
    }
  
    makeShip2() {
      var firstcellShip = this.makeRandomNumberFirstCell();
      var direction = this.chooseDirectionNumber();
      if (direction === 0) {
        if (this.massiv[firstcellShip].positionY < 1) {
          this.makeShip2();
          return;
        }
        if (this.massiv[firstcellShip].className === "ship" ||
          this.massiv[firstcellShip - 10].className === "ship") {
          this.makeShip2();
          return;
        }
      }
      if (direction === 1) {
        if (this.massiv[firstcellShip].positionX > 8) {
          this.makeShip2();
          return;
        }
        if (this.massiv[firstcellShip].className === "ship" ||
          this.massiv[firstcellShip + 1].className === "ship") {
          this.makeShip2();
          return;
        }
      }
      if (direction === 2) {
        if (this.massiv[firstcellShip].positionY > 8) {
          this.makeShip2();
          return;
        }
        if (this.massiv[firstcellShip].className === "ship" ||
          this.massiv[firstcellShip + 10].className === "ship") {
          this.makeShip2();
          return;
        }
      }
      if (direction === 3) {
        if (this.massiv[firstcellShip].positionX < 1) {
          this.makeShip2();
          return;
        }
        if (this.massiv[firstcellShip].className === "ship" ||
          this.massiv[firstcellShip - 1].className === "ship") {
          this.makeShip2();
          return;
        }
      }
      for (let i = 0; i < 2; i++) {
        this.drowShip(firstcellShip);
        if (direction === 0) {
          firstcellShip = firstcellShip - 10;
        }
        if (direction === 1) {
          firstcellShip = firstcellShip + 1;
        }
        if (direction === 2) {
          firstcellShip = firstcellShip + 10;
        }
        if (direction === 3) {
          firstcellShip = firstcellShip - 1;
        }
      }
    }
  
    makeShip1() {
      var firstcellShip = this.makeRandomNumberFirstCell();
      var direction = this.chooseDirectionNumber();
      if (direction === 0) {
        if (this.massiv[firstcellShip].className === "ship") {
          this.makeShip1();
          return;
        }
      }
      if (direction === 1) {
        if (this.massiv[firstcellShip].className === "ship") {
          this.makeShip1();
          return;
        }
      }
      if (direction === 2) {
        if (this.massiv[firstcellShip].className === "ship") {
          this.makeShip1();
          return;
        }
      }
      if (direction === 3) {
        if (this.massiv[firstcellShip].className === "ship") {
          this.makeShip1();
          return;
        }
      }
      this.drowShip(firstcellShip);
      if (direction === 0) {
        firstcellShip = firstcellShip - 10;
      }
      if (direction === 1) {
        firstcellShip = firstcellShip + 1;
      }
      if (direction === 2) {
        firstcellShip = firstcellShip + 10;
      }
      if (direction === 3) {
        firstcellShip = firstcellShip - 1;
      }
    }
  
    shoot(event) {
      if (event.target.className === "sea") {
        event.target.className = "miss";
      }
      if (event.target.className === "ship") {
        if (this.massiv[event.target.number].positionX === 0 ||
            this.massiv[event.target.number].positionX === 9 ||
            this.massiv[event.target.number].positionY === 0 ||
            this.massiv[event.target.number].positionY === 9) {
                console.log(a)
            }
        if (this.massiv[event.target.number + 1].className !== "ship" &&
            this.massiv[event.target.number - 1].className !== "ship" &&
            this.massiv[event.target.number + 10].className !== "ship" &&
            this.massiv[event.target.number - 10].className !== "ship")   
            {
                event.target.className = "killed";
      }
      if (event.target.className === "ship") {
          event.target.className = "injured";
      }
    }
  }
}
  new Field().init()
  