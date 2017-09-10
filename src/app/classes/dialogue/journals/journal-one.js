import { JournalParent } from "./journal-parent";

export class JournalOne extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Journal #001';
	}

	myText() {
		return [
			'I\'ve stayed alive longer than anyone else. Even with this broken leg.',
			'The grotesque beings down here will poison your mind, but they are slow and the rotating walls help to cut them off.',
      'This place seems dark and unending. I hope I\'ll see it to the end.',
		];
	}
}
