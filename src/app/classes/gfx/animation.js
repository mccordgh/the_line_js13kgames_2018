export class Animation {
  constructor(frames){
    this.frames = frames;
  }

  getCurrentFrame() {
    let a = ANIMATION_TIMER;
    return this.frames[a.index].frame;
  }

  getStillFrame(f = 0) {
    return this.frames[f].frame;
  }
}
