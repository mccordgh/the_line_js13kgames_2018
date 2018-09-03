import { TileManager } from '../tiles/tile-manager';

export class Room {
  constructor(id, traits = [], entities = [], tileSize = TILE_SIZE, tileCount = TILE_COUNT, initObj = {p: 0, w: 1}) {
    this.id = id;
    this.tileSet = [];
    this.items = [];
    this.traits = traits;
    this.entities = entities;
    this.tileSize = tileSize;
    this.tileCount = tileCount
    this.text = null;
    this.init(initObj);
    this.apply(traits);
  }

  addEntity(e) {
      this.entities.push(e);
  }

  removeEntity(e) {
    let index = this.entities.indexOf(e);

    this.entities.splice(index, 1);
  }

  init(obj) {
      let p = obj.p, w = obj.w;

      this.tileSet = [
        [w, w, w, w, w, p, p, w, w, w, w, w],
        [w, p, p, p, p, p, p, p, p, p, p, w],
        [w, p, p, p, p, p, p, p, p, p, p, w],
        [w, p, p, p, p, p, p, p, p, p, p, w],
        [w, p, p, p, p, p, p, p, p, p, p, w],
        [p, p, p, p, p, p, p, p, p, p, p, p],
        [p, p, p, p, p, p, p, p, p, p, p, p],
        [w, p, p, p, p, p, p, p, p, p, p, w],
        [w, p, p, p, p, p, p, p, p, p, p, w],
        [w, p, p, p, p, p, p, p, p, p, p, w],
        [w, p, p, p, p, p, p, p, p, p, p, w],
        [w, w, w, w, w, p, p, w, w, w, w, w]
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

    if (this.text) {
      g.fillStyle = 'white';
      g.fillRect(220, 80, 340, 100);

      g.fillStyle = 'black';
      g.fillRect(230, 90, 320, 80);

      g.drawText(this.text, 240, 150, 'white', '64');
    }
  }
}
