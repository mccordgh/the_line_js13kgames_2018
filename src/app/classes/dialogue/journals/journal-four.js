import { JournalParent } from "./journal-parent";

export class JournalFour extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = '~HEheHeh~';
	}

	myText() {
		return [
      '@~WoW. you MaDe iT. WHaT a ViLe JoKe aWaiTS.~',
      '~i HaVE SeeN THE ANSweR!??!?~',
      '~SCuRRy oN LiTTLe RaT anD LeaRN THe TRuTH.~@',
		];
	}
}
