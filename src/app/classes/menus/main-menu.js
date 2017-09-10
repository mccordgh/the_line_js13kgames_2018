import { GameState } from '../states/game-state';
import { Menu } from './menu';

export class MainMenu extends Menu {
  constructor(handler){
    super(handler);
  }

  render(g) {
    super.draw(g, [
        'You are',
        'alone alone alone',
        'aloNe AloNE ALONe',
        'press enter...',
      ]
    );
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      let gameState = new GameState(this.handler);
      this.handler.getGame().getGameState().setState(gameState);
    }
  }
}
