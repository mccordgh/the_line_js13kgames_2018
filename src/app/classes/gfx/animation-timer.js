let c = 0, machine = null;

export class AnimationTimer {
  constructor() {
    this.frames = 2;
    this.index = 0;
    this.lastTime = Date.now();
    this.timer = 0;
    this.speed = 265;
    this.keys = 0;
    this.beats = {
      //sounds on the 1 beat
      2: [],
      4: [
        { name: 'steamLow', keysReq: 0 },
        { name: 'bassC', keysReq: 1 },
        { name: 'arpFsG', keysReq: 3 },
      ],
      6: [],
      //sounds on the 2 beat
      8: [
        { name: 'bassDs', keysReq: 2 },
      ],
      10: [],
      //sounds on the 3 beat
      12: [
        { name: 'steamHigh', keysReq: 0 },
        { name: 'bassF', keysReq: 1 },
      ],
      14: [],
      //sounds on the 4 beat
      16: [
        { name: 'bassFs', keysReq: 2 },
        { name: 'arpAsC', keysReq: 3 },
      ],
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

    if (this.index % 2 != 0) {
      console.log(c);
      this.playAll(this.beats[c])};

    if (c == 16) c = 0;
  }

  playAll(s){
    console.log({beats: this.beats, s});
    let sm = this.sounds;

    for (let i = 0; i < s.length; i++) {
      if (this.keys >= s[i].keysReq) {
        sm.load(s[i].name);
        sm.play(s[i].name);
      }
    }
  }

  keyAdded() {
    this.keys++;
    this.speed -= 35;
  }
}
