import { CPlayer } from './player-small';
import outrunfx from './sfx/outrun.js';
import placefx from './sfx/place.js';
import pickupfx from './sfx/pickup.js';

let sounds = {};

export class SoundManager {
  constructor() {
    this.init();
  }

  init() {
    sounds = {
      pickup: this.create(.5, 'pickup', false, pickupfx),
      place: this.create(.55, 'place', false, placefx),
      bg: this.create(.5, 'bg', true, outrunfx)
    }
  }

  play(s) {
    if (sounds[s]) {
      try {
        sounds[s].load();
        sounds[s].play();
      } catch (e) {
        //
      }
    }
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
