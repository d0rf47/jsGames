(()=>{"use strict";function e(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var i=function(){function i(e,o,s,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),t(this,"type",""),t(this,"color",""),t(this,"position",""),t(this,"index",{}),t(this,"icon",""),t(this,"moved",!1),t(this,"alive",!0),this.position=o,this.type=e,this.color=s,this.index=n,this.initPiece()}var o,s;return o=i,(s=[{key:"initPiece",value:function(){var e=document.createElement("i"),t=document.getElementById("".concat(this.position));switch(e.classList.add(this.color,"gamepiece"),e.setAttribute("data-position",this.position),e.setAttribute("data-type",this.type),e.setAttribute("data-team",this.color),e.setAttribute("data-object",window.btoa(JSON.stringify(this))),this.type){case"pawn":e.classList.add("fas","fa-chess-pawn");break;case"bishop":e.classList.add("fas","fa-chess-bishop");break;case"rook":e.classList.add("fas","fa-chess-rook");break;case"knight":e.classList.add("fas","fa-chess-knight");break;case"queen":e.classList.add("fas","fa-chess-queen");break;case"king":e.classList.add("fas","fa-chess-king")}this.icon=e,t.append(this.icon)}}])&&e(o.prototype,s),i}();function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,o=new Array(t);i<t;i++)o[i]=e[i];return o}function s(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var c=function(){function e(){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n(this,"tiles",void 0),n(this,"lightPieces",[]),n(this,"darkPieces",[]),this.tiles=(t=Array(8),function(e){if(Array.isArray(e))return o(e)}(t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?o(e,t):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).map((function(e){return Array(8).fill(void 0)}))}var t,c;return t=e,(c=[{key:"initBoard",value:function(){for(var e=document.getElementsByClassName("tile"),t=0,i=0,o=0;o<64;o++)e[o].setAttribute("data-index","".concat(t,",").concat(i)),this.tiles[t][i]={location:e[o].attributes.id.nodeValue,occupied:!1,element:e[o]},i++,7!==o&&15!==o&&23!==o&&31!==o&&39!==o&&47!==o&&55!==o||(t++,i=0);this.initlightPieces(),this.initdarkPieces(),console.log(this.tiles)}},{key:"initlightPieces",value:function(){for(var e=97,t=1;t<=8;t++){var o=2+String.fromCharCode(e),s=new i("pawn",o,"light",{row:6,col:t-1});this.lightPieces.push(s),this.tiles[1][t-1].occupied=!0,e++}this.lightPieces.push(new i("rook","1a","light",{row:7,col:0})),this.tiles[0][0].occupied=!0,this.lightPieces.push(new i("rook","1h","light",{row:7,col:7})),this.tiles[0][7].occupied=!0,this.lightPieces.push(new i("knight","1b","light",{row:7,col:1})),this.tiles[0][1].occupied=!0,this.lightPieces.push(new i("knight","1g","light",{row:7,col:6})),this.tiles[0][6].occupied=!0,this.lightPieces.push(new i("bishop","1c","light",{row:7,col:2})),this.tiles[0][2].occupied=!0,this.lightPieces.push(new i("bishop","1f","light",{row:7,col:5})),this.tiles[0][5].occupied=!0,this.lightPieces.push(new i("queen","1d","light",{row:7,col:3})),this.tiles[0][3].occupied=!0,this.lightPieces.push(new i("king","1e","light",{row:7,col:4})),this.tiles[0][4].occupied=!0}},{key:"initdarkPieces",value:function(){for(var e=97,t=1;t<=8;t++){var o=7+String.fromCharCode(e),s=new i("pawn",o,"dark",{row:1,col:t-1});this.darkPieces.push(s),this.tiles[6][t-1].occupied=!0,e++}this.darkPieces.push(new i("rook","8a","dark",{row:0,col:0})),this.tiles[7][0].occupied=!0,this.darkPieces.push(new i("rook","8h","dark",{row:0,col:7})),this.tiles[7][7].occupied=!0,this.darkPieces.push(new i("knight","8b","dark",{row:0,col:1})),this.tiles[7][1].occupied=!0,this.darkPieces.push(new i("knight","8g","dark",{row:0,col:6})),this.tiles[7][6].occupied=!0,this.darkPieces.push(new i("bishop","8c","dark",{row:0,col:2})),this.tiles[7][2].occupied=!0,this.darkPieces.push(new i("bishop","8f","dark",{row:0,col:5})),this.tiles[7][5].occupied=!0,this.darkPieces.push(new i("queen","8d","dark",{row:0,col:3})),this.tiles[7][3].occupied=!0,this.darkPieces.push(new i("king","8e","dark",{row:0,col:4})),this.tiles[7][4].occupied=!0}},{key:"locateTile",value:function(e){for(var t=0,i=0,o=0;o<64;o++){if(this.tiles[t][i].location===e)return{tile:this.tiles[t][i],index:{row:t,col:i}};i++,7!==o&&15!==o&&23!==o&&31!==o&&39!==o&&47!==o&&55!==o||(t++,i=0)}}}])&&s(t.prototype,c),e}();function a(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}(new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"board",void 0),r(this,"lightTurn",!0),r(this,"pieceToMove",void 0),r(this,"potentialMoves",[])}var t,i;return t=e,(i=[{key:"initGame",value:function(){this.board=new c,this.board.initBoard(),this.addEventListeners()}},{key:"checkPotentialMoves",value:function(e){switch(console.log("checking potential moves"),e.type){case"pawn":this.checkPawnMove(e);break;case"rook":this.checkRookMove(e);break;case"bishop":this.checkBishopMove(e);break;case"knight":this.checkKnightMove(e);break;case"queen":this.checkBishopMove(e),this.checkRookMove(e);break;case"king":this.checkKingMove(e)}}},{key:"checkPawnMove",value:function(e){var t=this.board.locateTile(e.position),i=t.index.row,o=t.index.col,s=[],n=1;"light"===e.color&&(n=-1),this.board.tiles[i+n][o].occupied||((!e.moved&&!this.board.tiles[i+n+n][o].occupied||!e.moved&&this.board.tiles[i+n+n][o].occupied&&this.board.tiles[i+n+n][o].element.children[0].getAttribute("data-team")!==e.color)&&s.push({row:i+n+n,col:o}),s.push({row:i+n,col:o})),o-1>=0&&i+n<8&&i+n>=0&&this.canMove(i+n,o-1,e)&&this.isOccupied(i+n,o-1)&&s.push({row:i+n,col:o-1}),o+1<8&&i+n<8&&i+n>=0&&this.canMove(i+n,o+1,e)&&this.isOccupied(i+n,o+1)&&s.push({row:t.index.row+n,col:o+1}),this.potentialMoves=s}},{key:"checkRookMove",value:function(e){for(var t=this.board.locateTile(e.position),i=t.index.row,o=t.index.col,s=[],n=1;!(!(n<=8&&i-n>=0)||this.isOccupied(i-n,o)&&this.board.tiles[i-n][o].element.children[0].getAttribute("data-team")===e.color||this.canMove(i-n,o,e)&&(s.push({row:i-n,col:o}),this.isOccupied(i-n,o)));n++);for(var c=1;!(!(c<=8&&i+c<=7)||this.isOccupied(i+c,o)&&this.board.tiles[i+c][o].element.children[0].getAttribute("data-team")===e.color||this.canMove(i+c,o,e)&&(s.push({row:i+c,col:o}),this.isOccupied(i+c,o)));c++);for(var a=1;!(!(a<=8&&o-a>=0)||this.isOccupied(i,o-a)&&this.board.tiles[i][o-a].element.children[0].getAttribute("data-team")===e.color||this.canMove(i,o-a,e)&&(s.push({row:i,col:o-a}),this.isOccupied(i,o-a)));a++);for(var r=1;!(!(r<=8&&o+r<=7)||this.isOccupied(i,o+r)&&this.board.tiles[i][o+r].element.children[0].getAttribute("data-team")===e.color||this.canMove(i,o+r,e)&&(s.push({row:i,col:o+r}),this.isOccupied(i,o+r)));r++);this.potentialMoves=this.potentialMoves.concat(s)}},{key:"checkBishopMove",value:function(e){for(var t=this.board.locateTile(e.position),i=t.index.row,o=t.index.col,s=[],n=1;!(!(n<=8&&i-n>=0&&o-n>=0)||this.isOccupied(i-n,o-n)&&this.board.tiles[i-n][o-n].element.children[0].getAttribute("data-team")===e.color||this.canMove(i-n,o-n,e)&&(s.push({row:i-n,col:o-n}),this.isOccupied(i-n,o-n)));n++);for(var c=1;!(!(c<=8&&i-c>=0&&o+c<=7)||this.isOccupied(i-c,o+c)&&this.board.tiles[i-c][o+c].element.children[0].getAttribute("data-team")===e.color||this.canMove(i-c,o+c,e)&&(s.push({row:i-c,col:o+c}),this.isOccupied(i-c,o+c)));c++);for(var a=1;!(!(a<=8&&i+a<=7&&o-a>=0)||this.isOccupied(i+a,o-a)&&this.board.tiles[i+a][o-a].element.children[0].getAttribute("data-team")===e.color||this.canMove(i+a,o-a,e)&&(s.push({row:i+a,col:o-a}),this.isOccupied(i+a,o-a)));a++);for(var r=1;!(!(r<=8&&i+r<=7&&o+r<=7)||this.isOccupied(i+r,o+r)&&this.board.tiles[i+r][o+r].element.children[0].getAttribute("data-team")===e.color||this.canMove(i+r,o+r,e)&&(s.push({row:i+r,col:o+r}),this.isOccupied(i+r,o+r)));r++);this.potentialMoves=this.potentialMoves.concat(s)}},{key:"checkKnightMove",value:function(e){var t=this.board.locateTile(e.position),i=t.index.row,o=t.index.col,s=[],n=2,c=1;i-n>=0&&(o-c>=0&&this.canMove(i-n,o-c,e)&&s.push({row:i-n,col:o-c}),o+c<=7&&this.canMove(i-n,o+c,e)&&s.push({row:i-n,col:o+c})),i+n<=8&&(o-c>=0&&this.canMove(i+n,o-c,e)&&s.push({row:i+n,col:o-c}),o+c<=7&&this.canMove(i+n,o+c,e)&&s.push({row:i+n,col:o+c})),n=1,o-(c=2)>=0&&(i-n>=0&&this.canMove(i-n,o-c,e)&&s.push({row:i-n,col:o-c}),i+n<=7&&this.canMove(i+n,o-c,e)&&s.push({row:i+n,col:o-c})),o+c<=7&&(i-n>=0&&this.canMove(i-n,o+c,e)&&s.push({row:i-n,col:o+c}),i+n<=7&&this.canMove(i+n,o+c,e)&&s.push({row:i+n,col:o+c})),this.potentialMoves=s}},{key:"checkKingMove",value:function(e){var t=this.board.locateTile(e.position),i=t.index.row,o=t.index.col,s=[];this.isInBound(i-1)&&this.canMove(i-1,o,e)&&s.push({row:i-1,col:o}),this.isInBound(i+1)&&this.canMove(i+1,o,e)&&s.push({row:i+1,col:o}),this.isInBound(o-1)&&this.canMove(i,o-1,e)&&s.push({row:i,col:o-1}),this.isInBound(o+1)&&this.canMove(i,o+1,e)&&s.push({row:i,col:o+1}),this.isInBound(i-1)&&this.isInBound(o-1)&&this.canMove(i-1,o-1,e)&&s.push({row:i-1,col:o-1}),this.isInBound(i-1)&&this.isInBound(o+1)&&this.canMove(i-1,o+1,e)&&s.push({row:i-1,col:o+1}),this.isInBound(i+1)&&this.isInBound(o-1)&&this.canMove(i+1,o-1,e)&&s.push({row:i+1,col:o-1}),this.isInBound(i+1)&&this.isInBound(o+1)&&this.canMove(i+1,o+1,e)&&s.push({row:i+1,col:o+1}),this.potentialMoves=s}},{key:"isCheck",value:function(e){console.log("checking for check!",e)}},{key:"displayPotentialMoves",value:function(e){var t=this;this.potentialMoves=[];var i=JSON.parse(window.atob(e.getAttribute("data-object")));this.validTurn(i)&&(this.checkPotentialMoves(i),this.potentialMoves.forEach((function(e){t.board.tiles[e.row][e.col].element.classList.add("overlay-effect")})))}},{key:"selectPieceToMove",value:function(e){this.pieceToMove=e.target;var t=JSON.parse(window.atob(this.pieceToMove.getAttribute("data-object")));this.validTurn(t)}},{key:"initMove",value:function(e){var t=parseInt(e.target.getAttribute("data-index").toString()[0]),i=parseInt(e.target.getAttribute("data-index").toString().substring(2)),o=JSON.parse(window.atob(this.pieceToMove.getAttribute("data-object")));this.validTurn(o)&&(this.potentialMoves.filter((function(e){return e.row===t&&e.col===i})).length<1||(this.updatePositions(e.target,o),e.target.appendChild(this.pieceToMove),this.isCheck(o),this.potentialMoves=[],this.lightTurn=!this.lightTurn))}},{key:"updatePositions",value:function(e,t){console.log("updating pos"),console.log(e,t);for(var i=0,o=0,s=0;s<64;s++){if(this.board.tiles[i][o].location===t.position&&(this.board.tiles[i][o].occupied=!1),this.board.tiles[i][o].location===e.id&&(this.board.tiles[i][o].occupied=!0,e.firstChild)){var n=JSON.parse(window.atob(e.firstChild.getAttribute("data-object")));console.log("peice to REMOVE",n),e.removeChild(e.childNodes[0])}o++,7!==s&&15!==s&&23!==s&&31!==s&&39!==s&&47!==s&&55!==s||(i++,o=0)}t.moved=!0;var c=e.getAttribute("data-index");t.index={row:parseInt(c[0]),col:parseInt(c[2])},t.position=e.id,this.pieceToMove.setAttribute("data-object",window.btoa(JSON.stringify(t)))}},{key:"addEventListeners",value:function(){for(var e=this,t=document.getElementsByClassName("gamepiece"),i=document.getElementsByClassName("tile"),o=0;o<i.length;o++)i[o].addEventListener("click",(function(t){e.initMove(t)}));for(var s=function(i){["mousedown","mouseup","click"].forEach((function(o){"mousedown"===o?t[i].addEventListener(o,(function(t){e.displayPotentialMoves(t.target)})):"mouseup"===o?t[i].addEventListener(o,(function(e){for(var t=document.getElementsByClassName("overlay-effect"),i=t.length-1;i>=0;i--)t[i].classList.remove("overlay-effect")})):"click"===o&&t[i].addEventListener(o,(function(t){e.selectPieceToMove(t)}))}))},n=0;n<t.length;n++)s(n)}},{key:"validTurn",value:function(e){return!(this.lightTurn&&"light"!==e.color||!this.lightTurn&&"dark"!==e.color)}},{key:"isOccupied",value:function(e,t){return this.board.tiles[e][t].occupied}},{key:"canMove",value:function(e,t,i){return!(this.isOccupied(e,t)&&(!this.isOccupied(e,t)||this.board.tiles[e][t].element.children[0].getAttribute("data-team")===i.color))}},{key:"isInBound",value:function(e){return e<=7&&e>=0}}])&&a(t.prototype,i),e}())).initGame()})();