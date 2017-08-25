export class GameOver {
  constructor(_handler){
    this.handler = _handler;
  }

  tick(_dt) {
    this.getInput(_dt);
    this.render();
  }

  render(_g) {
    if (_g) {
      _g.fillStyle = "black";
      _g.fillRect(0, 0, this.handler.getWidth(), this.handler.getHeight());

      _g.drawText({
        borderColor: 'orange',
        fillColor: 'red',
        text: 'Y O U   D I E D',
        fontSize: 32,
        font: 'serif',
        x: 50,
        y: 200,
      });
      _g.drawText({
        borderColor: 'orange',
        fillColor: 'white',
        text: 'press enter to try again',
        fontSize: 18,
        font: 'serif',
        x: 50,
        y: 400,
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
