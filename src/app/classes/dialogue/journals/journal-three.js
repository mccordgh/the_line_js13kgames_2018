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
      '@~eVeRy.~',
      '~SiNGLe.~',
      '~oNe.~@',
      'I fear no help will come.',
      '@~you aRe aLoNe!~@',
      'These headaches are relentless.',
      '~@%#**%*!%%!!!~~@',
		];
	}
}
