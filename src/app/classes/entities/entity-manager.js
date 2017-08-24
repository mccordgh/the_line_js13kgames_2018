import { Rectangle } from '../gfx/shapes/rectangle';

let handler, player, entities;

const compare = (a, b) => {
  let aY = a.getY();
  let bY = b.getY();
  let aH = a.getHeight();
  let bH = b.getHeight();
  if (aY + aH === bY + bH)  return 0;
  if (aY + aH < bY + bH) return -1;
  return 1;
};

export class EntityManager {
  constructor(_handler, _player){
    handler = _handler;
    player = _player;
    entities = new Array(player);
  }

  tick(_dt) {
    entities.sort(compare);
    for(let i = 0; i < entities.length; i++){
      const e = entities[i];
      e.tick(_dt);
    }
  }

  render(_g) {
    //Iterate through every entity, check whether they are currently in the camera view.
    //If they are then draw them, if not and they are a monster draw offscreen monster pointer
    entities.forEach(function(e){
      let checkRight = e.handler.getWidth() + e.handler.getGameCamera().getxOffset();
      let checkBottom = e.handler.getHeight() + e.handler.getGameCamera().getyOffset();
      let checkLeft = e.handler.getGameCamera().getxOffset() - e.width;
      let checkTop = e.handler.getGameCamera().getyOffset() - e.height;
      let scaleX = 0, scaleY = 0, marker;
      let offScreen = false;

      _g.font = "64px Arial";
      _g.fillStyle = 'white';

      if (e.x > checkRight){
        scaleX = e.handler.getWidth() - 55;
        scaleY = e.y - e.handler.getGameCamera().getyOffset();
        offScreen = true;
        marker = ">";
      }
      if (e.y > checkBottom){
        scaleX = e.x - e.handler.getGameCamera().getxOffset();
        scaleY = e.handler.getHeight() - 25;
        offScreen = true;
        marker = "V";
      }
      if (e.x < checkLeft){
        scaleX = 10;
        scaleY = e.y - e.handler.getGameCamera().getyOffset();
        offScreen = true;
        marker = "<";
      }
      if (e.y < checkTop) {
        scaleX = e.x - e.handler.getGameCamera().getxOffset();
        scaleY = 65;
        offScreen = true;
        marker = "/\\";
      }

      if (offScreen && e.type === 'monster')
        _g.fillText(marker, scaleX, scaleY);

      if (!offScreen)
        e.render(_g);
    });
  }

  getPlayer() {
    return player;
  }

  getHandler() {
    return handler;
  }

  getEntities() {
    return entities;
  }

  getSingleEntity(_type) {
    let entityObj;

    entities.forEach((item) => {
      if (item.type === _type) {
        entityObj = {
          type: item.type,
          x: item.x,
          y: item.y
        };
      }
    });

    return entityObj;
  }

  addEntity(e) {
    entities.push(e);
    handler.getWorld().getSpatialGrid().insert(new Rectangle(e.x + e.bounds.x, e.y + e.bounds.y, e.bounds.width, e.bounds.height), e);
  }

  removeEntity(_entity) {
    for (let i = 0; i < entities.length; i++){
      const e = entities[i];
      if (e === _entity){
        entities.splice(i, 1);
      }
    }
  }

  removeAllMonsters() {
    for (let i = 0; i < entities.length; i++){
      const e = entities[i];
      if (e.type === 'monster'){
        entities.splice(i, 1);
      }
    }
  }
}
