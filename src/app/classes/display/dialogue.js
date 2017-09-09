const dialogue = document.getElementById('dialogue');
const speakerBox = document.getElementById('speaker');

let speechTimer = 5;
let sentencePause = 0;

export class Dialogue {

	constructor() {
		this.init();
		this.words = [];
		this.speakers = [];
	}

	init() {
		//
	}

	tick() {
		if (speechTimer >= 3) {
			if (this.words.length) {
				if (this.words[0].length) {
					this.speakNextLetter();
				} else {
					if (sentencePause >= 90) {
						this.resetForNextSentence();
					} else {
						sentencePause++;
					}
				}
			}
		}

		if (speechTimer < 30) speechTimer++;
	}

	resetForNextSentence() {
		this.words.splice(0, 1);
		this.speakers.splice(0, 1);
		dialogue.innerHTML = '';
		speakerBox.innerHTML = '';
		sentencePause = 0;
	}

	speakNextLetter() {
		speakerBox.innerHTML = this.speakers[0] + ':';
		dialogue.innerHTML += this.words[0][0];
		this.words[0].splice(0, 1);
		speechTimer = 0;
	}

	addWords(speaker, words) {
		this.words.push(words.split(''));
		this.speakers.push(speaker);

	}
}
