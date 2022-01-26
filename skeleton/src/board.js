// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let array = new Array(8);
  for(let i = 0; i < 8; i++){
    array[i] = new Array(8);
  }
  array[3][4] = new Piece('black');
  array[4][3] = new Piece('black');
  array[3][3] = new Piece('white');
  array[4][4] = new Piece('white');
  return array;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

// Board.DIRS = [
//   [ 0,  1], [ 1,  1], [ 1,  0],
//   [ 1, -1], [ 0, -1], [-1, -1],
//   [-1,  0], [-1,  1]
// ];

Board.DIRS = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  const [x, y] = pos;
  return _inBounds(x) && _inBounds(y);
};

function _inBounds(val) {
  if(val > 7 || val < 0) return false;
  return true;
}

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  const [x, y] = pos;
  if(!this.isValidPos(pos)){
    throw new Error("Not valid pos!");
  }
  if(this.grid[x][y]) return this.grid[x][y];
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  const piece = this.getPiece(pos);
  if(!piece) return false;
  return piece.color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  const [x, y] = pos;
  return this.grid[x][y] ? true : false;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip = []){
  const newPos = [pos[0] + dir[0], pos[1] + dir[1]];
  if(!this.isValidPos(newPos)) return [];
  if (!this.isOccupied(newPos)) return [];
  if(this.isMine(newPos, color)) return piecesToFlip;

  piecesToFlip.push(newPos);
  return this._positionsToFlip(newPos, color, dir, piecesToFlip);
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  for(let direction of Board.DIRS){
    if(this._positionsToFlip(pos, color, direction).length > 0){
      return true;
    }
  }
  return false;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if(!this.validMove(pos, color)) {
    throw new Error("Invalid move!");
  } else {
    for(let direction of Board.DIRS) {
      let capturedPieces = this._positionsToFlip(pos, color, direction);
      for(let position of capturedPieces) {
        let piece = this.getPiece(position);
        piece.flip();
      }
    }  
    this.grid[pos[0]][pos[1]] = new Piece(color);
  }
};

const board = new Board();
board.placePiece([2,3],"black");
/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE