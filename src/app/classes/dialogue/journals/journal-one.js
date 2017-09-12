import { JournalParent } from "./journal-parent";

export class JournalOne extends JournalParent {
  constructor() {
    super();
    this.setText(this.mT());
  }

  mT() {
    return [
      'I survived the fall...',
      'What is this strange fog and smell of decay?',
      '....It\'s giving me migraines.',
      'These walls that move... must take care not to get crushed.',
      'I must escape.',
      '+How optimistic. He\'ll go mad in minutes.+'
    ];
  }
}
