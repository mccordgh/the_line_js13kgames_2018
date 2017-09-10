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
			'The grotesque beings down here are poisoning my mind.',
      'But they are slow; The rotating walls help cut them off...',
		];
	}
}
