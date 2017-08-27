export class Handler {
  constructor(_game) {
    this.game = _game;
    this.console = document.getElementById('console');
    this.devMessage(' dev cheats initialized \n' +
      ' c - clipping \n' +
      ' i - invincibility \n' +
      ' x - super speed '
    );
  }

  devMessage(msg) {
    const styles = [
      'background: linear-gradient(#ffffff, #ff00ff)'
      , 'border: 1px solid #3E0E02'
      , 'color: black'
      , 'display: block'
      // , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
      // , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
      , 'line-height: 40px'
      , 'text-align: center'
      , 'font-size: 18px'
      , 'font-weight: bold'
    ].join(';');

    console.log(`%c${msg}`, styles);
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
