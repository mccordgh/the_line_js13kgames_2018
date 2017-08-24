export class State {
  constructor(_handler){
    this.currentState = null;
    this.handler = _handler;
  }

  tick(_dt) {
    throw("Every state needs a tick");
  }

  render(_g) {
    throw("Every state needs a render");
  }

  getState() {
    return this.currentState;
  }

  setState(_state) {
    this.currentState = _state;
  }
}
