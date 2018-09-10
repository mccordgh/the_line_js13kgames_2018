let keys = [];

export class KeyManager {
  tick() {
    // this.up = keys[38];
    // this.down = keys[40];
    // this.left = keys[37];
    // this.right = keys[39];
    this.a = keys[65];
    this.w = keys[87];
    this.s = keys[83];
    this.d = keys[68];
    this.z = keys[90];
    this.q = keys[81];
    // this.enter = keys[13];
    // this.space = keys[32];
  }
}

window.onkeydown = (e) => {
  keys[e.keyCode] = true;
};

window.onkeyup = (e) => {
  keys[e.keyCode] = false;
};
