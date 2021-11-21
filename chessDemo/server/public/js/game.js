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
    
    checkPotentialMoves(currPiece)
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
            case 'queen':
                this.checkBishopMove(currPiece);
                this.checkRookMove(currPiece);
                break;
            case 'king':
                this.checkKingMove(currPiece);
                break;
        }
    }

    
    checkPawnMove(piece)
    {
        let tile = this.board.locateTile(piece.position);
        // console.log("pawn piece: ", piece)
        // console.log("pawn tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = [];
        let verTMovement = 1;
        //check for direction of mvmt
        if(piece.color === 'light')
            verTMovement = -1;            
        
        //special case for first moves 
        if(!this.board.tiles[row + verTMovement][col].occupied )
        {            
            if(!piece.moved && !this.board.tiles[row + verTMovement + verTMovement][col].occupied || 
                (!piece.moved && this.board.tiles[row + verTMovement + verTMovement][col].occupied &&
                this.board.tiles[row + verTMovement + verTMovement][col].element.children[0].getAttribute('data-team') !== piece.color))       
                potentialMoves.push({row: row + verTMovement + verTMovement, col: col});            

            potentialMoves.push({row: row + verTMovement, col: col});
        }            

        if(col - 1 >= 0 && row + verTMovement < 8 && row + verTMovement >= 0)
        {            
            if(this.canMove(row + verTMovement, col - 1, piece) && this.isOccupied(row + verTMovement, col - 1))
                potentialMoves.push({row: row + verTMovement, col : col - 1});            
        };       

        if(col + 1 < 8 && row + verTMovement < 8 && row + verTMovement >= 0)
        {
            if(this.canMove(row + verTMovement, col + 1, piece ) && this.isOccupied(row + verTMovement, col + 1))                        
                potentialMoves.push({row: tile.index.row + verTMovement, col : col + 1});            
        };
        
        this.potentialMoves = potentialMoves;
    };

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
                if(this.isOccupied(row - i,col) && this.board.tiles[row - i][col].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                                
                if(this.canMove(row - i, col, piece))
                {                    
                    potentialMoves.push({row: row - i, col : col});
                    if(this.isOccupied(row - i,col))
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
                if(this.isOccupied(row + i,col) && this.board.tiles[row + i][col].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                                
                if(this.canMove(row + i, col, piece))
                {                    
                    potentialMoves.push({row: row + i, col : col});
                    if(this.isOccupied(row + i,col))
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
                if(this.isOccupied(row, col - i) && this.board.tiles[row][col - i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                                
                if(this.canMove(row, col - i, piece))
                {                    
                    potentialMoves.push({row: row, col : col - i});
                    if(this.isOccupied(row,col - i))
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
                if(this.isOccupied(row,col + i) && this.board.tiles[row][col + i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                                
                if(this.canMove(row, col + i, piece))
                {                    
                    potentialMoves.push({row: row, col : col + i});
                    if(this.isOccupied(row,col + i))
                        break;
                }                 
            }else
                break;            
        }

        //last thing in method // concat req cause used for queen        
        this.potentialMoves = this.potentialMoves.concat(potentialMoves);   
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
                if(this.isOccupied(row - i, col - i) && this.board.tiles[row - i][col - i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                                
                if(this.canMove(row - i, col - i, piece))
                {                    
                    potentialMoves.push({row: row - i, col : col - i});
                    if(this.isOccupied(row - i,col - i))
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
                if(this.isOccupied(row - i, col + i) && this.board.tiles[row - i][col + i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                                
                if(this.canMove(row - i, col + i, piece))
                {                    
                    potentialMoves.push({row: row - i, col : col + i});
                    if(this.isOccupied(row - i,col + i))
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
                if(this.isOccupied(row + i, col - i) && this.board.tiles[row + i][col - i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                                
                if(this.canMove(row + i, col - i, piece))
                {                    
                    potentialMoves.push({row: row + i, col : col - i});
                    if(this.isOccupied(row + i,col - i))
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
                if(this.isOccupied(row + i, col + i) && this.board.tiles[row + i][col + i].element.children[0].getAttribute('data-team') === piece.color)
                    break;
                                
                if(this.canMove(row + i, col + i, piece))
                {                    
                    potentialMoves.push({row: row + i, col : col + i});
                    if(this.isOccupied(row + i,col + i))
                        break;
                }                 
            }else
                break;
        }
        //last thing in method        
        this.potentialMoves = this.potentialMoves.concat(potentialMoves);
    };
    //knight moves
    checkKnightMove(piece)
    {
        let tile = this.board.locateTile(piece.position);
        // console.log("knight piece: ", piece)
        // console.log("knight tile", tile);
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
                if(this.canMove(row - verTMovement, col - horzMovment, piece))                    
                    potentialMoves.push({row: row - verTMovement, col : col - horzMovment});                    
            }
            //right check
            if(col + horzMovment <= 7)
            {
                if(this.canMove(row - verTMovement, col + horzMovment, piece))                                
                    potentialMoves.push({row: row - verTMovement, col : col + horzMovment});                    
            }            
        }
        //backward check
        if(row + verTMovement <= 8)
        {
            //left check
            if(col - horzMovment >= 0)
            {
                if(this.canMove(row + verTMovement, col - horzMovment, piece))                    
                    potentialMoves.push({row: row + verTMovement, col : col - horzMovment});                    
            }
            //right check
            if(col + horzMovment <= 7)
            {
                if(this.canMove(row + verTMovement, col + horzMovment, piece))                                    
                    potentialMoves.push({row: row + verTMovement, col : col + horzMovment});                    
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
                if(this.canMove(row - verTMovement, col - horzMovment, piece))                                    
                    potentialMoves.push({row: row - verTMovement, col : col - horzMovment});                    
            }            
            //front check
            if(row + verTMovement <= 7)
            {                
                if(this.canMove(row + verTMovement, col - horzMovment, piece))                                    
                    potentialMoves.push({row: row + verTMovement, col : col - horzMovment});                    
            }            
        }
        //right check
        if(col + horzMovment <= 7)
        {
            //back check
            if(row - verTMovement >= 0)
            {
                if(this.canMove(row - verTMovement, col + horzMovment, piece))                                    
                    potentialMoves.push({row: row - verTMovement, col : col + horzMovment});                    
            }
            //front check
            if(row + verTMovement <= 7)
            {
                if(this.canMove(row + verTMovement, col + horzMovment, piece))                                    
                    potentialMoves.push({row: row + verTMovement, col : col + horzMovment});                    
            }            
        }    
        //last thing in method        
        this.potentialMoves = potentialMoves;        
    };

    //king
    checkKingMove(piece)
    {
        let tile = this.board.locateTile(piece.position);
        // console.log("king piece: ", piece)
        // console.log("king tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = [];   
        
        //forward
        if(this.isInBound(row - 1) && this.canMove(row - 1, col, piece))
            potentialMoves.push({row: row - 1, col : col});                   
        //backward
        if(this.isInBound(row + 1) && this.canMove(row + 1, col, piece))
            potentialMoves.push({row: row + 1, col : col});                   
        //left
        if(this.isInBound(col - 1) && this.canMove(row, col - 1, piece))
            potentialMoves.push({row: row, col : col - 1});
        //right
        if(this.isInBound(col + 1) && this.canMove(row, col + 1, piece))
            potentialMoves.push({row: row, col : col + 1});                   
        //front left
        if(this.isInBound(row - 1) && this.isInBound(col - 1) && this.canMove(row - 1, col - 1, piece))
            potentialMoves.push({row: row - 1, col : col - 1});
        //front right
        if(this.isInBound(row - 1) && this.isInBound(col + 1) && this.canMove(row - 1, col + 1, piece))
            potentialMoves.push({row: row - 1, col : col + 1});
        //back left
        if(this.isInBound(row + 1) && this.isInBound(col - 1) && this.canMove(row + 1, col - 1, piece))
            potentialMoves.push({row: row + 1, col : col - 1});
        //back right
        if(this.isInBound(row + 1) && this.isInBound(col + 1) && this.canMove(row + 1, col + 1, piece))
            potentialMoves.push({row: row + 1, col : col + 1});

        //last thing in method        
        this.potentialMoves = potentialMoves;        
    }

    isCheck(piece)
    {
        console.log("checking for check!", piece);
        

    }


    //event listener defs


    displayPotentialMoves(piece)
    {
        this.potentialMoves = [];
        const currPiece = JSON.parse(window.atob(piece.getAttribute('data-object')));
        // console.log(currPiece)           
        if(!this.validTurn(currPiece))
            return;

        this.checkPotentialMoves(currPiece);
        this.potentialMoves.forEach(m =>
        {
            this.board.tiles[m.row][m.col].element.classList.add('overlay-effect');
        });
    }

    //attached to each piece
    selectPieceToMove(event)
    {
        this.pieceToMove = event.target;
        const currPiece = JSON.parse(window.atob(this.pieceToMove.getAttribute('data-object')));
        if(!this.validTurn(currPiece))
            return;
                
    }

    //attached to each tile for onclick
    initMove(event)
    {
        // console.log("init move", event.target);
        let targetIndex = 
        {
            row: parseInt(event.target.getAttribute('data-index').toString()[0]),
            col: parseInt(event.target.getAttribute('data-index').toString().substring(2))
        };
        // console.log(targetIndex);
        
        const currPiece = JSON.parse(window.atob(this.pieceToMove.getAttribute('data-object')));
        if(!this.validTurn(currPiece))
            return;
        if(this.potentialMoves.filter(pm => pm.row === targetIndex.row && pm.col === targetIndex.col).length < 1)
            return;        
        //update positions
        this.updatePositions(event.target,currPiece)
        //move the pawn icon from its curr html elem to selected
        event.target.appendChild(this.pieceToMove);
        this.isCheck(currPiece);
        this.potentialMoves = [];
        this.lightTurn = !this.lightTurn;
    }

    //need to update arrays of positions for pieces and track is still on board
    updatePositions(targetElement, piece)
    {

        //add method to check all peiece per team
        //will need check for king stalemate

        //move board check to own method
        console.log('updating pos');
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
            const dataIndex = targetElement.getAttribute('data-index');
            piece.index = {row : parseInt(dataIndex[0]), col : parseInt(dataIndex[2]) };
            piece.position = targetElement.id;
            this.pieceToMove.setAttribute("data-object", window.btoa(JSON.stringify(piece)));
    }

    //add all event listerns
    addEventListeners()
    {
        let pieces = document.getElementsByClassName('gamepiece');
        let tiles = document.getElementsByClassName('tile');

        //tile event listener for onclick to initialize moves
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
                    //provides move predictions 
                    pieces[i].addEventListener(type, (event) =>
                    {                        
                        this.displayPotentialMoves(event.target);
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
                {   //selected the piece to be moved
                    pieces[i].addEventListener(type, (event) =>
                    {
                        this.selectPieceToMove(event);
                    });
                }
            });
        }
    }

    //helpers
    validTurn(currPiece)
    {
        if(this.lightTurn && currPiece.color !== 'light')
            return false;
        else if(!this.lightTurn && currPiece.color !== 'dark')
            return false;

        return true;
    };

    isOccupied(row,col)
    {
        return this.board.tiles[row][col].occupied;
    };

    canMove(row, col, piece)
    {
        if(!this.isOccupied(row,col) || (this.isOccupied(row,col) && 
            this.board.tiles[row][col].element.children[0].getAttribute('data-team') !== piece.color))
            return true;
        return false;
    };

    isInBound(x)
    {
        if(x <= 7 && x >= 0)
            return true;
        return false;
    }
}