let dialogue = document.getElementById('dialogue');

let speechTimer = 5, sentencePause = 0, textPrefix = '', textSuffix = '',
	redToggle = false, yellowToggle = false, color = '', words = [];

export class Dialogue {
	tick(h) {
		if (speechTimer >= 2) {
			if (words.length) {
				if (words[0].length) {
				  h.getSM().play('txt');
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
    this.clean();
	}

	clean() {
    dialogue.innerHTML = '';
    sentencePause = 0;
  }

	speakNextLetter() {
		let n = words[0][0];

		redToggle = n === '@' ? !redToggle : redToggle;
		yellowToggle = n === '+' ? !yellowToggle : yellowToggle;

		color = '';
		if (redToggle) color = 'red';
		if (yellowToggle) color = 'yellow';

		textPrefix = '<span style="color:' + color + '">';
		textSuffix = '</span>';

		dialogue.innerHTML += textPrefix + n.replace('@', '').replace('+', '') + textSuffix;

		words[0].splice(0, 1);

		speechTimer = 0;
	}

	addWords(_words) {
  if (!(_words instanceof Array)) _words = [_words];

	  _words.forEach((w) => { words.push(w.split('')); });
	}

	clear() {
		words = [];
	  this.clean();
	}
}
