import { JournalParent } from "./journal-parent";

export class JournalFour extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Journal #004';
	}

	myText() {
		return [
			'It has been bothering me for a while and I can\'t get past it. Those creatures, they seem somehow... familiar.',
			'I\'m not sure from when or where, but their faces are familiar to me.',
			'Another thing bothering me is that same old man on every floor. How is he traveling between the floors without passing me?',
			'I\'ll think more on this later... The voice in my head is getting louder and is more frequent.',
			'(&At the bottom of the page you see these words written in what looks to be @blood@.&)',
			'@... ~HeHe. VeRy GooD!~@',
		];
	}
}