import { JournalParent } from "./journal-parent";

export class JournalThree extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Entry oo3';
	}

	myText() {
		return [
      'These creatures all have the same face.',
      '@~ALLLL~',
      'No help will come.',
      '@~aLoNe!~@',
      'These headaches are relentless.',
      '@~%#**%*!%%!!~~@',
		];
	}
}
