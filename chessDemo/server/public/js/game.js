import Board from "./board";


export default class Game
{
    board;

    initGame()
    {
        this.board = new Board();
        this.board.initBoard();
        let pieces = document.getElementsByClassName('gamepiece');
        for(let i = 0;i < pieces.length; i++)
        {
            ['mousedown', 'mouseup'].forEach(type =>
            {
                if(type === 'mousedown')
                {
                    pieces[i].addEventListener(type, (event) =>
                    {                        
                        this.checkPotentialMoves(event.target);
                    }); 
                }else if(type === 'mouseup')
                {                                       
                    //not working 
                    pieces[i].addEventListener(type, (event) =>
                    {                    
                        let elems = document.getElementsByClassName('overlay-effect');  
                        console.log(elems)                 
                        for (let i = elems.length - 1; i >= 0; i--)
                        {                            
                            elems[i].classList.remove('overlay-effect');                            
                        }
                    });                                         
                }                                                          
            });
            
        }        
    }

    checkPotentialMoves(piece)
    {
        const currPiece = JSON.parse(window.atob(piece.getAttribute('data-object')));                
        this.checkPawnMove(currPiece);
    }

    checkPawnMove(piece)
    {
        let tile = this.board.locateTile(piece.position);
        console.log(" piece: ", piece)
        console.log("tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = [];
        let verTMovement = 1
        if(piece.color === 'light')
            verTMovement = -1;            

        if(!this.board.tiles[row + verTMovement][col].occupied)
        {            
            if(!piece.moved)            
                potentialMoves.push({row: row + verTMovement + verTMovement, col: col});            
            potentialMoves.push({row: row + verTMovement, col: col});
        }            

        if(col - 1 > -1 && col + 1 < 8 && row + verTMovement < 8 && verTMovement > -1)
        {
            if(this.board.tiles[tile.index.row + verTMovement][tile.index.col - 1 ].occupied &&
                this.board.tiles[tile.index.row + verTMovement][tile.index.col - 1].element.children[0].getAttribute('data-team') !== piece.team)
            {
                potentialMoves.push({row: tile.index.row + verTMovement, col : tile.index.col - 1});
            }
        }
        // console.log(potentialMoves.length);
        potentialMoves.forEach(m =>
        {
          this.board.tiles[m.row][m.col].element.classList.add('overlay-effect');
        })
    }
}