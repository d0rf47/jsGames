import Board from "./board";


export default class Game
{
    board;
    lightTurn = true;
    pieceToMove = undefined;
    potentialMoves = [];

    initGame()
    {
        this.board = new Board();
        this.board.initBoard();
        this.addEventListeners()            
    }

    checkPotentialMoves(piece)
    {
        const currPiece = JSON.parse(window.atob(piece.getAttribute('data-object')));
        console.log(currPiece)           
        if(!this.validTurn(currPiece))
            return;
        else
        {   
            console.log('checking potential moves');
            switch(currPiece.type)
            {
                case 'pawn':
                    this.checkPawnMove(currPiece);
                    break;
                case 'rook':
                    this.checkRookMove(currPiece);
                    break;
                case 'bishop':
                    this.checkBishopMove(currPiece);
                    break;
                case 'knight':
                    this.checkKnightMove(currPiece);
                    break;
            }
        }
    }
    
    checkPawnMove(piece)
    {
        let tile = this.board.locateTile(piece.position);
        console.log("pawn piece: ", piece)
        console.log("pawn tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = [];
        let verTMovement = 1;
        //check for direction of mvmt
        if(piece.color === 'light')
            verTMovement = -1;            

        if(!this.board.tiles[row + verTMovement][col].occupied )
        {            
            if(!piece.moved && !this.board.tiles[row + verTMovement + verTMovement][col].occupied || 
                (!piece.moved && this.board.tiles[row + verTMovement + verTMovement][col].occupied &&
                this.board.tiles[tile.index.row + verTMovement + verTMovement][tile.index.col].element.children[0].getAttribute('data-team') !== piece.color))       
                potentialMoves.push({row: row + verTMovement + verTMovement, col: col});            

            potentialMoves.push({row: row + verTMovement, col: col});
        }            

        if(col - 1 > -1 && row + verTMovement < 8 && row + verTMovement > -1)
        {            
            if(this.board.tiles[tile.index.row + verTMovement][tile.index.col - 1 ].occupied &&
                this.board.tiles[tile.index.row + verTMovement][tile.index.col - 1].element.children[0].getAttribute('data-team') !== piece.color)
            {            
                potentialMoves.push({row: tile.index.row + verTMovement, col : tile.index.col - 1});
            }            
        }        
        if(col + 1 < 8 && row + verTMovement < 8 && row + verTMovement > -1)
        {
            
            if(this.board.tiles[tile.index.row + verTMovement][tile.index.col + 1 ].occupied &&
                this.board.tiles[tile.index.row + verTMovement][tile.index.col + 1].element.children[0].getAttribute('data-team') !== piece.color)
            {                
                potentialMoves.push({row: tile.index.row + verTMovement, col : tile.index.col + 1});
            }
        }
        potentialMoves.forEach(m =>
        {
          this.board.tiles[m.row][m.col].element.classList.add('overlay-effect');
        });
        this.potentialMoves = potentialMoves;
    };

    //need to check from currPos to board edge 
    // in each direction
    //check if any tile in path === currPiece team = end of path

    checkRookMove(piece)
    {
        let tile = this.board.locateTile(piece.position);
        // console.log("rook piece: ", piece)
        // console.log("rook tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = [];         

        //forwards check
        for(let i = 1; i <= 8; i++)
        {
            if(row - i >= 0)
            {                
                if(this.board.tiles[row - i][col].occupied && this.board.tiles[row - i][col].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                
                if(!this.board.tiles[row - i][col].occupied || (this.board.tiles[row - i][col].occupied && 
                    this.board.tiles[row - i][col].element.children[0].getAttribute('data-team') !== piece.color))
                {                    
                    potentialMoves.push({row: row - i, col : col});
                    if(this.board.tiles[row - i][col].occupied && 
                        this.board.tiles[row - i][col].element.children[0].getAttribute('data-team') !== piece.color)
                        break;
                }                 
            }else
                break;            
        }
        //backward check
        for(let i = 1; i <= 8; i++)
        {
            if(row + i <= 7)
            {                
                if(this.board.tiles[row + i][col].occupied && this.board.tiles[row + i][col].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                
                if(!this.board.tiles[row + i][col].occupied || (this.board.tiles[row + i][col].occupied && 
                    this.board.tiles[row + i][col].element.children[0].getAttribute('data-team') !== piece.color))
                {                    
                    potentialMoves.push({row: row + i, col : col});
                    if(this.board.tiles[row + i][col].occupied && 
                        this.board.tiles[row + i][col].element.children[0].getAttribute('data-team') !== piece.color)
                        break;
                }                 
            }else
                break;            
        }
        //left
        for(let i = 1; i <= 8; i++)
        {
            if(col - i >= 0)
            {                
                if(this.board.tiles[row][col - i].occupied && this.board.tiles[row][col - i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                
                if(!this.board.tiles[row][col - i].occupied || (this.board.tiles[row][col - i].occupied && 
                    this.board.tiles[row][col - i].element.children[0].getAttribute('data-team') !== piece.color))
                {                    
                    potentialMoves.push({row: row, col : col - i});
                    if(this.board.tiles[row][col - i].occupied && 
                        this.board.tiles[row][col - i].element.children[0].getAttribute('data-team') !== piece.color)
                        break;
                }                 
            }else
                break;                            
        }

        //right
        for(let i = 1; i <= 8; i++)
        {
            if(col + i <= 7)
            {                
                if(this.board.tiles[row][col + i].occupied && this.board.tiles[row][col + i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                
                if(!this.board.tiles[row][col + i].occupied || (this.board.tiles[row][col + i].occupied && 
                    this.board.tiles[row][col + i].element.children[0].getAttribute('data-team') !== piece.color))
                {                    
                    potentialMoves.push({row: row, col : col + i});
                    if(this.board.tiles[row][col + i].occupied && 
                        this.board.tiles[row][col + i].element.children[0].getAttribute('data-team') !== piece.color)
                        break;
                }                 
            }else
                break;
        }

        //last thing in method
        potentialMoves.forEach(m =>
        {
            this.board.tiles[m.row][m.col].element.classList.add('overlay-effect');
        });
        this.potentialMoves = potentialMoves;        
    }

    //Check Bishop Moves
    checkBishopMove(piece)
    {
        let tile = this.board.locateTile(piece.position);
        // console.log("bishop piece: ", piece)
        // console.log("bishop tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = [];         

        //forwards left check
        for(let i = 1; i <= 8; i++)
        {
            if(row - i >= 0 && col - i >= 0)
            {                
                if(this.board.tiles[row - i][col- i].occupied && this.board.tiles[row - i][col- i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                
                if(!this.board.tiles[row - i][col- i].occupied || (this.board.tiles[row - i][col- i].occupied && 
                    this.board.tiles[row - i][col- i].element.children[0].getAttribute('data-team') !== piece.color))
                {                    
                    potentialMoves.push({row: row - i, col : col - i});
                    if(this.board.tiles[row - i][col- i].occupied && 
                        this.board.tiles[row - i][col- i].element.children[0].getAttribute('data-team') !== piece.color)
                        break;
                }                 
            }else
                break;            
        }
        //forward right
        for(let i = 1; i <= 8; i++)
        {
            if(row - i >= 0 && col + i <= 7)
            {                
                if(this.board.tiles[row - i][col + i].occupied && this.board.tiles[row - i][col + i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                
                if(!this.board.tiles[row - i][col + i].occupied || (this.board.tiles[row - i][col + i].occupied && 
                    this.board.tiles[row - i][col + i].element.children[0].getAttribute('data-team') !== piece.color))
                {                    
                    potentialMoves.push({row: row - i, col : col + i});
                    if(this.board.tiles[row - i][col + i].occupied && 
                        this.board.tiles[row - i][col + i].element.children[0].getAttribute('data-team') !== piece.color)
                        break;
                }                 
            }else
                break;            
        }
        // backwards left
        for(let i = 1; i <= 8; i++)
        {
            if(row + i <= 7 && col - i >=0)
            {                
                if(this.board.tiles[row + i][col - i].occupied && this.board.tiles[row + i][col - i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                
                if(!this.board.tiles[row + i][col - i].occupied || (this.board.tiles[row + i][col - i].occupied && 
                    this.board.tiles[row + i][col - i].element.children[0].getAttribute('data-team') !== piece.color))
                {                    
                    potentialMoves.push({row: row + i, col : col - i});
                    if(this.board.tiles[row + i][col - i].occupied && 
                        this.board.tiles[row + i][col - i].element.children[0].getAttribute('data-team') !== piece.color)
                        break;
                }                 
            }else
                break;                            
        }

        //backwards right
        for(let i = 1; i <= 8; i++)
        {
            if(row + i <= 7 && col + i <= 7)
            {                
                if(this.board.tiles[row + i][col + i].occupied && this.board.tiles[row + i][col + i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                
                if(!this.board.tiles[row + i][col + i].occupied || (this.board.tiles[row + i][col + i].occupied && 
                    this.board.tiles[row + i][col + i].element.children[0].getAttribute('data-team') !== piece.color))
                {                    
                    potentialMoves.push({row: row + i, col : col + i});
                    if(this.board.tiles[row + i][col + i].occupied && 
                        this.board.tiles[row + i][col + i].element.children[0].getAttribute('data-team') !== piece.color)
                        break;
                }                 
            }else
                break;
        }

        //last thing in method
        potentialMoves.forEach(m =>
        {
            this.board.tiles[m.row][m.col].element.classList.add('overlay-effect');
        });
        this.potentialMoves = potentialMoves;        
    }

    //knight moves
    checkKnightMove(piece)
    {
        let tile = this.board.locateTile(piece.position);
        console.log("knight piece: ", piece)
        console.log("knight tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = [];         
        let verTMovement = 2;
        let horzMovment = 1;

        //forward check
        if(row - verTMovement >= 0)
        {
            //left check
            if(col - horzMovment >= 0)
            {
                if(!this.board.tiles[row - verTMovement][col - horzMovment].occupied ||
                    (this.board.tiles[row - verTMovement][col - horzMovment].occupied &&
                    this.board.tiles[row - verTMovement][col - horzMovment].element.children[0].getAttribute('data-team') !== piece.color) )
                    {
                        potentialMoves.push({row: row - verTMovement, col : col - horzMovment});
                    }
            }
            //right check
            if(col + horzMovment <= 7)
            {
                if(!this.board.tiles[row - verTMovement][col + horzMovment].occupied ||
                    (this.board.tiles[row - verTMovement][col + horzMovment].occupied &&
                    this.board.tiles[row - verTMovement][col + horzMovment].element.children[0].getAttribute('data-team') !== piece.color) )
                    {
                        potentialMoves.push({row: row - verTMovement, col : col + horzMovment});
                    }
            }            
        }
        //backward check
        if(row + verTMovement <= 8)
        {
            //left check
            if(col - horzMovment >= 0)
            {
                if(!this.board.tiles[row + verTMovement][col - horzMovment].occupied ||
                    (this.board.tiles[row + verTMovement][col - horzMovment].occupied &&
                    this.board.tiles[row + verTMovement][col - horzMovment].element.children[0].getAttribute('data-team') !== piece.color) )
                    {
                        potentialMoves.push({row: row + verTMovement, col : col - horzMovment});
                    }
            }
            //right check
            if(col + horzMovment <= 7)
            {
                if(!this.board.tiles[row + verTMovement][col + horzMovment].occupied ||
                    (this.board.tiles[row + verTMovement][col + horzMovment].occupied &&
                    this.board.tiles[row + verTMovement][col + horzMovment].element.children[0].getAttribute('data-team') !== piece.color) )
                    {
                        potentialMoves.push({row: row + verTMovement, col : col + horzMovment});
                    }
            }            
        }
        //swap horz and vert
        verTMovement = 1;
        horzMovment = 2;
        //left check
        if(col - horzMovment >= 0)
        {            
            //back check
            if(row - verTMovement >= 0)
            {                
                if(!this.board.tiles[row - verTMovement][col - horzMovment].occupied ||
                    (this.board.tiles[row - verTMovement][col - horzMovment].occupied &&
                    this.board.tiles[row - verTMovement][col - horzMovment].element.children[0].getAttribute('data-team') !== piece.color) )
                    {
                        potentialMoves.push({row: row - verTMovement, col : col - horzMovment});
                    }
            }            
            //front check
            if(row + verTMovement <= 7)
            {                
                if(!this.board.tiles[row + verTMovement][col - horzMovment].occupied ||
                    (this.board.tiles[row + verTMovement][col - horzMovment].occupied &&
                    this.board.tiles[row + verTMovement][col - horzMovment].element.children[0].getAttribute('data-team') !== piece.color) )
                    {
                        potentialMoves.push({row: row + verTMovement, col : col - horzMovment});
                    }
            }            
        }
        //right check
        if(col + horzMovment <= 7)
        {
            //back check
            if(row - verTMovement >= 0)
            {
                if(!this.board.tiles[row - verTMovement][col + horzMovment].occupied ||
                    (this.board.tiles[row - verTMovement][col + horzMovment].occupied &&
                    this.board.tiles[row - verTMovement][col + horzMovment].element.children[0].getAttribute('data-team') !== piece.color) )
                    {
                        potentialMoves.push({row: row - verTMovement, col : col + horzMovment});
                    }
            }
            //front check
            if(row + verTMovement <= 7)
            {
                if(!this.board.tiles[row + verTMovement][col + horzMovment].occupied ||
                    (this.board.tiles[row + verTMovement][col + horzMovment].occupied &&
                    this.board.tiles[row + verTMovement][col + horzMovment].element.children[0].getAttribute('data-team') !== piece.color) )
                    {
                        potentialMoves.push({row: row + verTMovement, col : col + horzMovment});
                    }
            }            
        }    
        //last thing in method
        potentialMoves.forEach(m =>
        {
            this.board.tiles[m.row][m.col].element.classList.add('overlay-effect');
        });
        this.potentialMoves = potentialMoves;        
    }

    selectPieceToMove(event)
    {
        this.pieceToMove = event.target;
        const currPiece = JSON.parse(window.atob(this.pieceToMove.getAttribute('data-object')));
        if(!this.validTurn(currPiece))
            return;
        
        console.log(this.potentialMoves, this.pieceToMove)
    }

    initMove(event)
    {
        console.log("init move", event.target);
        let targetIndex = 
        {
            row: parseInt(event.target.getAttribute('data-index').toString()[0]),
            col: parseInt(event.target.getAttribute('data-index').toString().substring(2))
        };
        console.log(targetIndex);
        
        const currPiece = JSON.parse(window.atob(this.pieceToMove.getAttribute('data-object')));
        if(!this.validTurn(currPiece))
            return;
        if(this.potentialMoves.filter(pm => pm.row === targetIndex.row && pm.col === targetIndex.col).length < 1)
            return;        
        //update positions
        this.updatePositions(event.target,currPiece)
        //move the pawn icon from its curr html elem to selected
        event.target.appendChild(this.pieceToMove);
        
        this.potentialMoves = [];
        this.lightTurn = !this.lightTurn;
    }

    updatePositions(targetElement, piece)
    {
        console.log('updating pos', piece);
        console.log(targetElement, piece);
        let j = 0;
        let x = 0;    
        for (let i = 0; i < 64; i++) 
        {      
            if(this.board.tiles[j][x].location === piece.position)
            {
                this.board.tiles[j][x].occupied = false;
            }
            if(this.board.tiles[j][x].location === targetElement.id)
            {
                this.board.tiles[j][x].occupied = true;
                if(targetElement.firstChild)
                {
                    //might need check for team
                    let pieceToRemove = JSON.parse(window.atob(targetElement.firstChild.getAttribute('data-object')));
                    console.log("peice to REMOVE",pieceToRemove);
                    targetElement.removeChild(targetElement.childNodes[0]);                                        
                }
            }            
            
            
            //counter for array traversal
            x++;    
            if(i === 7 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47 || i === 55 ) {
                j++;
                x = 0;
            }                  
        }
            piece.moved = true;
            piece.position = targetElement.id;
            this.pieceToMove.setAttribute("data-object", window.btoa(JSON.stringify(piece)));
    }

    addEventListeners()
    {
        let pieces = document.getElementsByClassName('gamepiece');
        let tiles = document.getElementsByClassName('tile');

        for(let i = 0; i < tiles.length; i++)
        {
            tiles[i].addEventListener("click", (event) =>
            {                
                this.initMove(event);
            })
        }

        for(let i = 0;i < pieces.length; i++)
        {
            ['mousedown', 'mouseup', 'click'].forEach(type =>
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
                        // console.log(elems)                 
                        for (let i = elems.length - 1; i >= 0; i--)
                        {                            
                            elems[i].classList.remove('overlay-effect');                            
                        }
                    });                                         
                }else if(type === 'click')
                {
                    pieces[i].addEventListener(type, (event) =>
                    {
                        this.selectPieceToMove(event);
                    });

                }
            });
        }
    }

    validTurn(currPiece)
    {
        if(this.lightTurn && currPiece.color !== 'light')
            return false;
        else if(!this.lightTurn && currPiece.color !== 'dark')
            return false;

        return true;
    }
}