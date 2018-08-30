export class AnimationTimer {
  constructor() {
    this.frames = 2;
    this.index = 0;
    this.lastTime = Date.now();
    this.timer = 0;
    this.speed = 200;
  }

  tick() {
    this.timer += Date.now() - this.lastTime;
    this.lastTime = Date.now();

    if (this.timer >= this.speed){
      this.index++;
      this.timer = 0;
      if (this.index >= this.frames)
        this.index = 0;
    }
  }
}
