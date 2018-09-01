let c = 0, machine = null;

export class AnimationTimer {
  constructor() {
    this.frames = 2;
    this.index = 0;
    this.lastTime = Date.now();
    this.timer = 0;
    this.speed = 250;
    this.beats = {
      //sounds on the 1 beat
      2: [
        { name: 'steam2', loaded: false },
      ],
      //sounds on the 2 beat
      4: [],
      //sounds on the 3 beat
      6: [
        { name: 'steam1', loaded: false },
      ],
      //sounds on the 4 beat
      8: [],
    }
    // this.soundsOnTwo = [
    //   { name: 'steam2', loaded: false },
    // ];
    // this.soundsOnFour = [
    //   { name: 'steam1', loaded: false },
    // ];
  }

  init(handler) {
    this.sounds = handler.getSoundManager();
    console.log('init', this.sounds);
  }

  tick() {
    if (machine) {
      machine = this.handler.getMachine();
    }

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
    c++;

    if (this.index % 2 != 0) this.playAll(this.beats[c], this.sounds);

    if (c == 8) c = 0;
  }

  playAll(s){
    let sm = this.sounds;

    for (let i = 0; i < s.length; i++) {
      sm.load(s[i].name);
      sm.play(s[i].name);
    }
  }
}
