import { CPlayer } from './player-small';
import steamHigh from './sfx/steamHigh';
import steamLow from './sfx/steamLow';
import bassC from './sfx/bassC';
import bassDs from './sfx/bassDs';
import bassFs from './sfx/bassFs';
import bassF from './sfx/bassF';
import placefx from './sfx/place';
import pickupfx from './sfx/pickup';
import arpFsG from './sfx/arpFsG'
import arpAsC from './sfx/arpAsC'

let sounds = {};

export class SoundManager {
  constructor() {
    this.init();
  }

  init() {
    sounds = {
      pickup: this.create(.15, 'pickup', false, pickupfx),
      place: this.create(.3, 'place', false, placefx),
      steamHigh: this.create(.2, 'steamHigh', false, steamHigh),
      steamLow: this.create(.4, 'steamLow', false, steamLow),
      bassC: this.create(.2, 'bassC', false, bassC),
      bassDs: this.create(.2, 'bassDs', false, bassDs),
      bassFs: this.create(.2, 'bassFs', false, bassFs),
      bassF: this.create(.2, 'bassF', false, bassF),
      arpFsG: this.create(.2, 'arpFsG', false, arpFsG),
      arpAsC: this.create(.2, 'arpAsC', false, arpAsC),
    }
  }

  play(s) {
    // if (sounds[s]) {
      // try {
        // sounds[s].load();
        sounds[s].play();
      // } catch (e) {
        //
      // }
    // }
  }

  load(s) {
    sounds[s].load();
  }

  create(vol, name, loops, obj) {
    // Initialize music generation (player).
    let player = new CPlayer();
    player.init(obj);

    // Generate music...
    let done = false;

    let inter = setInterval(function (name) {
      if (done) {
        return;
      }

      done = player.generate() >= 1;

      if (done) {
        // Put the generated song in an Audio element.
        let wave = player.createWave();
        let audio = document.createElement("audio");

        audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        audio.volume = vol;
        if (loops) {
          audio.loop = true;
        }

        sounds[name] = audio;
        clearInterval(inter);
      }
    }, 0, name, vol);
  }
}
