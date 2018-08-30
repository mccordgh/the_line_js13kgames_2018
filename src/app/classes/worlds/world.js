import { EntityManager } from '../entities/entity-manager';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
import { Guard } from '../entities/creatures/monsters/guard';

import generateRooms from './generate-rooms';

export class World {
  constructor(handler) {
    this.handler = handler;
    this.entityManager = new EntityManager(handler, new Player(handler, 2, 2));
    this.spatialGrid = new SpatialGrid(GAME_SIZE, GAME_SIZE, TILE_SIZE);

    this.start = rndIndex([5,6,9,10]);
    this.rooms = generateRooms(handler, this.start);
    // console.log(this.rooms,);
    // console.log(this.start);
    this.room = this.rooms[this.start];

    handler.setWorld(this);
    this.loadWorld();
  }

  // generateRooms() {
  //   let rooms = {
  //     0: new Room(0, [noTop, noLeft]),
  //     1: new Room(1,[noTop]),
  //     2: new Room(2,[noTop]),
  //     3: new Room(3,[noTop, noRight]),
  //     4: new Room(4,[noLeft]),
  //     5: new Room(5),
  //     6: new Room(6),
  //     7: new Room(7,[noRight]),
  //     8: new Room(8,[noLeft]),
  //     9: new Room(9,),
  //     10: new Room(10),
  //     11: new Room(11,[noRight]),
  //     12: new Room(12,[noBottom, noLeft]),
  //     13: new Room(13,[noBottom]),
  //     14: new Room(14,[noBottom]),
  //     15: new Room(15,[noRight, noBottom]),
  //   };

  //   rooms[this.start] = new Room(this.start)
  // }

  tick(dt) {
    this.room.tick();
    // this.tickTiles();
    this.entityManager.tick(dt);
  }

  render(g) {
    if (!this.changeRoom) {
      this.room.render(g);
      // this.renderTiles(g);
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
    // dir will be: 1 = north, 2 = east, 3 = south, 4 = west
    this.changeRoom = true;
    let prevRoom = this.room;
    this.room = this.rooms[this.room.id + dir.mod];
    console.log('entered Room: ', this.room.id);
    this.setPlayerSpawn(dir);
    this.loadWorld(prevRoom);
    this.changeRoom = false;
  }

  loadWorld(prevRoom = null) {
    this.spatialGrid.reset();
    this.entityManager.newRoom(prevRoom, this.room);
    console.log(this.rooms)

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
  }

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

  // renderTiles(g) {
  //   for (let y = 0; y < TILE_COUNT; y++) {
  //     for (let x = 0; x < TILE_COUNT; x++) {
  //       // TileManager.getTiles()[this.tiles[y][x]].render(g, x * TILE_SIZE, y * TILE_SIZE);
  //       // console.log('room', this.rooms);
  //       try {
  //         TileManager.getTiles()[this.room.tiles()[y][x]].render(g, x * TILE_SIZE, y * TILE_SIZE);
  //       } catch(e) {

  //       }
  //     }
  //   }
  // }

  // tickTiles(g) {
  //   for (let y = 0; y < TILE_COUNT; y++) {
  //     for (let x = 0; x < TILE_COUNT; x++) {

  //       // try {
  //         TileManager.getTiles()[this.room.tiles()[y][x]].tick();
  //       // } catch(e) {
  //         // console.log('tiles', TileManager.getTiles());
  //         // console.log(this.room, this.rooms, x, y);
  //         // console.log("TileManager.getTiles()[this.rooms[this.room][y][x]]");
  //         // console.log(TileManager.getTiles()[this.rooms[this.room][y][x]]);
  //         // debugger;
  //         // console.log('ERROR room', this.room, this.rooms[this.room], y, x);
  //       // }
  //     }
  //   }
  // }

  getTile(x, y) {
    try {
      return TileManager.getTiles()[this.room.tiles()[y][x]];
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
