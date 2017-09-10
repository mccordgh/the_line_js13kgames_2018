import { Display } from './display/display';
import { GameState } from './states/game-state';
import { GameCamera } from './gfx/game-camera';
import { Handler } from './handler';
import { KeyManager } from './input/key-manager';
import { MainMenu } from './menus/main-menu';
import { State } from './states/state';
import { SoundManager } from './sounds/sound-manager';

let running = false;
let g, display, keyManager, handler, gameCamera, soundManager;
let state, gameState, mainMenu;

export class Game {
  constructor(title, width, height){
    this.height = height;
    this.title = title;
    this.width = width;
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

    let loop = () => {
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
    if (running) return;
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
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getGameCamera() {
    return gameCamera;
  }

  getGameState() {
    return state;
  }

  init() {
    handler = new Handler(this);
    display = new Display(this.title, this.width, this.height);
    keyManager = new KeyManager();
    g = display.getGraphics();
    state = new State();
    gameCamera = new GameCamera(handler, 0, 0);
    soundManager = new SoundManager();
    handler.setSM(soundManager);
    // mainMenu = new MainMenu(handler);
    // state.setState(mainMenu);
    gameState = new GameState(handler);
    state.setState(gameState);
  }

  tick(dt) {
    keyManager.tick();
    if (state.getState() && !display.paused)
      state.getState().tick(dt);
  }

  render(){
    if (state.getState() && !display.paused)
      state.getState().render(g);
  }
}
