const dialogue = document.getElementById('dialogue');
const speakerBox = document.getElementById('speaker');

let speechTimer = 5;
let sentencePause = 0;
let symbol = '', textPrefix = '', textSuffix = '', greenToggle = false;

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
		if (speechTimer >= 0) {
			if (this.words.length) {
				if (this.words[0].length) {
					this.speakNextLetter();
				} else {
					if (sentencePause >= 120) {
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

		let next = this.words[0][0];

		if (next === '@') {
			greenToggle = !greenToggle;
		}

		if (greenToggle) {
			textPrefix = '<span style="color:lime">';
			textSuffix = '</span>';
		} else if (next === '%') {
			textPrefix = '';
			textSuffix = '<br />';
		} else {
			textPrefix = '';
			textSuffix = '';
		}

		dialogue.innerHTML += textPrefix + next.replace('%', '').replace('@', '') + textSuffix;

		this.words[0].splice(0, 1);

		speechTimer = 0;
	}

	addWords(speaker, words) {
		this.words.push(words.split(''));
		this.speakers.push(speaker);

	}
}
