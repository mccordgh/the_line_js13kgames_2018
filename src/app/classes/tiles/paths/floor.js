import { Tile } from '../tile';

export class Floor extends Tile {
  constructor(id) {
    super(id);
  }

//   render() {}
  render(g, x, y) {
    g.fillStyle = 'grey';
    g.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  }
}
