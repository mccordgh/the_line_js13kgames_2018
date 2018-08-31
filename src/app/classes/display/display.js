let graphics;

export class Display {
  constructor() {
    // this.p = false;
    this.createDisplay();
  }

  createDisplay() {
    // document.title = this.t;
    let canvas = document.getElementById("canvas");
    canvas.setAttribute("height", GAME_SIZE);
    canvas.setAttribute("width", GAME_SIZE);
    graphics = canvas.getContext("2d");
    graphics.webkitImageSmoothingEnabled = false;
    graphics.mozImageSmoothingEnabled = false;
    graphics.imageSmoothingEnabled = false;
    // this.setEventListeners();
  };

  // setEventListeners() {
  //   window.onblur = this.pause;
  //   window.onfocus = this.unPause;
  // }

  // pause() {
  //   this.p = true;
  // }

  // unPause() {
  //   this.p = false;
  // }

  // getTitle() {
  //   return this.t;
  // }

  // getWidth() {
  //   return this.width;
  // }

  // getHeight() {
  //   return this.height;
  // }

  getGraphics() {
    return graphics;
  }
}

// CanvasRenderingContext2D.prototype.myDrawImage = (asset, x, y, width, height) => {
  // graphics.drawImage(asset.sheet, asset.x, asset.y, asset.width, asset.height, x, y, width, height);
// };
CanvasRenderingContext2D.prototype.myDrawImage = (asset, x, y) => {
  graphics.drawImage(asset.sheet, asset.x, asset.y, asset.width, asset.height, x, y, TILE_SIZE, TILE_SIZE);
};

CanvasRenderingContext2D.prototype.drawText = (text, x, y) => {
  graphics.font = `24px Arial`;
  graphics.fillStyle = 'white';
  graphics.strokeText(text, x, y);
  graphics.fillText(text,  x, y);
};
