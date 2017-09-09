import { Menu } from './menu';

export class Ending extends Menu {
  constructor(handler){
    super(handler);
  }

  render(g) {
    if (g) {
      const screenWidth = this.handler.getWidth();
      const screenHeight = this.handler.getHeight();

      g.fillStyle = "black";
      g.fillRect(0, 0, screenWidth, screenHeight);

      let text = 'You escaped the maze!';
      let xPos = (screenWidth / 2) - (g.measureText(text).width / 2);
      let yPos = (screenHeight / 3);
      g.drawText({
        fillColor: 'yellow',
        text,
        fontSize: 32,
        x: xPos,
        y: yPos,
      });

      text = 'Press enter for another run!';
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
