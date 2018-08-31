import { CPlayer } from './player-small';

let sounds = {};

export class SoundManager {
  constructor() {
    this.init();
  }

  init() {
    var steamHigh={songData:[{i:[2,40,140,1,0,0,140,0,0,255,5,0,48,0,0,0,0,0,0,2,161,192,0,32,0,0,71,1],p:[1],c:[{n:[164],f:[]}]}],rowLen:5513,patternLen:32,endPattern:0,numChannels:1};
    var steamLow={songData:[{i:[2,40,140,1,0,0,140,0,0,255,5,0,48,0,0,0,0,0,0,3,17,48,0,32,0,11,71,1],p:[1],c:[{n:[140],f:[]}]}],rowLen:5513,patternLen:32,endPattern:0,numChannels:1};

    sounds = {
    //   bg: this.create(.3, 'bg', true, {songData:[{i:[3,59,140,0,1,60,128,3,0,29,92,28,95,0,0,3,96,2,1,2,124,135,11,25,130,4,97,2],p:[1],c:[{n:[112,,,,114,,,,117,,,,114,,,,112,,,,114,,,,117,,,,114,,,,141,,,,,,,,,,,,,,,,138],f:[]}]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]}],rowLen:22050,patternLen:32,endPattern:2}),
      steam: this.create(.8, 'steam', false, steamLow),
      steam2: this.create(.5, 'steam2', false, steamHigh)
    //   txt: this.create(.3, 'txt', false, {songData:[{i:[1,59,128,0,1,55,116,9,0,0,0,12,13,0,0,0,69,3,1,3,55,0,0,32,77,6,0,0],p:[1],c:[{n:[125],f:[]}]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]}],rowLen:22050,patternLen:32,endPattern:2}),
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
      console.log(0);
    // Initialize music generation (player).
    let player = new CPlayer();
    player.init(obj);

    // Generate music...
    let done = false;

    console.log(1)
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
        // if (loops) {
        //   audio.loop = true;
        //   audio.play();
        // }

        sounds[name] = audio;
        clearInterval(inter);
      }
    }, 0, name, vol);
  }
}
