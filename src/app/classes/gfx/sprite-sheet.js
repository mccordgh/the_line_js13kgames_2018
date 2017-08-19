export class SpriteSheet {
  constructor(_sheet) {
    this.sheet = _sheet;
  }

  crop(_x, _y, _width, _height) {
    return {"sheet": this.sheet, "x": _x, "y": _y, "width": _width, "height": _height};
  }
}
