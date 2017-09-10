import { GameState } from '../states/game-state';
import { Menu } from './menu';
let d = 0;

export class MainMenu extends Menu {
  constructor(handler){
    super(handler);
  }

  render(g) {
    super.draw(g, [
        'You are',
        '"alone alone alone"',
        '"aloNe AloNE? ALONe!!!"',
        'to live again [press enter]',
      ]
    );

    if (d < 300) d++;

    if (g && d === 300) {
      d++;
      this.handler.getGame().d.addWords('', 'Me, Myself, and I, and i...');
    }
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      let gameState = new GameState(this.handler);
      this.handler.getGame().getGameState().setState(gameState);
    }
  }
}
