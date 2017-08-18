let currentState = null;

export class State {
  constructor(_handler){
    this.handler = _handler;
  }

  tick(_dt) {
    throw("Every state needs a tick");
  }

  render(_g) {
    throw("Every state needs a render");
  }

  getState() {
    return currentState;
  }

  setState(_state) {
    currentState = _state;
  }
}
