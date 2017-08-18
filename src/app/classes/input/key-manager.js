const keys = [];

export class KeyManager {
  tick() {
    this.up = keys[38];
    this.down = keys[40];
    this.left = keys[37];
    this.right = keys[39];
    // this.space = keys[32];
    // this.f = keys[70];
    // this.j = keys[74];
    // this.enter = keys[13];
  }
}

window.onkeydown = function(e){
  keys[e.keyCode] = true;
};

window.onkeyup = function(e){
  keys[e.keyCode] = false;
};
