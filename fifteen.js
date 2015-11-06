var BLANK_X = 300; 
var BLANK_Y = 300; 
var TILES = []; 

window.onload = function() { 
   createPieces(); 
   $("shufflebutton").observe("click", shuffle); 
 }; 
 
function createPieces() { 
	TILES = $$('#puzzlearea div'); 
 	var j = 0; 
 	var t = 3; 
 	for (var i = 0; i < TILES.length; i++) { 
 		for (var x = 0; x <= t; x++) { 
 			TILES[i].addClassName("puzzlepiece"); 
 			TILES[i].style.top = 100 * j + "px"; 
 			TILES[i].style.left = 100 * x  + "px"; 
 			TILES[i].style.backgroundPosition = -x * 100 + "px " + j * -100 + "px"; 
 			TILES[i].observe("click", moveTile); 
 			TILES[i].observe("mouseover", hover); 
 			i++; 
 		} 
 		j++; 
 		if (j > 2) { 
 			t = 2; 
 		} 
 		i--; 
 	} 
 }	 

 function hover(event) { 
 	if (testNeighbour(this.style.left, this.style.top)) { 
 		this.addClassName("movablepiece"); 
 	} else if (this.hasClassName("movablepiece")) { 
 		this.removeClassName("movablepiece"); 
 	} 
} 

function moveTileHelp(tile) { 
 	if (testNeighbour(tile.style.left, tile.style.top)) { 
 		var holderX = tile.style.left; 
 		var holderY = tile.style.top; 
 		tile.style.left = BLANK_X + "px"; 
 		tile.style.top = BLANK_Y + "px"; 
 		BLANK_X = parseInt(holderX); 
 		BLANK_Y = parseInt(holderY); 
 	} 
} 

function moveTile(event) { 
 	moveTileHelp(this); 
 } 
 
function shuffle() { 
 	var holder = []; 
 	for (var i = 0; i < 200; i++) { 
 		for (var j = 0; j < TILES.length; j++) { 
 			if (testNeighbour(TILES[j].style.left, TILES[j].style.top)) { 
				holder.push(TILES[j]); 
			} 
		} 
		moveTileHelp(holder[Math.floor(Math.random() * holder.length)]); 
		holder = []; 
	} 
} 

function testNeighbour(x, y) { 
 	if (Math.abs(BLANK_Y - parseInt(y)) == 100) { 
 		if (Math.abs(BLANK_X - parseInt(x)) == 0) { 
 			return true; 
 		} 
 	} else if (Math.abs(BLANK_X - parseInt(x)) == 100) { 
 		if (Math.abs(BLANK_Y - parseInt(y)) == 0) { 
 			return true; 
 		} 
 	} 
 	return false; 
} 
