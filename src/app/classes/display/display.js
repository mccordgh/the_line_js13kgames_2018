let graphics = null;

export class Display {

  constructor(_title, _width, _height) {
    this.title = _title;
    this.width = _width;
    this.height = _height;
    this.createDisplay();
  }

  createDisplay() {
    document.title = this.title;
    const myCanvas = document.getElementById("canvas");
    myCanvas.setAttribute("height", this.height);
    myCanvas.setAttribute("width", this.width);
    graphics = myCanvas.getContext("2d");
  };

  getTitle() {
    return this.title;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getGraphics() {
    return graphics;
  }
}

CanvasRenderingContext2D.prototype.myDrawImage = (asset, _x, _y, _width, _height) => {
  graphics.drawImage(asset.sheet, asset.x, asset.y, asset.width, asset.height, _x, _y, _width, _height);
};

CanvasRenderingContext2D.prototype.myDrawText = (_x, _y, _text) => {
  text = _text.toLowerCase().split("");

  let textStartX = 0;

  for (let i = 0; i < text.length; i++) {
    let myAsset = myFont[text[i]];
    graphics.myDrawImage(myAsset, _x + textStartX, _y, myAsset.width * 32, myAsset.height * 30);
    textStartX = textStartX + myAsset.width + 2;
  }
};

CanvasRenderingContext2D.prototype.centerTextOnX = (_text) => (width / 2) - (graphics.measureText(_text).width / 2);

CanvasRenderingContext2D.prototype.centerTextOnY = () => height / 2

CanvasRenderingContext2D.prototype.drawText = (_textObject) => {
  graphics.font = `${_textObject.fontSize}px Arial`;
  let borderWidth = _textObject.additionalWidth || graphics.measureText(_textObject.text).width;
  graphics.strokeStyle = _textObject.borderColor;
  graphics.fillStyle = _textObject.fillColor;
  graphics.strokeText(_textObject.text, _textObject.x(), _textObject.y());
  graphics.fillText(_textObject.text,  _textObject.x(), _textObject.y());
};
