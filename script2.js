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
                this.cell.isSea = true;
                this.massiv.push(this.cell);
                this.container.appendChild(this.cell);
            }   
        }
    }

    makeRandomNumberFirstCell() {
        let firstCellShipNumber = Math.floor(Math.random() * 100);
        if (this.massiv[firstCellShipNumber].className === "sea") {
            this.makeRandomNumberFirstCell();
        }
        else {
            return firstCellShipNumber;
        }
    }

    makeRandomNumberPositionUpOrDown() {
        let shipPositionUpOrDownNumber = Math.floor(Math.random() * 2);
        if (shipPositionUpOrDownNumber === 1) {
            return true;
        }
        else {
            return false;
        }
    }

    makeRandomNumberPositionRightOrLeft() {
        let shipPositionNumberRightOrLeft = Math.floor(Math.random() * 2);
        if (shipPositionNumberRightOrLeft === 1) {
            return true;
        }
        else {
            return false;
        }
    }

    chooseDirectionNumber() {
        let direction = Math.floor(Math.random() * 4);
        return direction;
    }

    makeShip4() {
        var shipPositionUp = this.makeRandomNumberXYPosition();
        var shipPositionRight = this.makeRandomNumberXPosition();
        var firstcellShip = this.makeRandomNumberFirstCell();

        for (var i=0; i<this.massiv.length; i++) {
            if (this.massiv[i].number == firstcellShip) {
                if (shipPositionY === "right") {

            }
                this.massiv[i].className = "ship";
                this.massiv[i].isSea = false;
                this.massiv[i].isShip = true;
                
            
            }
        }
        
        
    }
}

new Field().makeShip4()