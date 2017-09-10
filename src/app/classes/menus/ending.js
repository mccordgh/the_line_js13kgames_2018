import { Menu } from './menu';

export class Ending extends Menu {
  constructor(handler){
    super(handler);
    this.handler.getWorld().dialogue.addWords('?????', 'I knew this one was special.');
    this.handler.getWorld().dialogue.addWords('?????', 'Made of my own flesh and bones.');
    this.handler.getWorld().dialogue.addWords('?????', 'Come to me, my son.');
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
