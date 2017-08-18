let game, world;//, leaderBoards = [], soundManager;

export class Handler {
  constructor(_game) {
    game = _game;
  }

  getWidth() {
    return game.getWidth();
  }

  getHeight() {
    return game.getHeight();
  }

  getKeyManager() {
    return game.getKeyManager();
  }

  // getGameCamera: function() {
  //   return game.getGameCamera();
  // }

  getWorld() {
    return world;
  }

  setWorld(_world) {
    world = _world;
  }

  getGame() {
    return game;
  }

  // getSoundManager(){
  //   return soundManager;
  // },
  // setSoundManager(_sm){
  //   soundManager = _sm;
  // }
}
