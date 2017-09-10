import { JournalParent } from "./journal-parent";

export class JournalThree extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Entry oo3';
	}

	myText() {
		return [
      'These creatures all have the same familiar face.',
      '@~eVeRy.~',
      '~SiNGLe.~',
      '~oNe.~@',
      'If you\'ve made it this far, I fear no help is available to you.',
      '@~you aRe aLoNe!~@',
      'These headaches are relentless.',
      '~@%#**%*!%%!!!~~@',
		];
	}
}
