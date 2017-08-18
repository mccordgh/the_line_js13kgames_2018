import { Display } from './display/display';
import { KeyManager } from './input/key-manager';
import { State } from './states/state';

//   import 'main-menu';
//  import 'handler';
//   import 'game-camera';
//   import 'sound-manager';


let running = false;
let title, width, height, g, display, keyManager, handler, gameCamera, soundManager;
let state, gameState, menuState, settingsState;
let dt;

export class Game {
  constructor(_title, _width, _height){
    this.height = _height;
    this.title = _title;
    this.width = _width;
  }

  run() {
    this.init();
    let fps = 60;
    let timePerTick = 1000 / fps;
    let delta = 0;
    let dt = 0;
    let now = Date.now();
    let lastTime = Date.now();
    let timer = 0;

    const loop = () => {
      if(running) {
        now = Date.now();
        delta = now - lastTime;
        timer += delta;
        lastTime = now;
      }

      if(timer >= timePerTick){
        dt = timer / 1000;
        this.tick(dt);
        this.render();
        timer = 0;
      }
      window.requestAnimationFrame(loop);
    };

    loop();

  }

  start() {
    if(running)return;
    running = true;
    this.run();
  }

  getKeyManager() {
    return keyManager;
  }

  getDisplay(){
    return display;
  }

  getWidth() {
    return width;
  }

  getHeight() {
    return height;
  }

  getGameCamera() {
    return gameCamera;
  }

  init() {
    // handler = new Handler(_this);
    display = new Display(this.title, this.width, this.height);
    keyManager = new KeyManager();
    g = display.getGraphics();
    state = new State();
    // gameCamera = new GameCamera(handler, 0, 0);
    // gameState = new GameState(handler);
    state.setState('pooop');
    // mainMenu = new MainMenu(handler);
    // State.setState(mainMenu);
  }

  tick(_dt) {
    keyManager.tick();
    // if (State.getState()) State.getState().tick(_dt);
  }

  render(){
    // if (State.getState()) State.getState().render(g);
  }
}
