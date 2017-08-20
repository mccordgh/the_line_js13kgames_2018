import { ImageLoader } from './image-loader';
import { SpriteSheet } from './sprite-sheet';

const assets = {};
const PATH  = window.location.href + 'src/res/';

export class Assets {
  constructor(_name, _path, _width, _height) {
    assets[_name] = this;
    this.name = _name;
    this.path = _path;
    this.width = _width;
    this.height = _height;
    this.sheet = new SpriteSheet(ImageLoader.loadImage(this.path));
    // this.animations = {};
  }

  // addAnimation(_name, _animation) {
  //   this.animations[_name] = _animation;
  // }

  getWidth() {
    return DEFAULT_WIDTH;
  }

  getHeight() {
    return DEFAULT_HEIGHT;
  }

  static getAssets(_name) {
    return assets[_name];
  }
}

const cropTile = (x, y) => tiles.sheet.crop(16 * x, 16 * y, 16, 16);

//TILE ASSETS
const tiles = new Assets("tiles", PATH + "tiles.png", 16, 16);
tiles.wall = cropTile(0, 0);
tiles.path = cropTile(1, 0);

//PLAYER TILE
const player = new Assets("player", PATH + "player.png", 16, 16);
player.idle = cropTile(0, 0);
