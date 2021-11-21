export default class Piece {
    type = "";
    color = "";
    position = "";
    index = {};
    icon = "";    
    moved = false;
    alive = true;
    constructor(type, position, color, index) {
      this.position = position;
      this.type = type;
      this.color = color;
      this.index = index;
      this.initPiece();
    }
  
    initPiece() {        
      let elem = document.createElement("i");
      let tile = document.getElementById(`${this.position}`);
      elem.classList.add(this.color, "gamepiece");
      elem.setAttribute("data-position", this.position);
      elem.setAttribute("data-type", this.type);
      elem.setAttribute("data-team", this.color);
      elem.setAttribute("data-object", window.btoa(JSON.stringify(this)))      
      switch (this.type) {
        case "pawn":
          elem.classList.add("fas", "fa-chess-pawn");
          break;
        case "bishop":
          elem.classList.add("fas", "fa-chess-bishop");
          break;
        case "rook":
          elem.classList.add("fas", "fa-chess-rook");
          break;
        case "knight":
          elem.classList.add("fas", "fa-chess-knight");
          break;
        case "queen":
          elem.classList.add("fas", "fa-chess-queen");
          break;
        case "king":
          elem.classList.add("fas", "fa-chess-king");
          break;
      }
      this.icon = elem;
      tile.append(this.icon);
    }   
    
  }
  