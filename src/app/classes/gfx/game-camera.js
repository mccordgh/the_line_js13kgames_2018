// export class GameCamera {
//   constructor(h, xO, yO){
//     this.xO = xO;
//     this.y0 = yO;
//     this.h = h;
//   }

//   centerOnEntity(entity) {
//     this.xO = entity.getX() - this.h.getWidth() / 2 + entity.getWidth() / 2;
//     this.y0 = entity.getY() - this.h.getHeight() / 2 + entity.getHeight() / 2;
//     this.checkBlankSpace();
//   }

//   move(xAmt, yAmt) {
//     this.xO += xAmt;
//     this.y0 += yAmt;

//     this.checkBlankSpace();
//   }

//   getxOffset() {
//     return parseInt(this.xO);
//   }

//   getyOffset() {
//     return parseInt(this.y0);
//   }

//   setxOffset(offset) {
//     this.xO = offset;
//   }

//   setyOffset(offset) {
//     this.y0 = offset;
//   }

//   checkBlankSpace() {
//     if (this.xO < 0) {
//       this.xO = 0;
//     } else if (this.xO > this.h.getWorld().getWidth() * TILE_SIZE - this.h.getWidth()) {
//       this.xO = this.h.getWorld().getWidth() * TILE_SIZE - this.h.getWidth();
//     }

//     if (this.y0 < 0){
//       this.y0 = 0;
//     } else if (this.y0 > this.h.getWorld().getHeight() * TILE_SIZE - this.h.getHeight()) {
//       this.y0 = this.h.getWorld().getHeight() * TILE_SIZE - this.h.getHeight();
//     }
//   }
// }
