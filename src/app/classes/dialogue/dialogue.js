// let dialogue = document.getElementById('dialogue');

// let speechTimer = 5, sentencePause = 0, textPrefix = '', textSuffix = '',
// 	redToggle = false, yellowToggle = false, words = [];

// export class Dialogue {
// 	tick(h) {
// 		if (speechTimer >= 2) {
// 			if (words.length) {
// 				if (words[0].length) {
// 				  h.getSM().play('txt');
// 					this.sNL();
// 				} else {
// 					if (sentencePause >= 120) {
// 						this.rNS();
// 					} else {
// 						sentencePause++;
// 					}
// 				}
// 			}
// 		}

// 		if (speechTimer < 30) speechTimer++;
// 	}

// 	rNS() {
// 		words.splice(0, 1);
//     this.clean();
// 	}

// 	clean() {
//     dialogue.innerHTML = '';
//     sentencePause = 0;
//   }

// 	sNL() {
// 		let n = words[0][0];
// 		let color, txtClass;

// 		redToggle = n === '@' ? !redToggle : redToggle;
// 		yellowToggle = n === '+' ? !yellowToggle : yellowToggle;

//     let cR = redToggle ? 'red' : 'white';
// 		color = yellowToggle ? 'yellow' : cR;
// 		txtClass = redToggle ? 'shake' : '';

// 		textPrefix = '<h2 style="color:' + color + ';" class="' + txtClass + '">';
// 		textSuffix = '</h2>';

// 		dialogue.innerHTML += textPrefix + n.replace('@', '').replace('+', '').replace(' ', '&nbsp;') + textSuffix;
// 		words[0].splice(0, 1);
// 		speechTimer = 0;
// 	}

// 	aW(_words) {
//   if (!(_words instanceof Array)) _words = [_words];
// 	  _words.forEach((w) => { words.push(w.split('')); });
// 	}

// 	clear() {
// 		words = [];
// 	  this.clean();
// 	}
// }
