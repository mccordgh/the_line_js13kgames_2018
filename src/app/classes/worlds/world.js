import { EntityManager } from '../entities/entity-manager';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
import { Guard } from '../entities/creatures/monsters/guard';

import roomSet from './rooms.js';

export class World {
  constructor(handler) {
    // this.tiles = [];
    this.handler = handler;
    this.entityManager = new EntityManager(handler, new Player(handler, 4, 4));
    this.spatialGrid = new SpatialGrid(GAME_SIZE, GAME_SIZE, TILE_SIZE);
    this.rooms = roomSet;
    this.room = rndInt(4, 11);

    handler.setWorld(this);
    // this.loadWorld();
  }

  tick(dt) {
    this.tickTiles();
    this.entityManager.tick(dt);
  }

  render(g) {
    if (!this.changeRoom) {
      this.renderTiles(g);
      // this.spatialGrid.render(g);
      this.entityManager.render(g);
    }
  }

  setPlayerSpawn(dir) {
    let p = this.entityManager.getPlayer();
    p.x = dir.x || p.x;
    p.y = dir.y || p.y;
  }

  changeRooms(dir) {
    this.changeRoom = true;
    // console.log(this.rooms, this.room, dir.mod);
    this.room = this.room + dir.mod;
    this.setPlayerSpawn(dir);
    this.changeRoom = false;
    console.log('now in room', this.room);
    // dir will be: 1 = north, 2 = east, 3 = south, 4 = west
  }

  // loadWorld() {
    // let pieces = this.fillWorld();

    // for (let y = 0; y < TILE_COUNT; y++) {
    //   for (let x = 0; x < TILE_COUNT; x++) {
    //     if (!this.tiles[x]) this.tiles[x] = [];
    //     this.tiles[x][y] = pieces[x][y];
    //   }
    // }

    // this.entityManager.addEntity(new Guard(this.handler, 8, 3))
    // this.entityManager.addEntity(new Guard(this.handler, 3, 8))
  // }

  // fillWorld() {
    // let index = rndInt(4, 11);
    // console.log(index);

    // return this.rooms[this.room];
  // }

  // rooms() {
  //   return {
  //     10: [
  //       [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  //       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  //       [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  //     ],
  //   };
  // }

  renderTiles(g) {
    for (let y = 0; y < TILE_COUNT; y++) {
      for (let x = 0; x < TILE_COUNT; x++) {
        // TileManager.getTiles()[this.tiles[y][x]].render(g, x * TILE_SIZE, y * TILE_SIZE);
        TileManager.getTiles()[this.rooms[this.room][y][x]].render(g, x * TILE_SIZE, y * TILE_SIZE);
      }
    }
  }

  tickTiles(g) {
    for (let y = 0; y < TILE_COUNT; y++) {
      for (let x = 0; x < TILE_COUNT; x++) {
        TileManager.getTiles()[this.rooms[this.room][y][x]].tick();
      }
    }
  }

  getTile(x, y) {
    try {
      return TileManager.getTiles()[this.tiles[x][y]];
    }
    catch(e) {
    }
  }

  getEntityManager() {
    return this.entityManager;
  }

  getSpatialGrid() {
    return this.spatialGrid;
  }
}
