import { ImageLoader } from './image-loader';
import { SpriteSheet } from './sprite-sheet';

const assets = {};
const PATH  = window.location.href + '/src/res/',
SPRITE_HEIGHT = 16,
SPRITE_WIDTH = 16;

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

const cropTile = (asset, x, y) => asset.sheet.crop(SPRITE_WIDTH * x, SPRITE_HEIGHT * y, SPRITE_WIDTH, SPRITE_HEIGHT);

const tiles = new Assets("tiles", PATH + "tiles_16x16_tiny.png", SPRITE_WIDTH, SPRITE_HEIGHT);
tiles.path = cropTile(tiles, 1, 0);
tiles.pathBlue = cropTile(tiles, 1, 2);
tiles.pathGreen = cropTile(tiles, 2, 2);
tiles.pathYellow = cropTile(tiles, 0, 2);
tiles.wall = cropTile(tiles, 0, 0);
tiles.wallBlue = cropTile(tiles, 1, 1);
tiles.wallGreen = cropTile(tiles, 2, 1);
tiles.wallYellow = cropTile(tiles, 0, 1);
tiles.switchBlue = cropTile(tiles, 2, 0);
tiles.switchGreen = cropTile(tiles, 3, 0);
tiles.exit = cropTile(tiles, 3, 1);

const creatures = new Assets("creatures", PATH + "player_16x16_tiny.png", SPRITE_WIDTH, SPRITE_HEIGHT);
creatures.playerDown = cropTile(creatures, 0, 0);
creatures.ghostDown = cropTile(creatures, 0, 1);
