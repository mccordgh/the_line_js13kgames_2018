import { Menu } from './menu';

export class Ending extends Menu {
  constructor(handler){
    super(handler);
  }

  render(g) {
    super.draw(g, [
        'You escaped',
        'Our best one yet..',
        'Welcome brother, we are family...',
        'the end...',
      ]
    );
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      window.location.reload();
    }
  }
}
