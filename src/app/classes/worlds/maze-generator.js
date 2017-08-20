
export class MazeGenerator {
  constructor() {
    this.maze = [];
    this.mazeWidth = 40;
    this.mazeHeight = 40;
    this.finalMaze = []
  }

  createMaze() {
    const moves = [];
    for(let i = 0; i < this.mazeHeight; i ++){
      this.maze[i] = [];
      for(let j = 0; j < this.mazeWidth; j ++){
        this.maze[i][j] = 1;
      }
    }
    let posX = 1;
    let posY = 1;
    this.maze[posX][posY] = 0;
    moves.push(posY + posY * this.mazeWidth);
    do {
      if (moves.length) {
        let possibleDirections = "";
        if (posX + 2 > 0 && posX + 2 < this.mazeHeight - 1 && this.maze[posX + 2][posY] == 1) {
          possibleDirections += "S";
        }
        if (posX - 2 > 0 && posX - 2 < this.mazeHeight - 1 && this.maze[posX - 2][posY] == 1) {
          possibleDirections += "N";
        }
        if (posY - 2 > 0 && posY - 2 < this.mazeWidth - 1 && this.maze[posX][posY - 2] == 1) {
          possibleDirections += "W";
        }
        if (posY + 2 > 0 && posY + 2 < this.mazeWidth - 1 && this.maze[posX][posY + 2] == 1) {
          possibleDirections += "E";
        }
        if (possibleDirections) {
          const move = Math.floor(Math.random() * possibleDirections.length);
          switch (possibleDirections[move]) {
            case "N":
              this.maze[posX - 2][posY] = 0;
              this.maze[posX - 1][posY] = 0;
              posX -= 2;
              break;
            case "S":
              this.maze[posX + 2][posY] = 0;
              this.maze[posX + 1][posY] = 0;
              posX += 2;
              break;
            case "W":
              this.maze[posX][posY - 2] = 0;
              this.maze[posX][posY - 1] = 0;
              posY -= 2;
              break;
            case "E":
              this.maze[posX][posY + 2] = 0;
              this.maze[posX][posY + 1] = 0;
              posY += 2;
              break;
          }
          moves.push(posY + posX * this.mazeWidth);
        }
        else {
          const back = moves.pop();
          posX = Math.floor(back / this.mazeWidth);
          posY = back % this.mazeWidth;
        }
        this.buildMaze(posX, posY);
      }
    }
    while (moves.length);
    console.log(this.finalMaze);
  }

  buildMaze(posX, posY) {
    for(let i = 0; i < this.mazeHeight; i ++){
      for(let j = 0; j < this.mazeWidth; j ++){
        if(!this.finalMaze[j]) this.finalMaze[j] = [];
        // if(this.maze[i][j] == 1){
          this.finalMaze[j][i] = this.maze[i][j] === 1 ? 1 : 0;
        // } else {
        //   this.finalMaze[j][i] = 0;
        // }
      }
    }
  }
}


const m = new MazeGenerator();
m.createMaze()
