import { JournalParent } from "./journal-parent";

export class JournalTwo extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Entry 2';
	}

	myText() {
		return [
      'It seems like this place gets larger with each floor I descend. Am I in a pyramid?',
      'I am feeling migraines and hearing an eerie voice.',
      'These creatures seem somehow familiar.',
      '(At the bottom of the page you see these words written in @blood@.)',
      '@... ~HeHe. VeRy GooD!~@',
		];
	}
}
