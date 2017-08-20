import { ImageLoader } from './image-loader';
import { SpriteSheet } from './sprite-sheet';

const assets = {};
const PATH  = window.location.href + 'src/res/',
TILE_HEIGHT = 32,
TILE_WIDTH = 32;

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

const cropTile = (asset, x, y) => asset.sheet.crop(TILE_WIDTH * x, TILE_HEIGHT * y, TILE_WIDTH, TILE_HEIGHT);

//TILE ASSETS
const tiles = new Assets("tiles", PATH + "tiles.png", TILE_WIDTH, TILE_HEIGHT);
tiles.wall = cropTile(tiles, 0, 0);
tiles.path = cropTile(tiles, 1, 0);

//PLAYER TILE
const player = new Assets("player", PATH + "player.png", TILE_WIDTH, TILE_HEIGHT);
player.idle = cropTile(player, 0, 0);
