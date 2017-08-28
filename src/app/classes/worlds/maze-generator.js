const maze = [],
  mazeWidth = 39,
  mazeHeight = 39,
  finalMaze = [],
  // set maximum and minimum number for wall ids (2 is yellow, 3 is blue);
  wallIDs = [2, 3, 7];
  let counting = 0;

const getRandomWallID = (i, j) => {
  // make sure we don't build a passable wall on the outside border
  if (i === 0 || j === 0 || i === mazeWidth - 1 || j === mazeHeight - 1) return 1;

  const randomNum = Math.floor(Math.random() * 20);

  return (randomNum < 15) ? 1 : wallIDs[Math.floor(Math.random() * (wallIDs.length))];
};

export class MazeGenerator {
  static createMaze() {
    const moves = [];
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
          const move = Math.floor(Math.random() * possibleDirections.length);
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
          const back = moves.pop();
          posX = Math.floor(back / mazeWidth);
          posY = back % mazeWidth;
        }
        this.buildFinalMaze(posX, posY);
      }
    }
    while (moves.length);
  }

  static buildFinalMaze(posX, posY) {
    for(let i = 0; i < mazeHeight; i ++){
      for(let j = 0; j < mazeWidth; j ++){
        if(!finalMaze[j]) finalMaze[j] = [];
        finalMaze[j][i] = maze[i][j] === 1 ? getRandomWallID(i, j) : 0;
      }
    }
  }

  static getRandomRoomEntities() {
    //9 - SwitchGreen,  6 - SwitchBlue,  10 - Exit,  0 - path (empty room)
    const entities = [10, 0, 9];
    //let's spawn one of the switches in room #1 with the player
    const rooms = [9];

    // const maxSwitchIndex = 2;
    // const minSwitchIndex = 1;
    // const whichSwitch = Math.floor(Math.random() * (maxSwitchIndex - minSwitchIndex + 1)) + minSwitchIndex;
    //
    // rooms.push(entities[whichSwitch]);
    // entities.splice(whichSwitch, 1);

    //then let's randomly spawn the rest of the stuff in the other three rooms
    // console.log({rooms, entities});
    do {
      const maxIndex = entities.length - 1;
      const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
      rooms.push(entities[randomIndex]);
      entities.splice(randomIndex, 1);
    } while (entities.length > 0);

    return rooms;
  }

  static createRooms() {
    const roomSize = 3;
    const roomEntities = this.getRandomRoomEntities();

    // NW room
    this.createRoom(1, 1, roomSize, roomEntities[0]);
    // SW room
    this.createRoom(1, mazeHeight - (roomSize + 1), roomSize, roomEntities[1]);
    // SE ROOM
    this.createRoom(mazeWidth - (roomSize + 1), mazeHeight - (roomSize + 1), roomSize, roomEntities[2]);
    // NE ROOM
    this.createRoom(mazeWidth - (roomSize + 1), 1, roomSize, roomEntities[3]);
  }

  static createRoom(startX, startY, size, entity) {
    for(let i = startY; i < startY + size; i ++){
      for(let j = startX; j < startX +  size; j ++){
        finalMaze[j][i] = 0;
      }
    }

    finalMaze[startX + Math.floor(size / 2)][startY + Math.floor(size / 2)] = entity;
  }

  static createBarriers() {
    //mid left
    finalMaze[1][Math.ceil(mazeHeight / 2)] = 1;
    finalMaze[1][Math.ceil(mazeHeight / 2) + 1] = 1;

    //mid right
    finalMaze[mazeWidth - 2][Math.ceil(mazeHeight / 2)] = 1;
    finalMaze[mazeWidth - 2][Math.ceil(mazeHeight / 2) + 1] = 1;

    //mid top
    finalMaze[Math.ceil(mazeWidth / 2)][1] = 1;
    finalMaze[Math.ceil(mazeWidth / 2) + 1][1] = 1;

    //mid bottom
    finalMaze[Math.ceil(mazeWidth / 2)][mazeHeight - 2] = 1;
    finalMaze[Math.ceil(mazeWidth / 2) + 1][mazeHeight - 2] = 1;
  }

  static addOneOfEachSwitchAtStart() {
    finalMaze[4][1] = 3;
    finalMaze[4][3] = 7;
    finalMaze[2][4] = 2;
  }

  static getRandomMaze(height, width, spawnX, spawnY) {
    this.createMaze();
    this.createRooms();
    this.createBarriers();
    this.addOneOfEachSwitchAtStart();
    return {
      width,
      height,
      spawnX,
      spawnY,
      pieces: finalMaze,
    };
  }
}
