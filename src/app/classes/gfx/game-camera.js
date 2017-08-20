const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;

export class GameCamera {
  constructor(_handler, _xOffset, _yOffset){
    this.xOffset = _xOffset;
    this.yOffset = _yOffset;
    this.handler = _handler;
  }

  centerOnEntity(entity) {
    this.xOffset = entity.getX() - this.handler.getWidth() / 2 + entity.getWidth() / 2;
    this.yOffset = entity.getY() - this.handler.getHeight() / 2 + entity.getHeight() / 2;
    this.checkBlankSpace();
  }

  slowCenterOnEntity(entity) {
    let startX = this.xOffset,
      startY = this.yOffset,
      goalX = entity.getX() - this.handler.getWidth() / 2 + entity.getWidth() / 2,
      goalY = entity.getY() - this.handler.getHeight() / 2 + entity.getHeight() / 2;

    if(startY > goalY && this.yOffset > goalY) {
      this.yOffset -= 5;
    }
    if (goalY > startY && this.yOffset < goalY) {
      this.yOffset += 5;
    }
    if(startX > goalX && this.xOffset > goalX) {
      this.xOffset -= 5;
    }
    if (goalX > startX && this.xOffset < goalX) {
      this.xOffset += 5;
    }

    this.checkBlankSpace();
  }

  move(_xAmt, _yAmt) {
    // console.log('game camera move');
    this.xOffset += _xAmt;
    this.yOffset += _yAmt;
    this.checkBlankSpace();
  }

  getxOffset() {
    // console.log('getting', this.xOffset);
    return parseInt(this.xOffset);
  }

  getyOffset() {
    // console.log('getting', this.yOffset);
    return parseInt(this.yOffset);
  }

  setxOffset(_offset) {
    // console.log('setting xOffset');
    throw new Error();
    this.xOffset = _offset;
  }

  setyOffset(_offset) {
    // console.log('setting yOffset');
    throw new Error();
    this.yOffset = _offset;
  }

  checkBlankSpace() {
    // console.log('checkBlankSpace');
    if (this.xOffset < 0) {
      this.xOffset = 0;
    } else if (this.xOffset > this.handler.getWorld().getWidth() * TILE_WIDTH - this.handler.getWidth()) {
      this.xOffset = this.handler.getWorld().getWidth() * TILE_WIDTH - this.handler.getWidth();
    }

    if (this.yOffset < 0){
      this.yOffset = 0;
    } else if (this.yOffset > this.handler.getWorld().getHeight() * TILE_HEIGHT - this.handler.getHeight()) {
      this.yOffset = this.handler.getWorld().getHeight() * TILE_HEIGHT - this.handler.getHeight();
    }
  }
}
