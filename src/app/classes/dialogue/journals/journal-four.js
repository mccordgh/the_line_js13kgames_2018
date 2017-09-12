import { JournalParent } from "./journal-parent";

export class JournalFour extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
	}

	myText() {
		return [
      'I\'m exhausted..',
      '..I need.. to...',
      '@dont WoRRy We\'LL TaKe CaRe oF you@',
      '..find... the exit..',
      '@Let mE iN@',
      '...',
      '+Excellent results, comparatively.+',
		];
	}
}
