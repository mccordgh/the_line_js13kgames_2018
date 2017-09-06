export class Rectangle {
  constructor(_x, _y, _width, _height){
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
  }

  intersects(_rect) {
    return (
      this.x < _rect.x + _rect.width
      && this.x + this.width > _rect.x
      && this.y < _rect.y + _rect.height
      && this.y + this.height > _rect.y
    );
  }
}
