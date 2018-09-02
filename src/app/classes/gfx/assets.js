import { Animation } from './animation';
import { ImageLoader } from './image-loader';
import { SpriteSheet } from './sprite-sheet';

let assets = {}, PATH  = window.location.href.replace('index.html', '') + 'src/res/';

export class Assets {
  constructor(name, path) {
    assets[name] = this;
    this.name = name;
    this.path = path;
    this.width = SPRITE_SIZE;
    this.height = SPRITE_SIZE;
    this.sheet = new SpriteSheet(ImageLoader.loadImage(this.path));
    this.anim = {};
  }

  addAnimation(name, animation) {
    this.anim[name] = animation;
  }

  static getAssets(name) {
    return assets[name];
  }
}

// let cropTile = (asset, x, y) => asset.sheet.crop(SPRITE_SIZE * x, SPRITE_SIZE * y, SPRITE_SIZE, SPRITE_SIZE);

let addAnimations = (name, right, left) => {
  let wrframes = [], wlframes = [], multi = left != 0;
  let cropFrame = (pos, i) => {
    return all.sheet.crop(SPRITE_SIZE * i, SPRITE_SIZE * pos, SPRITE_SIZE, SPRITE_SIZE);
  }

  for (let i = 0; i < 2; i++) {
    wrframes.push({
      frame: cropFrame(right, i),
    });
    if (multi) {
      wlframes.push({
        frame: cropFrame(left, i),
      });
    }
  }

  all.addAnimation(name + "right", new Animation(wrframes));
  all.addAnimation(name + "left", new Animation(wlframes));
};

/* TILES */
/* WALL */
// let wall = new Assets('wall', PATH + 'wall.png');
// wall.wall = cropTile(wall, 0, 0);

/* PATH */
// let path = new Assets('path', PATH + 'path.png');
// path.path = cropTile(path, 0, 0);

/* PLAYER */
// let player = new Assets('player', PATH + 'worker_3.png');
// player.idle = cropTile(player, 0, 0);

// let tiles = new Assets('tiles', PATH + "all_tiles.png", SPRITE_SIZE, SPRITE_SIZE);
// tiles.path = cT(tiles, 1, 0);
// tiles.pathYellow = cT(tiles, 1, 1);
// tiles.wall = cT(tiles, 0, 0);
// tiles.wallYellow = cT(tiles, 0, 1);
// tiles.exit = cT(tiles, 1, 2);
// tiles.lantern = cT(tiles, 0, 2);


let all = new Assets('all', PATH + 'all.png');
addAnimations('p', 0, 1);
addAnimations('g', 2, 3);
addAnimations('w', 4, 0)
addAnimations('p_key', 5, 0);
addAnimations('g_key', 6, 0)
addAnimations('y_key', 7, 0)
addAnimations('b_key', 8, 0)
addAnimations('p_m', 9, 0);
addAnimations('g_m', 10, 0);
addAnimations('y_m', 11, 0);
addAnimations('b_m', 12, 0);
addAnimations('s', 13, 0);
addAnimations('prop1', 14, 15)
