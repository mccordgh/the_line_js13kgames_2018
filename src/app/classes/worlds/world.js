import { EntityManager } from '../entities/entity-manager';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
import { Guard } from '../entities/creatures/monsters/guard';

import generateRooms from './generate-rooms';
import { Exit } from '../entities/statics/exit';

// let rectSize = 0, whiteFade = -1;
let rectSize = 0, whiteFade = 1, didEnd = false;

export class World {
  constructor(handler) {
    this.handler = handler;
    this.entityManager = new EntityManager(handler, new Player(handler, 4, 6));
    this.spatialGrid = new SpatialGrid(GAME_SIZE, GAME_SIZE, TILE_SIZE);
    this.playerDied = false;
    this.machineFilled = false;

    this.start = rndIndex([5,6,9,10]);
    this.rooms = generateRooms(handler, this.start);
    this.room = this.rooms[this.start];
    // ANIMATION_TIMER.speed = 460;

    handler.setWorld(this);
    this.loadWorld();
  }

  tick(dt) {
    this.room.tick();

    if (!this.machineFilled) {
      this.entityManager.tick(dt);
    }
  }

  render(g) {
    // if (!this.changeRoom) {
      this.room.render(g);
      this.entityManager.render(g);

      if (this.playerDied) {
        rectSize += 3.5;
  
        g.fillStyle = 'black';
        g.fillRect(0, 0, rectSize, GAME_SIZE);
        g.fillRect(GAME_SIZE - rectSize, 0, GAME_SIZE, GAME_SIZE)
      }
    // } 

    if (this.machineFilled) {
      if (whiteFade >= 1) {
        this.machineFilled = false;
        this.entityManager.pacifyAll();
        ANIMATION_TIMER.stop = false;
        if (!didEnd) this.createFinalExit();
        return;
      }

      whiteFade += .005;

      g.shakeScreen();

      g.fillStyle = 'white';
      g.globalAlpha = whiteFade > 0 ? whiteFade : 0;
      g.fillRect(0, 0, GAME_SIZE, GAME_SIZE);

      g.globalAlpha = 1;
    }
  }
  
  createFinalExit() {
    let num = rndIndex([0, 3, 12, 15]);
    let room = this.rooms[num];
    let x = TILE_SIZE * 5;
    let y = (num == 0 || num == 3) ? 0 : GAME_SIZE - TILE_SIZE;

    // console.log('exit in room', num);
    room.tileSet[11][5] = room.tileSet[11][6] = 0;
    room.tileSet[0][5] = room.tileSet[0][6] = 0;
    
    room.addEntity(new Exit(this.handler, x / TILE_SIZE, (y / TILE_SIZE)));
    room.addEntity(new Exit(this.handler, (x + TILE_SIZE) / TILE_SIZE, (y / TILE_SIZE)));
    didEnd = true;
  }

  setPlayerSpawn(dir) {
    let p = this.entityManager.getPlayer();
    p.x = dir.x || p.x;
    p.y = dir.y || p.y;
  }

  changeRooms(dir, roomNum = null) {
    // dir will be: 1 = north, 2 = east, 3 = south, 4 = west
    this.changeRoom = true;
    let prevRoom = this.room;
    this.room = roomNum ? this.rooms[roomNum] : this.rooms[this.room.id + dir.mod];
    if (dir) this.setPlayerSpawn(dir);
    this.loadWorld(prevRoom);
    this.changeRoom = false;
  }

  loadWorld(prevRoom = null) {
    this.spatialGrid.reset();
    this.entityManager.newRoom(prevRoom, this.room);
  }

  getTile(x, y) {
    // try {
      return TileManager.getTiles()[this.room.tiles()[y][x]];
    // }
    // catch(e) {
    // }
  }

  getEntityManager() {
    return this.entityManager;
  }

  getSpatialGrid() {
    return this.spatialGrid;
  }
}
