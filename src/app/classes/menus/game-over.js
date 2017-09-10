import { Menu } from './menu';

export class GameOver extends Menu {
  constructor(handler, reason){
    super(handler);
    this.reason = reason;
  }

  render(g) {
    super.draw(g, [
      'Y O U   D I E D',
      this.reason[0],
      this.reason[1],
      'to live again [press enter]',
      ]
    );
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      window.location.reload();
    }
  }
}
