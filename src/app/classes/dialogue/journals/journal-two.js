import { JournalParent } from "./journal-parent";

export class JournalTwo extends JournalParent {
	constructor() {
		super();
		this.setText(this.myText());
		this.name = 'Journal #002';
	}

	myText() {
		return [
			'This place seems dark and unending. I feel as though I am peering into the abyss at every turn..',
			'I\'m not sure how much farther down it goes... I hope I\'ll see it to the end.',
			'I have to hope, because the only thing left for me is fear and this damned broken tibia.',
			'One odd thing; I have encountered an $old man$ in some of the darkest corners of the maze.',
			'There is something about him, that is oddly calming. It makes me feel as though I can push on a little longer.',
			'He never speaks, and those... things never bother him. I wonder why?',
		];
	}
}