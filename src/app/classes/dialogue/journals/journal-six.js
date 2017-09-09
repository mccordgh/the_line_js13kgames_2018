import { JournalParent } from "./journal-parent";

export class JournalSix extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'JournaL 0o0o06';
	}

	myText() {
		return [
			'To whomever...@~you~@ has made it this far, the $old man$ on this floor has passed away.%@~He iS DeaD you KNoW.~@',
			'I fear no help is available to you.%@~you aRe aLoNe!~@%I barely made it back here on my own.%@~you WeRe NeVeR aLONE~@',
			// 'The additional torches cannot be lit. I cannot find the gate key. ~oR THeRe iS NoNe.~',
			'I did find an eerie discovery while searching the old man. It seems he bares the same small branding upon his neck as I do.',
			'I cannot see what mine says, but I believe his to be the letter $C$ followed by a $5 digit number$.%@~you KNoW WHaT THiS MeaNS.~@',
			'The headaches rarely stop now.%@~aND SooN NeVeR WiLL.~@',
		];
	}
}
