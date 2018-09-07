import { EntityManager } from '../entities/entity-manager';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';

import generateRooms from './generate-rooms';
import { Exit } from '../entities/statics/exit';

let rectSize = 0, whiteFade = -1, didEnd = false, boomer = false;
// let rectSize = 0, whiteFade = 1, didEnd = false, boomer = false;

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
    this.sm = this.handler.getSoundManager();

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
        ANIMATION_TIMER.keyAdded();
        ANIMATION_TIMER.speed = 460;

        if (!didEnd) {
          this.createFinalExit();

          let worker = this.entityManager.findEntitiesByType('w')[0];
          let text = [
            'Worker: Such a loud explosion!',
            'Sounds like the exit to the outside is open!',
            'Let\'s get out of this place!'
          ];

          this.entityManager.addSpeech(worker, text);
        }

        return;
      }

      if (!boomer) {
        this.sm.play('boom');
        boomer = true;
      }

      whiteFade += .006;

      g.shakeScreen();

      g.fillStyle = 'white';
      g.globalAlpha = whiteFade > 0 ? whiteFade : 0;
      g.fillRect(0, 0, GAME_SIZE, GAME_SIZE);

      g.globalAlpha = 1;
    }
  }

  startAgain() {
    let p = this.entityManager.getPlayer();
    this.playerDied = false;
    this.machineFilled = false;
    p.setBox();
    // console.log(p.item);
    if (p.item.type) {
      // console.log('move back', this.room);
      this.room.removeEntity(p.item);
      p.item.target = null;
      this.rooms[p.item.start.room].addEntity(p.item);
      p.item.x = p.item.start.x;
      p.item.y = p.item.start.y;
      p.item = null;
      // console.log(p.item);
    }
    // this.room = this.rooms[this.start];
    // this.sm = this.handler.getSoundManager();
    this.changeRooms(null, this.start, true);
    // this.handler.setWorld(this);
    this.loadWorld();
    p.state = 1 // moving
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

  changeRooms(dir, roomNum = null, respawn = false) {
    // dir will be: 1 = north, 2 = east, 3 = south, 4 = west
    this.changeRoom = true;
    let prevRoom = this.room;
    this.room = roomNum ? this.rooms[roomNum] : this.rooms[this.room.id + dir.mod];
    if (dir) this.setPlayerSpawn(dir);
    this.loadWorld(prevRoom, respawn);
    this.changeRoom = false;
  }

  loadWorld(prevRoom = null, respawn = false) {
    this.spatialGrid.reset();
    this.entityManager.newRoom(prevRoom, this.room, respawn);
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
