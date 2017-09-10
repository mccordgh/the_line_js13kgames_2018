import { Menu } from './menu';

export class Ending extends Menu {
  constructor(handler){
    super(handler);
    this.handler.getWorld().dialogue.addWords('?????', 'I knew this one was special.');
    this.handler.getWorld().dialogue.addWords('?????', 'My own @flesh@ and @blood@.');
    this.handler.getWorld().dialogue.addWords('?????', 'Come to me, son.');
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
