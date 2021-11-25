import Board from "./board";


export default class Game
{
    board;
    lightTurn = true;
    inCheck = false;
    inCheckMate = false;
    inStaleMate = false;
    pieceToMove = undefined;
    lastPiece = undefined;
    potentialMoves = [];
    opposingMove = []
    currentTeam = 
    {
        color : 'light',
        pieces : [],
        inCheck : false
    };
    initGame()
    {
        this.board = new Board();
        this.board.initBoard();        
        this.addEventListeners();
        this.currentTeam.pieces = this.board.lightPieces;
    }
    
    checkPotentialMoves(currPiece)
    {
        // console.log('checking potential moves', currPiece);                
        switch(currPiece.type)
        {
            case 'pawn':
                return this.checkPawnMove(currPiece);                
            case 'rook':
                return this.checkRookMove(currPiece);                
            case 'bishop':
                return this.checkBishopMove(currPiece);                
            case 'knight':
                return this.checkKnightMove(currPiece);                
            case 'queen':
                let potentialMoves = this.checkBishopMove(currPiece);                
                return potentialMoves.concat(this.checkRookMove(currPiece));                
            case 'king':
                return this.checkKingMove(currPiece);                
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
        
        return potentialMoves;
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
        return potentialMoves;
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
        return potentialMoves;
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
        return potentialMoves;
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
        return potentialMoves; 
    }

    inCurrCheck()
    {        
        //need to used last piece position to predict possible moves, only moves that block 
        // last pieces potential moves where index has a king can be a valid move, 
        //king can only move to a spot that is not in the possible moves of the last piece
        let stillInCheck = false;
        let currKing = this.board.lightPieces.filter((p) => p.type === 'king')[0];                           
        if(this.currentTeam.color === 'dark')
        {
            currKing = this.board.darkPieces.filter((p) => p.type === 'king')[0];      
            this.board.lightPieces.forEach((p)=>
            {
                this.checkPotentialMoves(p);
                for(let pm of this.potentialMoves)
                {
                    if(pm.row === currKing.row && pm.col === currKing.col)
                    {
                        this.inCheck = true;
                        break;
                    }                    
                };
            })
        }else
        {            
            this.board.darkPieces.forEach((p)=>
            {
                this.checkPotentialMoves(p);
                for(let pm of this.potentialMoves)
                {
                    if(pm.row === currKing.row && pm.col === currKing.col)
                    {
                        this.inCheck = true;
                        break;
                    }                    
                };
            });
        }
        this.potentialMoves = [];                
        
    }

    isOpponentCheck(piece)
    {
        
        let potentialMoves = this.checkPotentialMoves(piece);
        let opposingKing = this.board.lightPieces.filter((p) => p.type === 'king')[0];
        if(piece.color === 'light')            
            opposingKing = this.board.darkPieces.filter((p) => p.type === 'king')[0];
        
        // console.log(this.potentialMoves);
        console.log('opposing king', opposingKing);
        potentialMoves.forEach((pm) =>
        {
            if(pm.row === opposingKing.index.row && pm.col === opposingKing.index.col)
                this.inCheck = true;
        })

        if(this.inCheck)
            opposingKing.icon.classList.add('check', 'checkPulse');
    }

    removeCheck()
    {
        const currKing = this.currentTeam.pieces.filter((p) => p.type === 'king')[0];
        currKing.icon.classList.remove('check', 'checkPulse');
        this.inCheck = false;
    }


    //event listener defs


    displayPotentialMoves(piece)
    {
        let potentialMoves = []
        const currPiece = JSON.parse(window.atob(piece.getAttribute('data-object')));
        // console.log(currPiece)           
        if(!this.validTurn(currPiece))
            return;

        potentialMoves = this.checkPotentialMoves(currPiece);
        //add filter  here to check for moves in cases of king in check
        if(this.currentTeam.inCheck)
        {            
            // console.log("last piece", this.lastPiece);
            // console.log("curr piece", currPiece);
            let oppPotentialMoves = this.checkPotentialMoves(this.lastPiece);
            // console.log("curr Moves", potentialMoves);
            // console.log("last piece pot moves", oppPotentialMoves);
            if(currPiece.type === 'king')
            {
                oppPotentialMoves.forEach((oPm =>
                {
                    for(let i = 0; i < potentialMoves.length; i++) 
                    {
                        if(oPm.col === potentialMoves[i].col && oPm.row === potentialMoves[i].row)
                        {
                            potentialMoves.splice(i,1);
                            i--;//decrement to protect loop 
                        }
                    }
                }))
            }else
            {
                let tempMoves = [];
                let found = false;
                for(let i = 0; i < potentialMoves.length && !found; i++ )
                {
                    for(let oPm of oppPotentialMoves)
                    {                                       
                        if(potentialMoves[i].col === this.lastPiece.index.col && potentialMoves[i].row === this.lastPiece.index.row) 
                        {
                            tempMoves.push(potentialMoves[i]);
                        }
                        if(oPm.col === potentialMoves[i].col && oPm.row === potentialMoves[i].row ) //need to check if is in path of king
                        {
                            if(this.inPathOfKing(potentialMoves[i], currPiece))
                            {
                                console.log('found');
                                found = true;                                                                
                                tempMoves.push(potentialMoves[i]);
                            }                                                                             
                        }                    
                        if(found)
                            break;
                    };
                }         
                //need to add 1 more check for if the potential move can capture the piece causing
                //checkmate
                potentialMoves = tempMoves;
            }            
        }
        this.potentialMoves = potentialMoves;
        this.potentialMoves.forEach(m =>
        {
            this.board.tiles[m.row][m.col].element.classList.add('overlay-effect');
        });
    }

    //attached to each piece
    selectPieceToMove(event)
    {
        this.pieceToMove = event.target;
        // console.log("piece to move", this.pieceToMove);
        // this.pieceToMove.icon = event.target;
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
        this.isOpponentCheck(currPiece);       
        this.swapCurrentTeam();   
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
            this.lastPiece = piece;
            if(this.inCheck)
            {
                this.removeCheck();
            }
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
    };

    swapCurrentTeam()
    {

        this.inCurrCheck(this.c);
        if(this.currentTeam.color === 'light')
        {
            this.currentTeam.color = 'dark';
            this.currentTeam.pieces = this.board.darkPieces;             
        }else
        {
            this.currentTeam.color = 'light';
            this.currentTeam.pieces = this.board.lightPieces; 
        }
        this.currentTeam.inCheck = this.inCheck;
        this.lightTurn = !this.lightTurn;
        this.potentialMoves = [];
    }

    inPathOfKing(potentialMove, currPiece)
    {
        let tempIdx = potentialMove;
        console.log("last piece", this.lastPiece);
        // console.log("curr piece", currPiece);
        console.log("my move",potentialMove);        
        console.log(this.board.tiles[potentialMove.row][potentialMove.col]);
        //simulate the move and re check path
        this.board.tiles[potentialMove.row][potentialMove.col].occupied = true;
        let tempPiece = document.getElementById(currPiece.position).firstChild.cloneNode();        
        tempPiece.style.display = 'none';
        let tempDestination = this.board.tiles[potentialMove.row][potentialMove.col].element;
        tempDestination.appendChild(tempPiece);
        let oppPotentialMoves = this.checkPotentialMoves(this.lastPiece);
        for(let oPm of oppPotentialMoves)
        {

            if(this.board.tiles[oPm.row][oPm.col].element.firstChild)
            {
                let elem = this.board.tiles[oPm.row][oPm.col].element.firstChild
                console.log(elem)
                if(elem.getAttribute('data-type') === 'king')
                    return false;
            }
        };

        //reset all changes!
        tempDestination.removeChild(tempDestination.childNodes[0]);    
        this.board.tiles[potentialMove.row][potentialMove.col].occupied = false;

        return true;
    }
}