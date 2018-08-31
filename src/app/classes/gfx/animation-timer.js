let c = 0;

export class AnimationTimer {
  constructor() {
    this.frames = 2;
    this.index = 0;
    this.lastTime = Date.now();
    this.timer = 0;
    this.speed = 200;
    this.sounds = null;
  }

  init(handler) {
    this.sounds = handler.getSoundManager();
  }

  tick() {
    this.timer += Date.now() - this.lastTime;
    this.lastTime = Date.now();

    if (this.timer >= this.speed){
      if (this.sounds) this.factoryNoise();
      this.index++;
      this.timer = 0;
      if (this.index >= this.frames)
        this.index = 0;
    }
  }

  factoryNoise() {
    if (this.index % 2 == 0) {
      c++;
      if (c === 2) {
        this.sounds.play('steam');
      }

      if (c === 4) {
        this.sounds.play('steam2');
        c = 0;
      }
    }
  }
}
