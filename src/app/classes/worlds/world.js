// const CURRENT_PATH = window.location.href;

export class World {
  constructor(_path, _handler) {
    this.tiles = [];
    this.handler = _handler;
    _handler.setWorld(this);
    // this.entityManager = new EntityManager(_handler, new Player(_handler, 20, 20));
    // this.loadWorld( CURRENT_PATH + _path);
    // this.spatialGrid = new SpatialGrid(this.width * Tile.TILE_WIDTH, this.height * Tile.TILE_HEIGHT, 64);
    // this.init();
  }

  init() {
    //CASTLE!
    // this.entityManager.addEntity(new Castle(_handler, Tile.TILE_WIDTH * 47, Tile.TILE_HEIGHT * 42));

    //PLAYER SET SPAWN
    // this.entityManager.getPlayer().setX(this.spawnX);
    // this.entityManager.getPlayer().setY(this.spawnY);

    //HUD INIT
    // this.hud = new HUD(_handler, this.entityManager.getPlayer());
  }

  // loadWorld: function(_path) {
  //   var file = Utils.loadFileAsString(_path);
  //   var tokens = file.replace(/\n/g, " ").split(" ");
  //   this.width = tokens[0];
  //   this.height = tokens[1];
  //   this.spawnX = tokens[2] * Tile.TILE_WIDTH;
  //   this.spawnY = tokens[3] * Tile.TILE_HEIGHT;
  //   for(y=0; y < this.height; y++){
  //     for(x=0; x < this.width; x++){
  //       if(!this.tiles[x])
  //         this.tiles[x] = [];
  //       this.tiles[x][y] = parseInt(tokens[(x + (y * this.width)) + 4]);
  //     }
  //   }
  // },

  tick(_dt) {
    // this.entityManager.tick(_dt);
  }

  render(_g) {
    // var xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / Tile.TILE_WIDTH));
    // var xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / Tile.TILE_WIDTH + 1));
    // var yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / Tile.TILE_HEIGHT));
    // var yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / Tile.TILE_HEIGHT + 1));
    //
    // for(y = yStart; y < yEnd; y++){
    //   for(x = xStart; x < xEnd; x++){
    //     if (this.getTile(x,y) !== undefined)
    //       this.getTile(x, y).render(_g, x * Tile.TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * Tile.TILE_HEIGHT -  this.handler.getGameCamera().getyOffset());
    //   }
    // }
    //
    // this.hud.render(_g);
    // this.entityManager.render(_g);
  }

  // getTile: function(_x, _y){
  //   let tmpTile = Tile.tiles[this.tiles[_x][_y]];
  //   if (tmpTile)
  //     return Tile.tiles[this.tiles[_x][_y]];
  // }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  // getEntityManager() {
  //   return this.entityManager;
  // }

  // getSpatialGrid() {
  //   return this.spatialGrid;
  // }

  // getRoundOver(){
  //   return roundOver;
  // }

  // setRoundOver(_bool){
  //   roundOver = _bool;
  // }
}
