export class Ending {
  constructor(_handler){
    this.handler = _handler;
  }

  tick(_dt) {
    this.getInput(_dt);
    this.render();
  }

  render(_g) {
    if (_g) {
      const screenWidth = this.handler.getWidth();
      const screenHeight = this.handler.getHeight();

      _g.fillStyle = "black";
      _g.fillRect(0, 0, screenWidth, screenHeight);

      let text = 'You escaped the maze!';
      _g.drawText({
        borderColor: 'orange',
        fillColor: 'yellow',
        text,
        fontSize: 32,
        font: 'serif',
        x: (screenWidth / 2) - (_g.measureText(text).width / 2),
        y: (screenHeight / 3),
      });

      text = 'Press enter for another run!';
      _g.drawText({
        borderColor: 'orange',
        fillColor: 'white',
        text,
        fontSize: 32,
        font: 'serif',
        x: (screenWidth / 2) - (_g.measureText(text).width / 2),
        y: (screenHeight / 1.5),
      });
    }
  }

  getInput() {
    if (this.handler.getKeyManager().enter) {
      window.location.reload();
    }
  }

  getCredits() {
    return [
      'Programming: Matthew McCord',
      'Artwork: http://www.opengameart.org/',
      '    Player: Antifarea(PC)',
      '    Tiles: Chris Hamons / Medicine Storm',
      '    Tiles: Buch / Keith Karnage',
      '    Music: OveMelaa',
      '    Sound FX: artisticdude / OveMelaa',
      '    Castle: Alucard',
      'Thanks: Jamie Nichols // JS game engine',
      '                         Youtube tutorial'
    ];
  }
}
