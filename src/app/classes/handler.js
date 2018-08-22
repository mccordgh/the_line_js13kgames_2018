// let sm;

export class Handler {
  constructor(game) {
    this.game = game;
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

  getWorld() {
    return this.world;
  }

  setWorld(world) {
    this.world = world;
  }

  getGame() {
    return this.game;
  }

  // getSM(){
  //   return sm;
  // }

  // setSM(s) {
  //   sm = s;
  // }
}
