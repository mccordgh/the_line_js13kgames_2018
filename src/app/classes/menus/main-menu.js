import { GameState } from '../states/game-state';
import { Menu } from './menu';

export class MainMenu extends Menu {
  constructor(handler){
    super(handler);
  }

  render(g) {
    if (g) {
      let screenWidth = this.handler.getWidth();
      let screenHeight = this.handler.getHeight();

      g.fillStyle = 'black';
      g.fillRect(0, 0, screenWidth, screenHeight);

      g.drawText({
        fillColor: 'white',
        text: 'you are',
        fontSize: 32,
        x: 90,
        y: (screenHeight / 4),
      });

      g.drawText({
        fillColor: 'yellow',
        text: 'A L O N E',
        fontSize: 64,
        x: 80,
        y: screenHeight / 2,
      });

      g.drawText({
        fillColor: 'white',
        text: 'press enter',
        fontSize: 32,
        x: 210,
        y: screenHeight / 1.4,
      });
    }
  }

  getInput(dt) {
    if (this.handler.getKeyManager().enter) {
      let gameState = new GameState(this.handler);
      this.handler.getGame().getGameState().setState(gameState);
    }
  }
}
