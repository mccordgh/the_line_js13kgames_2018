import { Menu } from './menu';

export class GameOver extends Menu {
  constructor(handler, reason){
    super(handler);
    this.reason = reason;
  }

  render(g) {
    switch (this.reason) {
      // case 'dead':
      //   g.drawText('Y O U   D I E D', 100, 100);
      //   g.drawText('Try again [press enter]', 100, 200);
      //   break;
      case 'machine':
        g.drawText('Y O U W I N !!!', 100, 100);
        g.drawText('Anti-Climactic filler win screen for now :(', 100, 200);
        g.drawText('Try again? [press enter]', 100, 300);
        break;
    }
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      window.location.reload();
    }
  }
}
