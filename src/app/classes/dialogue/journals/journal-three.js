import { JournalParent } from "./journal-parent";

export class JournalThree extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
	}

	myText() {
		return [
      'Where\'s the exit? Why was this maze even built?',
      '...Is this some kind of sick joke?',
      '@funny you Say THat@',
      'Who said that?!',
      '@i THiNK you KNoW@',
      'ARRGGGHHH! THIS POUNDING HEADACHE! IT WON\'T STOP!',
      '+He\'s progressed farther than expected.+'
		];
	}
}
