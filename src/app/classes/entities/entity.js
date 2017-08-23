import { Rectangle } from '../gfx/shapes/rectangle';

export class Entity {
  constructor(_handler, _x, _y, _width, _height) {
    this.x = _x;
    this.y = _y;
    this.width = _width;
    this.height = _height;
    this.handler = _handler;
    this.bounds = new Rectangle(0, 0, _width, _height);
    this.target = null;
  }

  tick(_dt) {
    throw("Entities must have a tick function!");
  }
  render(_g) {
    throw("Entities must have a render function!");
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getCollisionBounds(xOffset, yOffset) {
    return new Rectangle(parseInt(this.x + this.bounds.x + xOffset),
      parseInt(this.y + this.bounds.y + yOffset),
      this.bounds.width, this.bounds.height);
  }

  checkEntityCollisions(xOffset, yOffset) {
    const candidates =  this.handler.getWorld().getSpatialGrid().retrieve(new Rectangle(this.x + this.bounds.x + xOffset, this.y + this.bounds.y + yOffset, this.bounds.width, this.bounds.height), this);

    for(let i = 0; i < candidates.length; i++){
      const e = candidates[i];
      // if (this.type === 'player' && e.type === 'monster' && e.health > 0){
      //   e.takeDamage(this.damage);
      // }
      // if (e !== this && e.health > 0 || e.health === undefined){
        if (e.getCollisionBounds(0, 0).intersects(this.getCollisionBounds(xOffset, yOffset))) { //&& !(this.type === 'monster' && e.type === 'monster')){
          // if (e.type === 'castle' && this.type === 'monster'){
          //   if (this.targetType && this.dead < 1)
          //     if(this.targetType === 'castle')
          //   this.takeDamage(e.damage);
          //   e.takeDamage(this.damage);
          // }
          return true;
        }
      // }
    }
    return false;
  }

  setX(_x) {
    this.x = _x;
  }

  setY(_y) {
    this.y = _y;
  }

  setWidth(_width) {
    this.width = _width;
  }

  setHeight(_height) {
    this.height = _height;
  }
}
