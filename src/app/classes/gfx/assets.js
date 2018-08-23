// import { Animation } from './animation';
import { ImageLoader } from './image-loader';
import { SpriteSheet } from './sprite-sheet';

let assets = {}, PATH  = window.location.href.replace('index.html', '') + 'src/res/';
// let SPRITE_SIZE = 16, SPRITE_SIZE = 16;

export class Assets {
  constructor(name, path) {
    assets[name] = this;
    this.name = name;
    this.path = path;
    this.width = SPRITE_SIZE;
    this.height = SPRITE_SIZE;
    this.sheet = new SpriteSheet(ImageLoader.loadImage(this.path));
  }

  static getAssets(name) {
    return assets[name];
  }
}

let cropTile = (asset, x, y) => asset.sheet.crop(SPRITE_SIZE * x, SPRITE_SIZE * y, SPRITE_SIZE, SPRITE_SIZE);

/* TILES */
/* WALL */
let wall = new Assets('wall', PATH + 'wall.png');
wall.wall = cropTile(wall, 0, 0);

/* PATH */
let path = new Assets('path', PATH + 'path.png');
path.path = cropTile(path, 0, 0);

/* PLAYER */
let player = new Assets('player', PATH + 'worker_3.png');
player.idle = cropTile(player, 0, 0);

// let tiles = new Assets('tiles', PATH + "all_tiles.png", SPRITE_SIZE, SPRITE_SIZE);
// tiles.path = cT(tiles, 1, 0);
// tiles.pathYellow = cT(tiles, 1, 1);
// tiles.wall = cT(tiles, 0, 0);
// tiles.wallYellow = cT(tiles, 0, 1);
// tiles.exit = cT(tiles, 1, 2);
// tiles.lantern = cT(tiles, 0, 2);

// let aA = (sprites, n, wurow, wrrow, wdrow, wlrow) => {
//   let framespeed = 200, wrframes = [], wlframes = [], wuframes = [], wdframes = [];

//   for (let i = 0; i < 2; i++) {
//     wuframes.push({
//       frame: sprites.sheet.crop(sprites.width * i, sprites.height * wurow, sprites.width, sprites.height),
//       speed: framespeed
//     });
//     wrframes.push({
//       frame: sprites.sheet.crop(sprites.width * i, sprites.height * wrrow + 1, sprites.width, sprites.height),
//       speed: framespeed
//     });
//     wdframes.push({
//       frame: sprites.sheet.crop(sprites.width * i, sprites.height * wdrow + 1, sprites.width, sprites.height),
//       speed: framespeed
//     });
//     wlframes.push({
//       frame: sprites.sheet.crop(sprites.width * i, sprites.height * wlrow + 1, sprites.width, sprites.height),
//       speed: framespeed
//     });
//   }

//   sprites.aA(n + "walk_up", new Animation(wuframes));
//   sprites.aA(n + "walk_right", new Animation(wrframes));
//   sprites.aA(n + "walk_down", new Animation(wdframes));
//   sprites.aA(n + "walk_left", new Animation(wlframes));
// };

// aA(tiles, 'p', 3, 4, 5, 6);
// aA(tiles, 'c', 7, 8, 9, 10);
