import { JournalParent } from "./journal-parent";

export class JournalTwo extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Entry 2';
	}

	myText() {
		return [
      'I am feeling migraines and hearing an eerie voice.',
      'These creatures seem familiar.',
      '(You see words written in @blood@.)',
      '@... ~HeHe. VeRy GooD!~@',
		];
	}
}
