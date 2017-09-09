export class State {
  constructor(handler){
    this.currentState = null;
    this.handler = handler;
  }

  tick(dt) {
    throw("Every state needs a tick");
  }

  render(g) {
    throw("Every state needs a render");
  }

  getState() {
    return this.currentState;
  }

  setState(state) {
    this.currentState = state;
  }
}
