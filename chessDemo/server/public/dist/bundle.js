(()=>{"use strict";function e(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var i=function(){function i(e,o,s){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),t(this,"type",""),t(this,"color",""),t(this,"position",""),t(this,"icon",""),t(this,"moved",!1),this.position=o,this.type=e,this.color=s,this.initPiece()}var o,s;return o=i,(s=[{key:"initPiece",value:function(){var e=document.createElement("i"),t=document.getElementById("".concat(this.position));switch(e.classList.add(this.color,"gamepiece"),e.setAttribute("data-position",this.position),e.setAttribute("data-type",this.type),e.setAttribute("data-team",this.color),e.setAttribute("data-object",window.btoa(JSON.stringify(this))),this.type){case"pawn":e.classList.add("fas","fa-chess-pawn");break;case"bishop":e.classList.add("fas","fa-chess-bishop");break;case"rook":e.classList.add("fas","fa-chess-rook");break;case"knight":e.classList.add("fas","fa-chess-knight");break;case"queen":e.classList.add("fas","fa-chess-queen");break;case"king":e.classList.add("fas","fa-chess-king")}this.icon=e,t.append(this.icon)}}])&&e(o.prototype,s),i}();function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,o=new Array(t);i<t;i++)o[i]=e[i];return o}function s(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var a=function(){function e(){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"tiles",void 0),r(this,"lightPieces",[]),r(this,"darkPieces",[]),this.tiles=(t=Array(8),function(e){if(Array.isArray(e))return o(e)}(t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?o(e,t):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).map((function(e){return Array(8).fill(void 0)}))}var t,a;return t=e,(a=[{key:"initBoard",value:function(){for(var e=document.getElementsByClassName("tile"),t=0,i=0,o=0;o<64;o++)e[o].setAttribute("data-index","".concat(t,",").concat(i)),this.tiles[t][i]={location:e[o].attributes.id.nodeValue,occupied:!1,element:e[o]},i++,7!==o&&15!==o&&23!==o&&31!==o&&39!==o&&47!==o&&55!==o||(t++,i=0);this.initlightPieces(),this.initdarkPieces(),console.log(this.tiles)}},{key:"initlightPieces",value:function(){for(var e=97,t=1;t<=8;t++){var o=2+String.fromCharCode(e),s=new i("pawn",o,"light");this.lightPieces.push(s),this.tiles[1][t-1].occupied=!0,e++}this.lightPieces.push(new i("rook","1a","light")),this.tiles[0][0].occupied=!0,this.lightPieces.push(new i("rook","1h","light")),this.tiles[0][7].occupied=!0,this.lightPieces.push(new i("knight","1b","light")),this.tiles[0][1].occupied=!0,this.lightPieces.push(new i("knight","1g","light")),this.tiles[0][6].occupied=!0,this.lightPieces.push(new i("bishop","1c","light")),this.tiles[0][2].occupied=!0,this.lightPieces.push(new i("bishop","1f","light")),this.tiles[0][5].occupied=!0,this.lightPieces.push(new i("queen","1d","light")),this.tiles[0][3].occupied=!0,this.lightPieces.push(new i("king","1e","light")),this.tiles[0][4].occupied=!0}},{key:"initdarkPieces",value:function(){for(var e=97,t=1;t<=8;t++){var o=7+String.fromCharCode(e),s=new i("pawn",o,"dark");this.darkPieces.push(s),this.tiles[6][t-1].occupied=!0,e++}this.darkPieces.push(new i("rook","8a","dark")),this.tiles[7][0].occupied=!0,this.darkPieces.push(new i("rook","8h","dark")),this.tiles[7][7].occupied=!0,this.darkPieces.push(new i("knight","8b","dark")),this.tiles[7][1].occupied=!0,this.darkPieces.push(new i("knight","8g","dark")),this.tiles[7][6].occupied=!0,this.darkPieces.push(new i("bishop","8c","dark")),this.tiles[7][2].occupied=!0,this.darkPieces.push(new i("bishop","8f","dark")),this.tiles[7][5].occupied=!0,this.darkPieces.push(new i("queen","8d","dark")),this.tiles[7][3].occupied=!0,this.darkPieces.push(new i("king","8e","dark")),this.tiles[7][4].occupied=!0}},{key:"locateTile",value:function(e){for(var t=0,i=0,o=0;o<64;o++){if(this.tiles[t][i].location===e)return{tile:this.tiles[t][i],index:{row:t,col:i}};i++,7!==o&&15!==o&&23!==o&&31!==o&&39!==o&&47!==o&&55!==o||(t++,i=0)}}}])&&s(t.prototype,a),e}();function c(e,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}(new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"board",void 0),l(this,"lightTurn",!0),l(this,"pieceToMove",void 0),l(this,"potentialMoves",[])}var t,i;return t=e,(i=[{key:"initGame",value:function(){this.board=new a,this.board.initBoard(),this.addEventListeners()}},{key:"checkPotentialMoves",value:function(e){var t=JSON.parse(window.atob(e.getAttribute("data-object")));if(console.log(t),this.validTurn(t))switch(console.log("checking potential moves"),t.type){case"pawn":this.checkPawnMove(t);break;case"rook":this.checkRookMove(t);break;case"bishop":this.checkBishopMove(t);break;case"knight":this.checkKnightMove(t)}}},{key:"checkPawnMove",value:function(e){var t=this,i=this.board.locateTile(e.position);console.log("pawn piece: ",e),console.log("pawn tile",i);var o=i.index.row,s=i.index.col,r=[],a=1;"light"===e.color&&(a=-1),(!this.board.tiles[o+a][s].occupied||this.board.tiles[o+a][s].occupied&&this.board.tiles[i.index.row+a][i.index.col].element.children[0].getAttribute("data-team")!==e.color)&&((!e.moved&&!this.board.tiles[o+2*a][s].occupied||this.board.tiles[o+2*a][s].occupied&&this.board.tiles[i.index.row+2*a][i.index.col].element.children[0].getAttribute("data-team")!==e.color)&&r.push({row:o+2*a,col:s}),r.push({row:o+a,col:s})),s-1>-1&&o+a<8&&o+a>-1&&this.board.tiles[i.index.row+a][i.index.col-1].occupied&&this.board.tiles[i.index.row+a][i.index.col-1].element.children[0].getAttribute("data-team")!==e.color&&(console.log("text"),r.push({row:i.index.row+a,col:i.index.col-1})),s+1<8&&o+a<8&&o+a>-1&&this.board.tiles[i.index.row+a][i.index.col+1].occupied&&this.board.tiles[i.index.row+a][i.index.col+1].element.children[0].getAttribute("data-team")!==e.color&&(console.log("text2"),r.push({row:i.index.row+a,col:i.index.col+1})),r.forEach((function(e){t.board.tiles[e.row][e.col].element.classList.add("overlay-effect")})),this.potentialMoves=r}},{key:"checkRookMove",value:function(e){for(var t=this,i=this.board.locateTile(e.position),o=i.index.row,s=i.index.col,r=[],a=1;a<=8&&o-a>=0&&(!this.board.tiles[o-a][s].occupied||this.board.tiles[o-a][s].element.children[0].getAttribute("data-team")!==e.color)&&(this.board.tiles[o-a][s].occupied&&(!this.board.tiles[o-a][s].occupied||this.board.tiles[o-a][s].element.children[0].getAttribute("data-team")===e.color)||(r.push({row:o-a,col:s}),!this.board.tiles[o-a][s].occupied||this.board.tiles[o-a][s].element.children[0].getAttribute("data-team")===e.color));a++);for(var c=1;c<=8&&o+c<=7&&(!this.board.tiles[o+c][s].occupied||this.board.tiles[o+c][s].element.children[0].getAttribute("data-team")!==e.color)&&(this.board.tiles[o+c][s].occupied&&(!this.board.tiles[o+c][s].occupied||this.board.tiles[o+c][s].element.children[0].getAttribute("data-team")===e.color)||(r.push({row:o+c,col:s}),!this.board.tiles[o+c][s].occupied||this.board.tiles[o+c][s].element.children[0].getAttribute("data-team")===e.color));c++);for(var l=1;l<=8&&s-l>=0&&(!this.board.tiles[o][s-l].occupied||this.board.tiles[o][s-l].element.children[0].getAttribute("data-team")!==e.color)&&(this.board.tiles[o][s-l].occupied&&(!this.board.tiles[o][s-l].occupied||this.board.tiles[o][s-l].element.children[0].getAttribute("data-team")===e.color)||(r.push({row:o,col:s-l}),!this.board.tiles[o][s-l].occupied||this.board.tiles[o][s-l].element.children[0].getAttribute("data-team")===e.color));l++);for(var n=1;n<=8&&s+n<=7&&(!this.board.tiles[o][s+n].occupied||this.board.tiles[o][s+n].element.children[0].getAttribute("data-team")!==e.color)&&(this.board.tiles[o][s+n].occupied&&(!this.board.tiles[o][s+n].occupied||this.board.tiles[o][s+n].element.children[0].getAttribute("data-team")===e.color)||(r.push({row:o,col:s+n}),!this.board.tiles[o][s+n].occupied||this.board.tiles[o][s+n].element.children[0].getAttribute("data-team")===e.color));n++);r.forEach((function(e){t.board.tiles[e.row][e.col].element.classList.add("overlay-effect")})),this.potentialMoves=r}},{key:"checkBishopMove",value:function(e){for(var t=this,i=this.board.locateTile(e.position),o=i.index.row,s=i.index.col,r=[],a=1;a<=8&&o-a>=0&&s-a>=0&&(!this.board.tiles[o-a][s-a].occupied||this.board.tiles[o-a][s-a].element.children[0].getAttribute("data-team")!==e.color)&&(this.board.tiles[o-a][s-a].occupied&&(!this.board.tiles[o-a][s-a].occupied||this.board.tiles[o-a][s-a].element.children[0].getAttribute("data-team")===e.color)||(r.push({row:o-a,col:s-a}),!this.board.tiles[o-a][s-a].occupied||this.board.tiles[o-a][s-a].element.children[0].getAttribute("data-team")===e.color));a++);for(var c=1;c<=8&&o-c>=0&&s+c<=7&&(!this.board.tiles[o-c][s+c].occupied||this.board.tiles[o-c][s+c].element.children[0].getAttribute("data-team")!==e.color)&&(this.board.tiles[o-c][s+c].occupied&&(!this.board.tiles[o-c][s+c].occupied||this.board.tiles[o-c][s+c].element.children[0].getAttribute("data-team")===e.color)||(r.push({row:o-c,col:s+c}),!this.board.tiles[o-c][s+c].occupied||this.board.tiles[o-c][s+c].element.children[0].getAttribute("data-team")===e.color));c++);for(var l=1;l<=8&&o+l<=7&&s-l>=0&&(!this.board.tiles[o+l][s-l].occupied||this.board.tiles[o+l][s-l].element.children[0].getAttribute("data-team")!==e.color)&&(this.board.tiles[o+l][s-l].occupied&&(!this.board.tiles[o+l][s-l].occupied||this.board.tiles[o+l][s-l].element.children[0].getAttribute("data-team")===e.color)||(r.push({row:o+l,col:s-l}),!this.board.tiles[o+l][s-l].occupied||this.board.tiles[o+l][s-l].element.children[0].getAttribute("data-team")===e.color));l++);for(var n=1;n<=8&&o+n<=7&&s+n<=7&&(!this.board.tiles[o+n][s+n].occupied||this.board.tiles[o+n][s+n].element.children[0].getAttribute("data-team")!==e.color)&&(this.board.tiles[o+n][s+n].occupied&&(!this.board.tiles[o+n][s+n].occupied||this.board.tiles[o+n][s+n].element.children[0].getAttribute("data-team")===e.color)||(r.push({row:o+n,col:s+n}),!this.board.tiles[o+n][s+n].occupied||this.board.tiles[o+n][s+n].element.children[0].getAttribute("data-team")===e.color));n++);r.forEach((function(e){t.board.tiles[e.row][e.col].element.classList.add("overlay-effect")})),this.potentialMoves=r}},{key:"checkKnightMove",value:function(e){var t=this,i=this.board.locateTile(e.position);console.log("knight piece: ",e),console.log("knight tile",i);var o=i.index.row,s=i.index.col,r=[],a=2,c=1;o-a>=0&&(s-c>=0&&(!this.board.tiles[o-a][s-c].occupied||this.board.tiles[o-a][s-c].occupied&&this.board.tiles[o-a][s-c].element.children[0].getAttribute("data-team")!==e.color)&&r.push({row:o-a,col:s-c}),s+c<=7&&(!this.board.tiles[o-a][s+c].occupied||this.board.tiles[o-a][s+c].occupied&&this.board.tiles[o-a][s+c].element.children[0].getAttribute("data-team")!==e.color)&&r.push({row:o-a,col:s+c})),o+a<=8&&(s-c>=0&&(!this.board.tiles[o+a][s-c].occupied||this.board.tiles[o+a][s-c].occupied&&this.board.tiles[o+a][s-c].element.children[0].getAttribute("data-team")!==e.color)&&r.push({row:o+a,col:s-c}),s+c<=7&&(!this.board.tiles[o+a][s+c].occupied||this.board.tiles[o+a][s+c].occupied&&this.board.tiles[o+a][s+c].element.children[0].getAttribute("data-team")!==e.color)&&r.push({row:o+a,col:s+c})),a=1,s-(c=2)>=0&&(o-a>=0&&(!this.board.tiles[o-a][s-c].occupied||this.board.tiles[o-a][s-c].occupied&&this.board.tiles[o-a][s-c].element.children[0].getAttribute("data-team")!==e.color)&&r.push({row:o-a,col:s-c}),o+a<=7&&(!this.board.tiles[o+a][s-c].occupied||this.board.tiles[o+a][s-c].occupied&&this.board.tiles[o+a][s-c].element.children[0].getAttribute("data-team")!==e.color)&&r.push({row:o+a,col:s-c})),s+c<=7&&(o-a>=0&&(!this.board.tiles[o-a][s+c].occupied||this.board.tiles[o-a][s+c].occupied&&this.board.tiles[o-a][s+c].element.children[0].getAttribute("data-team")!==e.color)&&r.push({row:o-a,col:s+c}),o+a<=7&&(!this.board.tiles[o+a][s+c].occupied||this.board.tiles[o+a][s+c].occupied&&this.board.tiles[o+a][s+c].element.children[0].getAttribute("data-team")!==e.color)&&r.push({row:o+a,col:s+c})),r.forEach((function(e){t.board.tiles[e.row][e.col].element.classList.add("overlay-effect")})),this.potentialMoves=r}},{key:"selectPieceToMove",value:function(e){this.pieceToMove=e.target;var t=JSON.parse(window.atob(this.pieceToMove.getAttribute("data-object")));this.validTurn(t)&&console.log(this.potentialMoves,this.pieceToMove)}},{key:"initMove",value:function(e){console.log("init move",e.target);var t={row:parseInt(e.target.getAttribute("data-index").toString()[0]),col:parseInt(e.target.getAttribute("data-index").toString().substring(2))};console.log(t);var i=JSON.parse(window.atob(this.pieceToMove.getAttribute("data-object")));this.validTurn(i)&&(this.potentialMoves.filter((function(e){return e.row===t.row&&e.col===t.col})).length<1||(this.updatePositions(e.target,i),e.target.appendChild(this.pieceToMove),this.potentialMoves=[],this.lightTurn=!this.lightTurn))}},{key:"updatePositions",value:function(e,t){console.log("updating pos",t),console.log(e,t);for(var i=0,o=0,s=0;s<64;s++){if(this.board.tiles[i][o].location===t.position&&(this.board.tiles[i][o].occupied=!1),this.board.tiles[i][o].location===e.id&&(this.board.tiles[i][o].occupied=!0,e.firstChild)){var r=JSON.parse(window.atob(e.firstChild.getAttribute("data-object")));console.log("peice to REMOVE",r),e.removeChild(e.childNodes[0])}o++,7!==s&&15!==s&&23!==s&&31!==s&&39!==s&&47!==s&&55!==s||(i++,o=0)}t.moved=!0,t.position=e.id,this.pieceToMove.setAttribute("data-object",window.btoa(JSON.stringify(t)))}},{key:"addEventListeners",value:function(){for(var e=this,t=document.getElementsByClassName("gamepiece"),i=document.getElementsByClassName("tile"),o=0;o<i.length;o++)i[o].addEventListener("click",(function(t){e.initMove(t)}));for(var s=function(i){["mousedown","mouseup","click"].forEach((function(o){"mousedown"===o?t[i].addEventListener(o,(function(t){e.checkPotentialMoves(t.target)})):"mouseup"===o?t[i].addEventListener(o,(function(e){for(var t=document.getElementsByClassName("overlay-effect"),i=t.length-1;i>=0;i--)t[i].classList.remove("overlay-effect")})):"click"===o&&t[i].addEventListener(o,(function(t){e.selectPieceToMove(t)}))}))},r=0;r<t.length;r++)s(r)}},{key:"validTurn",value:function(e){return!(this.lightTurn&&"light"!==e.color||!this.lightTurn&&"dark"!==e.color)}}])&&c(t.prototype,i),e}())).initGame()})();