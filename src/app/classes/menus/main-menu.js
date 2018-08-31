import { GameState } from '../states/game-state';
import { Menu } from './menu';

export class MainMenu extends Menu {
  constructor(handler){
    super(handler);
  }

  render(g) {
    // let s = 4 * TILE_SIZE;
    super.draw(g, ['THE LINE', 'PRESS ENTER']);

    // g.drawText('THE LINE', s, s);
  }

  getInput() {
    if(this.handler.getKeyManager().enter) {
      let gameState = new GameState(this.handler);
      this.handler.getGame().getGameState().setState(gameState);
      // this.handler.getSoundManager().play('bg');
    }
  }
}
