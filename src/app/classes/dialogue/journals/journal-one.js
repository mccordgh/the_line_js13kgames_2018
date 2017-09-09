import { JournalParent } from "./journal-parent";

export class JournalOne extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Journal #001';
	}

	myText() {
		return [
			'Despite his best efforts, I\'ve stayed alive longer than anyone else...',
			'Before he sent me down into this hellhole, I was able to swipe one of his notebooks. He noticed, and broke my leg with a pipe...',
			'Beware of the grotesque beings down here. One touch from them will plague your mind.',
			'The beings are often slow, so make use of the switches and rotating walls to cut them off.',
			'For all who come after me, I hope to provide some small guidance.',
		];
	}
}
