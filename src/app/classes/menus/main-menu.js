import { GameState } from '../states/game-state';
import { Menu } from './menu';

  export class MainMenu extends Menu {
    constructor(_handler){
      super(_handler);
    }

    // tick(_dt) {
      //
    // }

    render(_g) {
      if (_g) {
        let text, xPos, yPos;

        const screenWidth = this.handler.getWidth();
        const screenHeight = this.handler.getHeight();

        _g.fillStyle = "black";
        _g.fillRect(0, 0, screenWidth, screenHeight);

        _g.drawText({
          fillColor: 'white',
          text: 'you are',
          fontSize: 32,
          font: 'serif',
          x: 90,
          y: (screenHeight / 4),
        });

        _g.drawText({
          fillColor: 'yellow',
          text: 'A L O N E',
          fontSize: 64,
          font: 'serif',
          x: 80,
          y: screenHeight / 2,
        });

        _g.drawText({
          fillColor: 'white',
          text: 'press enter',
          fontSize: 32,
          font: 'serif',
          x: 210,
          y: screenHeight / 1.4,
        });
      }
    }

    getInput(_dt) {
      if (this.handler.getKeyManager().enter) {
        const gameState = new GameState(this.handler);
        this.handler.getGame().getGameState().setState(gameState);
      }
    }

  getCredits() {
    return [
      'Programming: Matthew McCord',
      'Artwork: http://www.opengameart.org/',
      '    Player: Antifarea(PC)',
      '    Tiles: Chris Hamons / Medicine Storm',
      '    Tiles: Buch / Keith Karnage',
      '    Music: OveMelaa',
      '    Sound FX: artisticdude / OveMelaa',
      '    Castle: Alucard',
      'Thanks: Jamie Nichols // JS game engine',
      '                         Youtube tutorial'
    ];
  }

  initSounds() {
    let sm = new SoundManager();
    sm.setSounds();
    handlerRef.setSoundManager(sm);
    soundsLoaded = true;
    loadingText = "up/down to select, enter or   /   button to choose";
    handlerRef.getSoundManager().play("evilLaugh");
  }

   loadSounds(){
    loadingText = "loading sounds...";
    //Load the sounds
    sounds.load([
      `${CURRENT_PATH}/res/sound/ItaloUnlimited.ogg`,
      `${CURRENT_PATH}/res/sound/explode.wav`,
      `${CURRENT_PATH}/res/sound/explode2.wav`,
      `${CURRENT_PATH}/res/sound/lvlup.ogg`,
      `${CURRENT_PATH}/res/sound/select.wav`,
      `${CURRENT_PATH}/res/sound/start.wav`,
      `${CURRENT_PATH}/res/sound/spawn.ogg`,
      `${CURRENT_PATH}/res/sound/evillaugh.ogg`,
      `${CURRENT_PATH}/res/sound/monster.wav`,
      `${CURRENT_PATH}/res/sound/sword.wav`,
    ]);
  }
}
