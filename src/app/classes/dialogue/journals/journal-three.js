import { JournalParent } from "./journal-parent";

export class JournalThree extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Journal #003';
	}

	myText() {
		return [
      '(This page is covered in sweat and droplets of @blood@)',
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
