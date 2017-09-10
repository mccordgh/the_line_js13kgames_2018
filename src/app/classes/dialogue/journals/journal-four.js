import { JournalParent } from "./journal-parent";

export class JournalFour extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Journal #004';
	}

	myText() {
		return [
      '@~WoW. you MaDe iT To THe eND. WHaT a ViLe JoKe aWaiTS.~',
      '~aT THe eND oF THiS FlooR, i HaVE SeeN THE ANSweR?????~',
      '~SCuRRy oN LiTTLe RaT! you WiLL LeaRN THe TRuTH.~@',
		];
	}
}
