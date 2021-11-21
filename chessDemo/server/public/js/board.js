import Piece from "./piece";

export default class Board {
  tiles;
  lightPieces = [];
  darkPieces = [];
  constructor() {
      //creates 8x8 array
      this.tiles = [...Array(8)].map(x=>Array(8).fill(undefined))    
  }

  initBoard() 
  {
    let tiles = document.getElementsByClassName("tile");
    let j = 0;
    let x = 0;    
    for (let i = 0; i < 64; i++) {      
    
      tiles[i].setAttribute('data-index', `${j},${x}`);
      this.tiles[j][x] =
      {
        location : tiles[i].attributes.id.nodeValue,
        occupied : false,
        element : tiles[i]
      };
      //counter for array traversal
      x++;    
      if(i === 7 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47 || i === 55 ) {
        j++;
        x = 0;
      }                  
    }   

    this.initlightPieces();
    this.initdarkPieces();        
    console.log(this.tiles);
  }

  initlightPieces()
  {
    //place pawns first
    let ascii = 97;
    for(let i = 1; i <= 8; i++) 
    {
        let pos = 2 + String.fromCharCode(ascii);
        let piece = new Piece('pawn', pos, "light", {row: 6, col: i -1});
        this.lightPieces.push(piece);
        this.tiles[1][i-1].occupied = true;
        ascii++;
    }
    this.lightPieces.push(new Piece('rook', "1a" ,"light" , {row: 7, col: 0}));
    this.tiles[0][0].occupied = true;
    this.lightPieces.push(new Piece('rook', "1h" ,"light" , {row: 7, col: 7}));
    this.tiles[0][7].occupied = true;
    this.lightPieces.push(new Piece('knight', "1b" ,"light" , {row: 7, col: 1}));
    this.tiles[0][1].occupied = true;
    this.lightPieces.push(new Piece('knight', "1g" ,"light" , {row: 7, col: 6}));
    this.tiles[0][6].occupied = true;
    this.lightPieces.push(new Piece('bishop', "1c" ,"light" , {row: 7, col: 2}));
    this.tiles[0][2].occupied = true;
    this.lightPieces.push(new Piece('bishop', "1f" ,"light" , {row: 7, col: 5}));
    this.tiles[0][5].occupied = true;
    this.lightPieces.push(new Piece('queen', "1d" ,"light" , {row: 7, col: 3}));
    this.tiles[0][3].occupied = true;
    this.lightPieces.push(new Piece('king', "1e" ,"light" , {row: 7, col: 4}));     
    this.tiles[0][4].occupied = true;
  }

  initdarkPieces()
  {
    //place pawns first
    let ascii = 97;
    for(let i = 1; i <= 8; i++) 
    {
        let pos = 7 + String.fromCharCode(ascii);
        let piece = new Piece('pawn', pos, "dark", {row: 1, col: i -1});
        this.darkPieces.push(piece);
        this.tiles[6][i-1].occupied = true;
        ascii++;
    }
    this.darkPieces.push(new Piece('rook', "8a" ,"dark", {row: 0, col: 0} ));
    this.tiles[7][0].occupied = true;
    this.darkPieces.push(new Piece('rook', "8h" ,"dark", {row: 0, col: 7} ));
    this.tiles[7][7].occupied = true;
    this.darkPieces.push(new Piece('knight', "8b" ,"dark", {row: 0, col: 1} ));
    this.tiles[7][1].occupied = true;
    this.darkPieces.push(new Piece('knight', "8g" ,"dark", {row: 0, col: 6} ));
    this.tiles[7][6].occupied = true;
    this.darkPieces.push(new Piece('bishop', "8c" ,"dark", {row: 0, col: 2} ));
    this.tiles[7][2].occupied = true;
    this.darkPieces.push(new Piece('bishop', "8f" ,"dark", {row: 0, col: 5} ));
    this.tiles[7][5].occupied = true;
    this.darkPieces.push(new Piece('queen', "8d" ,"dark", {row: 0, col: 3} ));
    this.tiles[7][3].occupied = true;
    this.darkPieces.push(new Piece('king', "8e" ,"dark", {row: 0, col: 4} ));     
    this.tiles[7][4].occupied = true;
  }    

  locateTile(position)
  {
    let j = 0;
    let x = 0;
    for (let i = 0; i < 64; i++) {      
      if(this.tiles[j][x].location === position)
        return {tile:this.tiles[j][x], index: {row:j, col:x}};
      //counter for array traversal
      x++;    
      if(i === 7 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47 || i === 55 ) {
        j++;
        x = 0;
      }                  
    }   
  }  
}

