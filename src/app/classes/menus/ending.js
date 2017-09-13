import { Menu } from './menu';

export class Ending extends Menu {
  constructor(handler){
    super(handler);
    this.handler.getWorld().dialogue.aW([
      '+Results are inconclusive. Further tests needed.+',
      '+I must create more subjects.+',
      '+Put this one with the other failures.+',
      '...',
      '@WELCOME HoMe BRoTHeR@',
      '@you aRe oNe oF uS@',
      '@...FoReVeR...@',
      'the end...?',
      'Live again [Press Enter]',
    ]);
  }

  render(g) {
    super.draw(g, [
        'ahhh FiNaLLy ouT',
        'Oh my, our best one yet..',
        '',
        '',
      ]
    );
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      window.location.reload();
    }
  }
}
