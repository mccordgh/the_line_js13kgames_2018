import { Menu } from './menu';

export class GameOver extends Menu {
  constructor(_handler){
    super(_handler);
  }

  render(_g) {
    if (_g) {
      const screenWidth = this.handler.getWidth();
      const screenHeight = this.handler.getHeight();

      _g.fillStyle = "black";
      _g.fillRect(0, 0, screenWidth, screenHeight);

      let text = 'Y O U   D I E D';
      let xPos = (screenWidth / 2) - (_g.measureText(text).width / 2);
      let yPos = (screenHeight / 3);
      _g.drawText({
        fillColor: 'red',
        text,
        fontSize: 32,
        font: 'serif',
        x: xPos,
        y: yPos,
      });

      text = 'press enter to try again';
      xPos = (screenWidth / 2) - (_g.measureText(text).width / 2);
      yPos = (screenHeight / 1.5);
      _g.drawText({
        fillColor: 'white',
        text,
        fontSize: 32,
        font: 'serif',
        x: xPos,
        y: yPos,
      });
    }
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      window.location.reload();
    }
  }
}
