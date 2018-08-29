import { Room } from './room';
import { Guard } from '../entities/creatures/monsters/guard';
import Key from '../entities/statics/key';

/* BUILDING A ROOM
  1. fill in standard room with 4 exits
  2. block off exits that shouldn't exist (outside edges of full world)
  3. add extra barriers
  4. add npc
  5. add items
*/

/* World "map" layout of rooms
  [ 0 ] [ 1 ] [ 2 ] [ 3 ]
  [ 4 ] [ 5 ] [ 6 ] [ 7 ]
  [ 8 ] [ 9 ] [10 ] [11 ]
  [12 ] [13 ] [14 ] [15 ]
*/

let handler;
let roomNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let keys = [
  new Key(handler, rndInt(3, 9), rndInt(3, 9), 'p'),
  new Key(handler, rndInt(3, 9), rndInt(3, 9), 'g'),
  new Key(handler, rndInt(3, 9), rndInt(3, 9), 'y'),
  new Key(handler, rndInt(3, 9), rndInt(3, 9), 'b'),
];

let pullRoom = () => {
  let r = rndIndex(roomNumbers);
  roomNumbers = roomNumbers.filter(i => i != r);

  return r;
}

/* TRAITS */
let noTop = (room) => {
  room[0][5] = room[0][6] = 1;

  return room;
}

let noRight = (room) => {
  room[5][11] = room[6][11] = 1;

  return room;
}

let noBottom = (room) => {
  room[11][5] = room[11][6] = 1;

  return room;
}

let noLeft = (room) => {
  room[5][0] = room[6][0] = 1;

  return room;
}
/* TRAITS */

let startRoom = (room) => {
  room.addEntity(new Guard(handler, 8, 3));
  roomNumbers = roomNumbers.filter(r => r != room.id);

  return room;
}

let createKeyRooms = (rooms) => {
  for (let i = 0; i < 4; i++) {
    let r = pullRoom();
    console.log(keys[0].type, 'in room', r + 1);
    rooms[r].entities.push(keys[0]);
    keys.shift();
  }

  return rooms;
}

let spawnGuards = (rooms) => {
  roomNumbers.forEach(r => rooms[r].entities.push(
    new Guard(handler, rndInt(2, 10), rndInt(2, 10))
  ));

  return rooms;
}

export default function(_handler, start) {
  handler = _handler;

  let rooms = {
    0: new Room( handler,  0, [noTop, noLeft]),
    1: new Room( handler,  1, [noTop]),
    2: new Room( handler,  2, [noTop]),
    3: new Room( handler,  3, [noTop, noRight]),
    4: new Room( handler,  4, [noLeft]),
    5: new Room( handler,  5, [noRight]),
    6: new Room( handler,  6, [noLeft]),
    7: new Room( handler,  7, [noRight]),
    8: new Room( handler,  8, [noLeft]),
    9: new Room( handler,  9, [noRight]),
    10: new Room(handler, 10, [noLeft]),
    11: new Room(handler, 11, [noRight]),
    12: new Room(handler, 12, [noBottom, noLeft]),
    13: new Room(handler, 13, [noBottom]),
    14: new Room(handler, 14, [noBottom]),
    15: new Room(handler, 15, [noRight, noBottom]),
  };

  let r = startRoom(rooms[start]);
  rooms[start] = new Room(handler, r.id, r.traits, r.entities, start);

  rooms = createKeyRooms(rooms);
  rooms = spawnGuards(rooms);

  return rooms;
};
