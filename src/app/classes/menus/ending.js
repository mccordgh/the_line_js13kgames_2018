import { Menu } from './menu';

export class Ending extends Menu {
  constructor(handler){
    super(handler);
    this.handler.getWorld().dialogue.addWords([
      '+Results are inconclusive. Further tests are needed.+',
      '+Seems I need to create more subjects.+',
      '+Let\'s put this one with the other failures for now.+',
      '....',
      '@WELCOME HoMe BRoTHeR@',
      '@you aRe oNe oF uS NoW@',
      '@...FoReVeR...@'
    ]);
  }

  render(g) {
    super.draw(g, [
        'ahhh FiNaLLy ouT',
        'Oh my, our best one yet..',
        '',
        '              ...',
      ]
    );
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      window.location.reload();
    }
  }
}
