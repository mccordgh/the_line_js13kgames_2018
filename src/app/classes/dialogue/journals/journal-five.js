import { JournalParent } from "./journal-parent";

export class JournalFive extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Journal #005';
	}

	myText() {
		return [
			'(&This page is covered in sweat and droplets of @blood@&)',
			'I got a better look at the creatures today.',
			'The strange part is that they all look the same. They all have the same face. %@~WiTH THiS GRoSS SMiLe.~@',
			'It gets creepier. I got a good look at their faces this time in the light.',
			'They all look like the $old man$. &EXACTLY& like him...',
			'@~eVeRy.~',
			'~SiNGLe.~',
			'~oNe.~@',
		];
	}
}
