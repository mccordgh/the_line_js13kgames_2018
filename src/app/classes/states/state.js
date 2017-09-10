export class State {
  constructor(handler){
    this.currentState = null;
    this.handler = handler;
  }

  getState() {
    return this.currentState;
  }

  setState(state) {
    this.currentState = state;
  }
}
