import { TileManager } from '../tiles/tile-manager';

export class Room {
  constructor(id, traits = [], entities = [], tileSize = TILE_SIZE, tileCount = TILE_COUNT) {
    this.id = id;
    this.tileSet = [];
    this.items = [];
    this.traits = traits;
    this.entities = entities;
    this.tileSize = tileSize;
    this.tileCount = tileCount
    this.init();
    this.apply(traits);
  }

  addEntity(e) {
      this.entities.push(e);
  }

  removeEntity(e) {
    let index = this.entities.indexOf(e);

    this.entities.splice(index, 1);
  }

  init() {
      this.tileSet = [
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1]
      ];
  }

  apply(traits = []) {
    for (let i = 0; i < traits.length; i++) {
        this.tileSet = traits[i](this.tileSet);
    }
  }

  tiles() {
      return this.tileSet;
  }

  tick() {}

  render(g) {
    let count = this.tileCount, size = this.tileSize;
    for (let y = 0; y < count; y++) {
      for (let x = 0; x < count; x++) {
          TileManager.getTiles()[this.tileSet[y][x]].render(g, x * size, y * size, size);
      }
    }
  }
}
