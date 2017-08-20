export class Handler {
  constructor(_game) {
    this.game = _game;
  }

  getWidth() {
    return this.game.getWidth();
  }

  getHeight() {
    return this.game.getHeight();
  }

  getKeyManager() {
    return this.game.getKeyManager();
  }

  getGameCamera() {
    return this.game.getGameCamera();
  }

  getWorld() {
    return this.world;
  }

  setWorld(_world) {
    this.world = _world;
  }

  getGame() {
    return this.game;
  }

  // getSoundManager(){
  //   return soundManager;
  // },
  // setSoundManager(_sm){
  //   soundManager = _sm;
  // }
}
