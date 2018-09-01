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
    handler.getWorld().getSpatialGrid().insert(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.s, e.b.s), e);
  }

  newRoom(prevRoom, room) {
    entities = [];
    this.addEntity(player);

    if (player.item && (prevRoom != null)) {
      // this.addEntity(player.item);
      prevRoom.removeEntity(player.item);
      room.addEntity(player.item);
    }

    room.entities.forEach((e) => {
      this.addEntity(e);

      if (e.type === 'g') e.resetPos();
    });
  }

  removeEntity(e) {
    let index = entities.indexOf(e);

		handler.getWorld().getSpatialGrid().remove(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.s, e.b.s), e);

    entities.splice(index, 1);
  }

  // removeEntitiesByType(type) {
    // entities = entities.filter((e) => {
    //   if (e.type === type) {
    //     handler.getWorld().getSpatialGrid().remove(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.w, e.b.h), e);
    //   } else {
    //     return e;
    //   }
    // });
  // }
}
