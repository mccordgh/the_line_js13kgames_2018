export class Rectangle {
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  intersects(rect) {
    return (
      this.x < rect.x + rect.width
      && this.x + this.width > rect.x
      && this.y < rect.y + rect.height
      && this.y + this.height > rect.y
    );
  }
}
