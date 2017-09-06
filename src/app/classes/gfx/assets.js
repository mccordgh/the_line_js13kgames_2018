import { Animation } from './animation';
import { ImageLoader } from './image-loader';
import { SpriteSheet } from './sprite-sheet';

const assets = {};
const PATH  = window.location.href.replace('index.html', '') + 'src/res/',
  SPRITE_HEIGHT = 16,
  SPRITE_WIDTH = 16,
  CREATURE_HEIGHT = 18;

export class Assets {
  constructor(_name, _path, _width, _height) {
    assets[_name] = this;
    this.name = _name;
    this.path = _path;
    this.width = _width;
    this.height = _height;
    this.sheet = new SpriteSheet(ImageLoader.loadImage(this.path));
    this.animations = {};
  }

  addAnimation(_name, _animation) {
    this.animations[_name] = _animation;
  }

  getWidth() {
    return SPRITE_WIDTH;
  }

  getHeight() {
    return SPRITE_HEIGHT;
  }

  static getAssets(_name) {
    return assets[_name];
  }
}

const cropTile = (asset, x, y) => asset.sheet.crop(SPRITE_WIDTH * x, SPRITE_HEIGHT * y, SPRITE_WIDTH, SPRITE_HEIGHT);

const tiles = new Assets('tiles', PATH + "tiles.png", SPRITE_WIDTH, SPRITE_HEIGHT);
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
tiles.lantern = cropTile(tiles, 3, 2);

const player = new Assets('sprites',  PATH + "sprites.png", SPRITE_WIDTH, CREATURE_HEIGHT);
const creature = new Assets('creature', PATH + "creature.png", SPRITE_WIDTH, CREATURE_HEIGHT);

const addAnimations = (sprites) => {

  let framespeed = 200,
    wrframes = [], //walk right frames
    wlframes = [], //walk left frames
    wuframes = [], //walk up frames
    wdframes = [], //walk down frames
    deathframes = [], //dead animation frames
    wurow = 0, //walk up row on spritesheet
    wrrow = 1, //walk right row on spritesheet
    wdrow = 2, //walk down row on spritesheet
    wlrow = 3, //walk left row on spritesheet
    deathrow = 4, //death animation row on spritesheet
    animationLength = 3; //how many frames in animation

  for (let i = 0; i < animationLength; i++) {
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
    deathframes.push({
      frame: sprites.sheet.crop(sprites.width * i, sprites.height * deathrow, sprites.width, sprites.height),
      speed: 500
    });
  }

  const idleframes = [
    {frame: sprites.sheet.crop(0, 2 * sprites.height, sprites.width, sprites.height), speed: framespeed},
    {
      frame: sprites.sheet.crop(1 * sprites.width, 2 * sprites.height, sprites.width, sprites.height),
      speed: framespeed
    },
    {frame: sprites.sheet.crop(2 * sprites.width, 2 * sprites.height, sprites.width, sprites.height), speed: framespeed}
  ];

  sprites.addAnimation("walk_up", new Animation(wuframes));
  sprites.addAnimation("walk_right", new Animation(wrframes));
  sprites.addAnimation("walk_down", new Animation(wdframes));
  sprites.addAnimation("walk_left", new Animation(wlframes));
  sprites.addAnimation("idle", new Animation(idleframes));
  sprites.addAnimation("death", new Animation(deathframes));
};

addAnimations(player);
addAnimations(creature);
