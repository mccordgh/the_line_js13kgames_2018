// import { GameState } from '../states/game-state';
// import { Menu } from './menu';

// export class MainMenu extends Menu {
//   constructor(handler){
//     super(handler);
//   }

//   render(g) {
//     super.draw(g, [
//         'Me, Myself, and i:',
//         'Movement:',
//         'WASD, ZQSD, Arrows',
//         '[Press enter to start.]',
//       ],
//     );
//   }

//   getInput() {
//     if (this.handler.getKeyManager().enter) {
//       let gameState = new GameState(this.handler);
//       this.handler.getGame().getGameState().setState(gameState);
//     }
//   }
// }
