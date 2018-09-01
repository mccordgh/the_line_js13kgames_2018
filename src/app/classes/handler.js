let sm;

export class Handler {
  constructor(game) {
    this.game = game;
    this.machine = null;
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

  // getGameCamera() {
  //   return this.game.getGameCamera();
  // }

  getMachine() {
    return this.machine;
  }

  getWorld() {
    return this.world;
  }

  setWorld(world) {
    this.world = world;
  }

  getGame() {
    return this.game;
  }

  getSoundManager(){
    return sm;
  }

  setSoundManager(s) {
    sm = s;
  }
}
