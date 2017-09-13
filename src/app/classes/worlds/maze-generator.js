let maze = [], finalMaze = [], mazeWidth = 0, mazeHeight = 0;

let getRW = (i, j) => {
  // make sure we don't build a passable wall on the outside border
  if (i === 0 || j === 0 || i === mazeWidth - 1 || j === mazeHeight - 1) return 1;

  let randomNum = Math.floor(Math.random() * 20);

  return (randomNum < 15) ? 1 : 2;
};

export class MazeGenerator {
  static cM() {
    let moves = [];
    for(let i = 0; i < mazeHeight; i ++){
      maze[i] = [];
      for(let j = 0; j < mazeWidth; j ++){
        maze[i][j] = 1;
      }
    }
    let posX = 1;
    let posY = 1;
    maze[posX][posY] = 0;
    moves.push(posY + posY * mazeWidth);
    do {
      if (moves.length) {
        let possibleDirections = '';
        if (posX + 2 > 0 && posX + 2 < mazeHeight - 1 && maze[posX + 2][posY] == 1) {
          possibleDirections += 'S';
        }
        if (posX - 2 > 0 && posX - 2 < mazeHeight - 1 && maze[posX - 2][posY] == 1) {
          possibleDirections += 'N';
        }
        if (posY - 2 > 0 && posY - 2 < mazeWidth - 1 && maze[posX][posY - 2] == 1) {
          possibleDirections += 'W';
        }
        if (posY + 2 > 0 && posY + 2 < mazeWidth - 1 && maze[posX][posY + 2] == 1) {
          possibleDirections += 'E';
        }
        if (possibleDirections) {
          let move = Math.floor(Math.random() * possibleDirections.length);
          switch (possibleDirections[move]) {
            case 'N':
              maze[posX - 2][posY] = 0;
              maze[posX - 1][posY] = 0;
              posX -= 2;
              break;
            case 'S':
              maze[posX + 2][posY] = 0;
              maze[posX + 1][posY] = 0;
              posX += 2;
              break;
            case 'W':
              maze[posX][posY - 2] = 0;
              maze[posX][posY - 1] = 0;
              posY -= 2;
              break;
            case 'E':
              maze[posX][posY + 2] = 0;
              maze[posX][posY + 1] = 0;
              posY += 2;
              break;
          }
          moves.push(posY + posX * mazeWidth);
        }
        else {
          let back = moves.pop();
          posX = Math.floor(back / mazeWidth);
          posY = back % mazeWidth;
        }
        this.buildFinalMaze(posX, posY);
      }
    }
    while (moves.length);
  }

  static buildFinalMaze() {
    for(let i = 0; i < mazeHeight; i ++){
      for(let j = 0; j < mazeWidth; j ++){
        if(!finalMaze[j]) finalMaze[j] = [];
        finalMaze[j][i] = maze[i][j] === 1 ? getRW(i, j) : 0;
      }
    }
  }

  static cRs() {
    let roomSize = 3;

    // NW room
    this.cR(1, 1, roomSize);
    // SW room
    this.cR(1, mazeHeight - (roomSize + 1), roomSize);
    // SE ROOM
    this.cR(mazeWidth - (roomSize + 1), mazeHeight - (roomSize + 1), roomSize);
    // NE ROOM
    this.cR(mazeWidth - (roomSize + 1), 1, roomSize);
  }

  static cR(startX, startY, size) {
    for(let i = startY; i < startY + size; i ++){
      for(let j = startX; j < startX +  size; j ++){
        finalMaze[j][i] = 0;
      }
    }
  }

  static getIntroMaze() {
		return [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 1, 1],
      [1, 0, 0, 2, 0, 1, 1],
      [1, 0, 0, 1, 0, 1, 1],
      [1, 0, 0, 2, 0, 1, 1],
      [1, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
      ];
  }

  static getRandomMaze(level, spawnX, spawnY) {
    if (level === 1) {
      return {
        mazeWidth: 7,
        mazeHeight: 7,
        spawnX: 1,
        spawnY: 1,
        pieces: this.getIntroMaze()
      };
    } else {
      mazeWidth = mazeHeight = (level * 10) - 1;

      this.cM();
      this.cRs();

      return {
        mazeWidth,
        mazeHeight,
        spawnX,
        spawnY,
        pieces: finalMaze,
      };
    }
  }
}
