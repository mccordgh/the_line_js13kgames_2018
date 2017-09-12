import { JournalParent } from "./journal-parent";

export class JournalOne extends JournalParent {
  constructor() {
    super();
    this.setText(this.myText());
  }

  myText() {
    return [
      'It looks like I survived the fall.',
      'What is this strange fog, and this smell of decay?',
      '....It\'s giving me migraines.',
      'And these walls that move... gotta take care not to get crushed.',
      'I must escape.',
      '+How optimistic.+'
    ];
  }
}
