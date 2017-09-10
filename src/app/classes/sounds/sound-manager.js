import { CPlayer } from './player-small';

export class SoundManager {
  constructor() {
    this.bgMusic =  {songData:[{i:[3,59,140,0,1,60,128,3,0,29,92,28,95,0,0,3,96,2,1,2,124,135,11,25,130,4,97,2],p:[1],c:[{n:[112,,,,114,,,,117,,,,114,,,,112,,,,114,,,,117,,,,114,,,,141,,,,,,,,,,,,,,,,138],f:[]}]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]}],rowLen:22050,patternLen:32,endPattern:2};
    this.loaded = false;
    this.lastTime = 0;
    this.logged = 0;
  }

  init() {
    // Initialize music generation (player).
    let player = new CPlayer();
    player.init(this.bgMusic);

    // Generate music...
    let done = false;
    setInterval(function () {
      if (done) {
        return;
      }

      done = player.generate() >= 1;

      if (done) {
        // Put the generated song in an Audio element.
        let wave = player.createWave();
        let audio = document.createElement("audio");

        audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        audio.volume = .3;
        audio.loop = true;
        audio.play();
      }
    }, 0);
  }
}
