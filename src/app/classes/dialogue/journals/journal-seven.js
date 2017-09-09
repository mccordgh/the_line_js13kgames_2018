import { JournalParent } from "./journal-parent";

export class JournalSeven extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'HeHe! My eNTRy';
	}

	myText() {
		return [
			'@~WoW. you Too HaVe MaDe iT To THe eND. WHaT a ViLe JoKe aWaiTS.~',
			'~HoW PiTiFuL i MuST HaVe SeeMeD, THiNKiNG i PuLLeD THe WooL oVeR HiS eyeS.~',
			'~aT THe eND oF THiS FlooR, i HAVE SEEN THE ANSWER. SooN you WiLL Too. SHaLL you GueSS WHaT i SaW?~',
			'~you WouLDN\'T BeLieVe Me eVeN iF i ToLD you.~',
			'~SCuRRy oN LiTTLe RaT! you SooN Too WiLL LeaRN THe TRuTH.~@',
		];
	}
}
