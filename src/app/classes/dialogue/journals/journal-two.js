import { JournalParent } from "./journal-parent";

export class JournalTwo extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Entry 11';
	}

	myText() {
		return [
      'I\'ve stayed alive longer than anyone else.',
      'The strange beings down here are poisoning my mind.',
      'They are slow; The rotating walls cut them off.',
      'I am feeling migraines and hearing an eerie voice.',
      'These creatures seem familiar.',
		];
	}
}
