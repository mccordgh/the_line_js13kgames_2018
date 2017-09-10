import { JournalParent } from "./journal-parent";

export class JournalOne extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Entry 1';
	}

	myText() {
		return [
			'I\'ve stayed alive longer than anyone else.',
			'The strange beings down here are poisoning my mind.',
      'They are slow; The rotating walls cut them off.',
		];
	}
}
