let c = 0, machine = null;

export class AnimationTimer {
  constructor() {
    this.frames = 2;
    this.index = 0;
    this.lastTime = Date.now();
    this.timer = 0;
    this.speed = 230;
    this.keys = 0;
    this.stop = false;
    this.beats = {
      //sounds on the 1 beat
      2: [
      ],
      4: [
        { name: 'steamLow', condition(k) { return k >= 0 }},
        { name: 'bassC', condition(k) { return k >= 1 }},
      ],
      6: [
        { name: 'arpFsG', condition(k) { return k >= 3 }},
      ],
      //sounds on the 2 beat
      8: [
        // { name: 'arpFsG', condition(k) { return k == 3 }},
        { name: 'bassDs', condition(k) { return k >= 2 }},
      ],
      10: [
        { name: 'arpAsC', condition(k) { return k >= 3 }},
      ],
      //sounds on the 3 beat
      12: [
        { name: 'steamHigh', condition(k) { return k >= 0}},
        { name: 'bassDs', condition(k) { return k == 1}},
        { name: 'bassF', condition(k) { return k >= 2 }},
      ],
      14: [
      ],
      //sounds on the 4 beat
      16: [
        { name: 'bassFs', condition(k) { return k >= 2 }},
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
  }

  tick() {
    if (!this.stop) {
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
  }

  stopMe() {
    this.stop = true;
  }

  factoryNoise() {
    c++;

    if (this.index % 2 != 0) this.playAll(this.beats[c]);
    if (c == 16) c = 0;
  }

  playAll(s){
    let sm = this.sounds;
    let k = this.keys;

    if (k >= 4) return;

    for (let i = 0; i < s.length; i++) {
      if (s[i].condition(k)) {
        sm.load(s[i].name);
        sm.play(s[i].name);
      }
    }
  }

  keyAdded() {
    this.keys++;
    this.speed -= 30;
  }
}
