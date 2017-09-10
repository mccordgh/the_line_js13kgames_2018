import { Menu } from './menu';

export class GameOver extends Menu {
  constructor(handler){
    super(handler);
  }

  render(g) {
    if (g) {
      let screenWidth = this.handler.getWidth();
      let screenHeight = this.handler.getHeight();

      g.fillStyle = "black";
      g.fillRect(0, 0, screenWidth, screenHeight);

      let text = 'Y O U   D I E D';
      let xPos = (screenWidth / 2) - (g.measureText(text).width / 2);
      let yPos = (screenHeight / 3);
      g.drawText({
        fillColor: 'red',
        text,
        fontSize: 32,
        x: xPos,
        y: yPos,
      });

      text = 'press enter to try again';
      xPos = (screenWidth / 2) - (g.measureText(text).width / 2);
      yPos = (screenHeight / 1.5);
      g.drawText({
        fillColor: 'white',
        text,
        fontSize: 32,
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
