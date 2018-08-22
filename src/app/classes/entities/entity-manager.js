import { Rectangle } from '../gfx/shapes/rectangle';

let handler, player, entities;

export class EntityManager {
  constructor(_handler, _player){
    handler = _handler;
    player = _player;
    entities = new Array(player);
  }

  tick(dt) {
    for(let i = 0; i < entities.length; i++){
      entities[i].tick(dt);
    }
  }

  render(g) {
    for(let i = 0; i < entities.length; i++){
      entities[i].render(g);
    }
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

  addEntity(e) {
    entities.push(e);
    // handler.getWorld().getSpatialGrid().insert(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.w, e.b.h), e);
  }

  removeEntity(e) {
    let index = entities.indexOf(e);

		// handler.getWorld().getSpatialGrid().remove(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.w, e.b.h), e);

    entities.splice(index, 1);
  }

  removeEntitiesByType(type) {
    // entities = entities.filter((e) => {
    //   if (e.type === type) {
    //     handler.getWorld().getSpatialGrid().remove(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.w, e.b.h), e);
    //   } else {
    //     return e;
    //   }
    // });
  }
}
