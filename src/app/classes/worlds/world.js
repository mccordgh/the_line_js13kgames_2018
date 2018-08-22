import { EntityManager } from '../entities/entity-manager';
import { Player } from '../entities/creatures/player';
import { TileManager } from '../tiles/tile-manager';

export class World {
  constructor(handler) {
    this.tiles = [];
    this.handler = handler;
    this.entityManager = new EntityManager(handler, new Player(handler, 6, 6));
    handler.setWorld(this);
    this.loadWorld();
  }

  tick(dt) {
    this.entityManager.tick(dt);
  }

  render(g) {
    this.renderTiles(g);
    this.entityManager.render(g);
  }

  loadWorld() {
    let pieces = this.fillWorld();

    for (let y = 0; y < TILE_COUNT; y++) {
      for (let x = 0; x < TILE_COUNT; x++) {
        if (!this.tiles[x]) this.tiles[x] = [];
        this.tiles[x][y] = pieces[x][y];
      }
    }
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

  renderTiles(g) {
    for (let y = 0; y < TILE_COUNT; y++) {
      for (let x = 0; x < TILE_COUNT; x++) {
        TileManager.getTiles()[this.tiles[y][x]].render(g, x * TILE_SIZE, y * TILE_SIZE);
      }
    }
  }
}
