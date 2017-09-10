import { JournalParent } from "./journal-parent";

export class JournalOne extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Entry 1';
	}

	myText() {
		return [
			'I\'ve stayed alive longer than anyone else. Even with this broken leg.',
			'The grotesque beings down here will poison your mind.',
      'They are slow. The rotating walls help cut them off...',
		];
	}
}
