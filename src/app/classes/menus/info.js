import { Menu } from './menu';
import { StartMenu } from './start-menu';

let offset = 200;

export class Info {
  constructor(handler, keyManager){
    this.km = keyManager;
    this.h = handler;
  }

  tick() {
    if (this.km.space) {
      ANIMATION_TIMER.init(this.h);
      this.h.getGame().getGameState().setState(new StartMenu(this.h));
    }
  }

  render(g) {
    let i = 0;

    [
      'Wake up, sleepy head.',
      'You\'ve been under their control for a long time.',
      'You must find the four keys!',
      'Use them to take THE CORE offline!',
      '',
      'press [spacebar] to accept this mission.',
    ].forEach(t => {
      g.drawText(t, 100, 100 + (i * 90));
      i++;
    })

    g.fillStyle = 'black';
    let gA = .25;
    offset -= 2;

    for (i = 0; i < 22; i++) {
      if (i % 2) gA += .25;
      g.globalAlpha = gA;
      g.fillRect(0, i * 50 - offset, 768, 100);
    }
  }
}
