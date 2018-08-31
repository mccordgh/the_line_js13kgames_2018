import { Menu } from './menu';

export class GameOver extends Menu {
  constructor(handler, reason){
    super(handler);
    this.reason = reason;
  }

  render(g) {
    switch (this.reason) {
      case 'dead':
        super.draw(g, [
          'Y O U   D I E D',
          'Try again [press enter]',
          ]
        );
        break;
      case 'machine':
        super.draw(g, [
          'You activated the machine!',
          'Now everyone can escape!',
          'T H E   E N D',
          'Escape again [press enter]',
          ]
        );
        break;
    }
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      window.location.reload();
    }
  }
}
