import { JournalParent } from "./journal-parent";

export class JournalThree extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'EntRy o18';
	}

	myText() {
		return [
      '(You see words written in @blood@.)',
      '@... ~HeHe. VeRy GooD!~@',
      'These creatures all have the same face.',
      '@~ALLLL~@',
      'No help will come.',
      '@~aLoNe!~@',
      'These headaches are relentless.',
      '@~%#**%*!%%!!~~@',
		];
	}
}
