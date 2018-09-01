import { GameState } from '../states/game-state';
import { Menu } from './menu';
import { WorldStart } from '../worlds/world-start';

export class StartMenu extends Menu {
  constructor(handler, world = new WorldStart(handler)){
    super(handler, world);
  }

  tick(dt) {
    this.world.tick(dt);
    // this.tickTiles();
    // this.entityManager.tick(dt);
  }

  render(g) {
    this.world.render(g);
    // this.renderTiles(g);
    // this.spatialGrid.render(g);
    // this.entityManager.render(g);
  }
  // getInput() {
  //   if(this.handler.getKeyManager().enter) {
  //     let gameState = new GameState(this.handler);
  //     this.handler.getGame().getGameState().setState(gameState);
  //     // this.handler.getSoundManager().play('bg');
  //   }
  // }
}
