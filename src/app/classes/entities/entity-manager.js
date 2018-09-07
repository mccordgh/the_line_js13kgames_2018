import { Rectangle } from '../gfx/shapes/rectangle';
import SpeechBox from './statics/speech-box';

let handler, player, entities, playerStart;

export class EntityManager {
  constructor(_handler, _player){
    handler = _handler;
    player = _player;
    playerStart = { x: player.x, y: player.y };
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

  findEntitiesByType(t) {
    return entities.filter(e => e.type == t);
  }

  addEntity(e) {
    // console.log(e);
    entities.push(e);
    // console.log(e, e.b.x, e.b.y, e.b.s);
    handler.getWorld().getSpatialGrid().insert(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.s, e.b.s), e);
  }

  newRoom(prevRoom, room, respawn = false) {
    entities = [];
    if (respawn) this.respawn();
    this.addEntity(player);

    if (player.item && (prevRoom != null) && player.item.type != 'siren') {
      prevRoom.removeEntity(player.item);
      room.addEntity(player.item);
    }

    room.entities.forEach((e) => {
      this.addEntity(e);

      if (e.type === 'g') e.resetPos();
    });

    // console.log({entities: room.entities});
    // window.ee = room.entities;
  }

  removeEntity(e) {
    let index = entities.indexOf(e);

		handler.getWorld().getSpatialGrid().remove(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.s, e.b.s), e);

    entities.splice(index, 1);
  }

  removeEntitiesByType(type) {
    entities = entities.filter((e) => {
      if (e.type === type) {
        handler.getWorld().getSpatialGrid().remove(new Rectangle(e.x + e.b.x, e.y + e.b.y, e.b.s, e.b.s), e);
        return false;
      } else {
        return e;
      }
    });
  }

  pacifyAll() {
    let rooms = handler.getWorld().rooms;
    let keys = Object.keys(rooms);

    player.pacified = true;

    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < rooms[i].entities.length; j++) {
        let ent = rooms[i].entities[j];
        ent.pacified = true;
        if (ent.type == 'g') ent.speed = 40;
      }
    }
  }

  addSpeech(entity, text) {
    this.addEntity(new SpeechBox(handler, entity, text));
  }

  respawn() {
    player.x = playerStart.x;
    player.y = playerStart.y;
  }
}
