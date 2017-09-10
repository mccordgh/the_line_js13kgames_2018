let dialogue = document.getElementById('dialogue');
let speakerBox = document.getElementById('speaker');

let speechTimer = 5, sentencePause = 0, textPrefix = '', textSuffix = '',
	redToggle = false, emToggle = false, yellowToggle = false, words = [], speakers = [];

export class Dialogue {
	tick() {
		if (speechTimer >= 0) {
			if (words.length) {
				if (words[0].length) {
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
		words.splice(0, 1);
		speakers.splice(0, 1);
		dialogue.innerHTML = '';
		speakerBox.innerHTML = '';
		sentencePause = 0;
	}

	speakNextLetter() {
		speakerBox.innerHTML = speakers[0] + ':';

		let next = words[0][0];

		if (next === '@') {
			redToggle = !redToggle;
		}

		if (next === '$') {
			yellowToggle = !yellowToggle;
		}

		if (next === '&') {
			emToggle = !emToggle;
		}

		textPrefix = '';
		textSuffix = '';

		if (redToggle) {
			textPrefix += '<span style="color:red">';
			textSuffix += '</span>';
		}

		if (yellowToggle) {
			textPrefix += '<span style="color:yellow">';
			textSuffix += '</span>';
		}

		if (emToggle) {
			textPrefix += '<em>';
			textSuffix += '</em>';
		}

		if (next === '%') {
			textSuffix += '<br />';
		}

		dialogue.innerHTML += textPrefix + next.replace('%', '').replace('@', '').replace('&', '').replace('$', '') + textSuffix;

		words[0].splice(0, 1);

		speechTimer = 0;
	}

	addWords(speaker, _words) {
		words.push(_words.split(''));
		speakers.push(speaker);
	}

	clear() {
		words = [];
		speakers = [];
		dialogue.innerHTML = '';
		speakerBox.innerHTML = '';
	}
}
