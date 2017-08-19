import { ImageLoader } from './image-loader';
import { SpriteSheet } from './sprite-sheet';
// define(['Class', 'ImageLoader', 'SpriteSheet', 'Animation'], function(Class,ImageLoader,SpriteSheet, Animation){

const DEFAULT_WIDTH = 16, DEFAULT_HEIGHT = 16, assets = {};
const PATH  = window.location.href;

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

const cropTile = (x, y) => tiles.sheet.crop(tiles.width * x, tiles.height * y, tiles.width, tiles.height);

console.log(PATH + "res/tiles.png");
const tiles = new Assets("tiles", PATH + "res/tiles.png", DEFAULT_WIDTH, DEFAULT_HEIGHT);

tiles.path = cropTile(0, 0);
tiles.wall = cropTile(0, 1);
