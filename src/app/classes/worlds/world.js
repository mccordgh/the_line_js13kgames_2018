import { TileManager } from '../tiles/tile-manager';

export class World {
  constructor(handler) {
    this.tiles = [];
    this.handler = handler;
    handler.setWorld(this);
    this.loadWorld();
  }

  loadWorld() {
    let pieces = this.fillWorld();
    console.log(pieces);
    for (let y = 0; y < TILE_COUNT; y++) {
      for (let x = 0; x < TILE_COUNT; x++) {
        if (!this.tiles[x]) this.tiles[x] = [];
        this.tiles[x][y] = pieces[x][y];
      }
    }
    console.log(this.tiles);
  }

  fillWorld() {
    return [
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
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    ];
  }

  tick(dt) {

  }

  render(g) {
    this.renderTiles(g);
  }

  renderTiles(g) {
    for (let y = 0; y < TILE_COUNT; y++) {
      for (let x = 0; x < TILE_COUNT; x++) {
        TileManager.getTiles()[this.tiles[y][x]].render(g, x * TILE_SIZE, y * TILE_SIZE);
      }
    }
  }
}
