const keys = [];

export class KeyManager {
  tick() {
    this.up = keys[38];
    this.down = keys[40];
    this.left = keys[37];
    this.right = keys[39];
    this.one = keys[49];
    this.two = keys[50];
    this.three = keys[51];
    this.four = keys[52];
    this.a = keys[65];
    this.w = keys[87];
    this.s = keys[83];
    this.d = keys[68];
    this.z = keys[90];
    this.q = keys[81];
    // this.c = keys[67];
    // this.i = keys[73];
    // this.x = keys[88];
    this.enter = keys[13];
  }
}

window.onkeydown = function(e){
  // console.log(e.keyCode);
  keys[e.keyCode] = true;
};

window.onkeyup = function(e){
  keys[e.keyCode] = false;
};
