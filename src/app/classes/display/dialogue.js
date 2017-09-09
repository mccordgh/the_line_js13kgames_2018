const dialogue = document.getElementById('dialogue');

let speechTimer = 5;
let sentencePause = 0;

export class Dialogue {

	constructor() {
		this.init();
		this.words = [];
	}

	init() {
		//
	}

	tick() {
		if (speechTimer >= 8) {
			if (this.words.length) {
				if (this.words[0].length) {
					dialogue.innerHTML += this.words[0][0];
					this.words[0].splice(0, 1);
					speechTimer = 0;
				} else {
					if (sentencePause >= 90) {
						this.words.splice(0, 1);
						dialogue.innerHTML = '';
						sentencePause = 0;
					} else {
						sentencePause++;
					}
				}
			}
		}

		if (speechTimer < 30) speechTimer++;
	}

	addWords(words) {
		this.words.push(words.split(''));
		console.log({theseWords: this.words});
	}

}