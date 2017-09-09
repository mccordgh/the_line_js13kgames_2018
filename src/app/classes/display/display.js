let graphics = null;

export class Display {
  constructor(title, width, height) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.paused = false;
    this.createDisplay();
  }

  createDisplay() {
    document.title = this.title;
    const myCanvas = document.getElementById("canvas");
    myCanvas.setAttribute("height", this.height);
    myCanvas.setAttribute("width", this.width);
    graphics = myCanvas.getContext("2d");
    graphics.webkitImageSmoothingEnabled = false;
    graphics.mozImageSmoothingEnabled = false;
    graphics.imageSmoothingEnabled = false;
    this.setEventListeners();
  };

  setEventListeners() {
    window.onblur = this.pause;
    window.onfocus = this.unPause;
  }

  pause() {
    this.paused = true;
  }

  unPause() {
    this.paused = false;
  }

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

CanvasRenderingContext2D.prototype.myDrawImage = (asset, x, y, width, height) => {
  graphics.drawImage(asset.sheet, asset.x, asset.y, asset.width, asset.height, x, y, width, height);
};

CanvasRenderingContext2D.prototype.drawText = (txtObj) => {
  graphics.font = `${txtObj.fontSize}px Arial`;
  graphics.fillStyle = txtObj.fillColor;
  graphics.strokeText(txtObj.text, txtObj.x, txtObj.y);
  graphics.fillText(txtObj.text,  txtObj.x, txtObj.y);
};
