import { Animation } from './animation';
import { ImageLoader } from './image-loader';
import { SpriteSheet } from './sprite-sheet';

let assets = {}, PATH  = window.location.href.replace('index.html', '') + 'src/res/';
let SPRITE_HEIGHT = 16, SPRITE_WIDTH = 16;

export class Assets {
  constructor(name, path, width, height) {
    assets[name] = this;
    this.name = name;
    this.path = path;
    this.width = width;
    this.height = height;
    this.sheet = new SpriteSheet(ImageLoader.loadImage(this.path));
    this.animations = {};
  }

  addAnimation(name, animation) {
    this.animations[name] = animation;
  }

  getWidth() {
    return SPRITE_WIDTH;
  }

  getHeight() {
    return SPRITE_HEIGHT;
  }

  static getAssets(name) {
    return assets[name];
  }
}

let cropTile = (asset, x, y) => asset.sheet.crop(SPRITE_WIDTH * x, SPRITE_HEIGHT * y, SPRITE_WIDTH, SPRITE_HEIGHT);

let tiles = new Assets('tiles', PATH + "all_tiles.png", SPRITE_WIDTH, SPRITE_HEIGHT);
tiles.path = cropTile(tiles, 1, 0);
tiles.pathYellow = cropTile(tiles, 1, 1);
tiles.wall = cropTile(tiles, 0, 0);
tiles.wallYellow = cropTile(tiles, 0, 1);
tiles.exit = cropTile(tiles, 1, 2);
tiles.lantern = cropTile(tiles, 0, 2);

let addAnimations = (sprites, n, wurow, wrrow, wdrow, wlrow) => {
  let framespeed = 200, wrframes = [], wlframes = [], wuframes = [], wdframes = [];

  for (let i = 0; i < 2; i++) {
    wuframes.push({
      frame: sprites.sheet.crop(sprites.width * i, sprites.height * wurow, sprites.width, sprites.height),
      speed: framespeed
    });
    wrframes.push({
      frame: sprites.sheet.crop(sprites.width * i, sprites.height * wrrow + 1, sprites.width, sprites.height),
      speed: framespeed
    });
    wdframes.push({
      frame: sprites.sheet.crop(sprites.width * i, sprites.height * wdrow + 1, sprites.width, sprites.height),
      speed: framespeed
    });
    wlframes.push({
      frame: sprites.sheet.crop(sprites.width * i, sprites.height * wlrow + 1, sprites.width, sprites.height),
      speed: framespeed
    });
  }

  sprites.addAnimation(n + "walk_up", new Animation(wuframes));
  sprites.addAnimation(n + "walk_right", new Animation(wrframes));
  sprites.addAnimation(n + "walk_down", new Animation(wdframes));
  sprites.addAnimation(n + "walk_left", new Animation(wlframes));
};

addAnimations(tiles, 'p', 3, 4, 5, 6);
addAnimations(tiles, 'c', 7, 8, 9, 10);
