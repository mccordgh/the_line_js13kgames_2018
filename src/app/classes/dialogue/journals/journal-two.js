import { JournalParent } from "./journal-parent";

export class JournalTwo extends JournalParent {
	constructor() {
		super();
		this.setText(this.mT());
	}

	mT() {
		return [
      'What are these gross things?',
      'It looks like they are rotting. Best stay away.',
      '...Argh. My head... It\'s like someone banging on a door.',
      '@you HaVeNT SeeN aNyTHiNG yeT@',
      'Who said that?! Where???',
      '+It has begun.+',
		];
	}
}
