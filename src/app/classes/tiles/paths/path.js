import { Tile } from '../tile';

export class Path extends Tile {
  constructor(id) {
    super(id);
  }

  render() {}
  // render(g, x, y) {
  //   g.fillStyle = 'black';
  //   g.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  // }
}
