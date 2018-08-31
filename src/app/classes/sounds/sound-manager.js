import { CPlayer } from './player-small';
import outrun from '../../../sounds/outrun.js';

let sounds = {};

export class SoundManager {
  constructor() {
    this.init();
  }

  init() {
    // var steamHigh={songData:[{i:[2,40,140,1,0,0,140,0,0,255,5,0,48,0,0,0,0,0,0,2,161,192,0,32,0,0,71,1],p:[1],c:[{n:[164],f:[]}]}],rowLen:5513,patternLen:32,endPattern:0,numChannels:1};
    // var steamLow={songData:[{i:[2,40,140,1,0,0,140,0,0,255,5,0,48,0,0,0,0,0,0,3,17,48,0,32,0,11,71,1],p:[1],c:[{n:[140],f:[]}]}],rowLen:5513,patternLen:32,endPattern:0,numChannels:1};
    // var outrun={songData:[{i:[2,192,128,0,2,191,116,9,0,0,6,22,34,0,0,0,69,3,1,1,23,167,0,32,77,6,25,6],p:[1,1,1,1,2,2,2,2,2,2,2,2,5,5,5,5,5,5,5,5],c:[{n:[123,123,123,123,,,,,,,,,,,,,126,126,126,126],f:[]},{n:[123,123,123,123,,,,,126,,123,,121,,123,,126,126,126,126,,,,,129,,126,,131,,133],f:[]},{n:[],f:[]},{n:[],f:[]},{n:[125,125,125,125,,,,,128,,125,,123,,125,,128,128,128,128,,,,,131,,128,,133,,135],f:[]}]},{i:[2,57,116,0,2,61,128,4,0,0,0,24,25,0,0,2,0,0,1,3,145,92,14,60,0,0,0,0],p:[,,,,3,3,3,3,4,4,4,4,6,6,6,6,7,7,7,7],c:[{n:[],f:[]},{n:[],f:[]},{n:[,,,,135,138,141,142,,,,,,,,,,,,,138,141,143,144],f:[]},{n:[,,135,,138,,135,,142,,141,,138,,135,,,,138,,141,,138,,146,,145,,141,,138,,,,,147,,150,,147,,154,,153,,150,,147,,,,150,,153,,150,,158,,157,,153,,150],f:[]},{n:[],f:[]},{n:[,,137,,140,,137,,144,,143,,140,,137,,,,140,,143,,140,,148,,147,,143,,140,,,,,149,,152,,149,,156,,155,,152,,149,,,,152,,155,,152,,160,,159,,155,,152],f:[]},{n:[,,,,137,140,143,144,,,137,,135,,137,,,,,,140,143,145,146,,,140,,145,,147],f:[]}]}],rowLen:5513,patternLen:32,endPattern:19,numChannels:2};
    sounds = {
    //   steam: this.create(.8, 'steam', false, steamLow),
    //   steam2: this.create(.5, 'steam2', false, steamHigh),
      bg: this.create(.5, 'bg', true, outrun)
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
