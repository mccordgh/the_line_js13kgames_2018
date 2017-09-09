import { JournalParent } from "./journal-parent";

export class JournalThree extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Journal #003';
	}

	myText() {
		return [
			'It seems like this place gets larger with each floor I descend. Am I in a pyramid?',
			'The gurgling noises come and go, but a foul stench is always present.',
			// 'I saw a red one of those.... things today. It moved quicker than the others. It also almost looked... human.',
			'I am feeling migraines from time to time, and hearing an eerie voice constantly calling out to me from within. Like it wants to escape.',
			'I think the silence and darkness are getting the better of me. The $bleeding$ won\'t stop. I am... afraid.',
		];
	}
}
