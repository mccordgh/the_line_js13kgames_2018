import { Room } from './room';
import { Guard } from '../entities/creatures/monsters/guard';
import Key from '../entities/statics/key';
import Machine from '../entities/statics/machine';
import PropMachine from '../entities/statics/prop-machine';
import { Worker } from '../entities/creatures/worker';
import { Manager } from '../entities/creatures/manager';
import Desk from '../entities/statics/desk';

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

let spawnRoom = {};
let guardSpawns = [3, 8];
let keySpawns = [3, 8];
let handler;
let roomNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let keys = [
  new Key(handler, rndIndex(keySpawns), rndIndex(keySpawns), 'p'),
  new Key(handler, rndIndex(keySpawns), rndIndex(keySpawns), 'g'),
  new Key(handler, rndIndex(keySpawns), rndIndex(keySpawns), 'y'),
  new Key(handler, rndIndex(keySpawns), rndIndex(keySpawns), 'b'),
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
  room.entities.push(new Worker(handler, 4, 5))
  room.entities.push(new Worker(handler, 7, 5, 'pleft'))
  room.entities.push(new Worker(handler, 7, 6, 'pleft'))

  spawnRoom = room.id;
  roomNumbers = roomNumbers.filter(r => r != room.id);

  return room;
}

let createKeyRooms = (rooms) => {
  for (let i = 0; i < 4; i++) {
    let r = pullRoom();
    // console.log(keys[0].color, 'key in room', r);
    keys[0].start.room = r;
    rooms[r].entities.push(keys[0]);
    // console.log(r);
    // rooms[spawnRoom].entities.push(keys[0]);

    keys.shift();
  }

  // console.log(rooms);
  return rooms;
}

let createMachineRoom = (rooms) => {
    let m = new Machine(handler, 5, 5);
    handler.machine = m;
    rooms[spawnRoom].entities.push(m);

  return rooms;
}


let spawnGuards = (rooms) => {
  roomNumbers.forEach(r => rooms[r].entities.push(
    new Guard(handler, rndIndex(guardSpawns), rndIndex(guardSpawns))
  ));

  return rooms;
}

let hasMachine = (room) => {
  return !!room.entities.find(e => e.type == 'm');
}

let hasKey = (room) => {
  return !!room.entities.find(e => e.type == 'key');
}

let addProps = (rooms) => {
  Object.keys(rooms).forEach((k) => {
    let r = rooms[k];

    if (!hasMachine(r) && !hasKey(r)) {
      let num = Math.random() <= .5 ? 1 : 2;
      r.entities.push(new PropMachine(handler, 5, 5, num));
      r.entities.push(new Worker(handler, 4, 5))
      r.entities.push(new Worker(handler, 7, 5, 'pleft'))
    }
  });

  return rooms;
}

let addManagers = (rooms) => {
  Object.keys(rooms).forEach((k) => {
    let r = rooms[k];

    if (!hasMachine(r) && hasKey(r)) {
      let ma = new Manager(handler, 5, 5);
      r.entities.push(ma);
      r.entities.push(new Desk(handler, ma));
    }
  });

  return rooms;
}

let finalRoom = (rooms) => {
  rooms[16].text = 'THE END!';
  rooms[16].entities = [];

  rooms[16].tileSet[0][5] = rooms[16].tileSet[0][6] = 3;
  rooms[16].tileSet[5][11] = rooms[16].tileSet[6][11] = 3;
  rooms[16].tileSet[11][5] = rooms[16].tileSet[11][6] = 3;
  rooms[16].tileSet[5][0] = rooms[16].tileSet[6][0] = 3;

  for (let y = 5; y < 10; y++) {
    for (let x = 2; x < 10; x++) {
        let r = rndInt(1, 7), e;

        if (r < 6) e = new Worker(handler, x, y);
        if (r == 6) {
          e = new Guard(handler, x, y);
          e.speed = 0;
        }
        if (r == 7) e = new Manager(handler, x, y);

        e.pacified = true;
        rooms[16].addEntity(e);
    }
  }

  rooms[16].addEntity(new Guard(handler, 2, 9));
  return rooms;
}

let addFloors = (rooms) => {
  for (let r = 0; r < 16; r++) {
    for (let y = 1; y < 11; y++) {
      for (let x = 1; x < 11; x++) {
        if (Math.random() < .3) rooms[r].tileSet[x][y] = 4;
      }
    }
  }

  return rooms;
}

export default function(_handler, start) {
  handler = _handler;

  let rooms = {
    0: new Room(  0, [noTop, noLeft]),
    1: new Room(  1, [noTop]),
    2: new Room(  2, [noTop]),
    3: new Room(  3, [noTop, noRight]),
    4: new Room(  4, [noLeft]),
    5: new Room(  5, [noRight]),
    6: new Room(  6, [noLeft]),
    7: new Room(  7, [noRight]),
    8: new Room(  8, [noLeft]),
    9: new Room(  9, [noRight]),
    10: new Room( 10, [noLeft]),
    11: new Room( 11, [noRight]),
    12: new Room( 12, [noBottom, noLeft]),
    13: new Room( 13, [noBottom]),
    14: new Room( 14, [noBottom]),
    15: new Room( 15, [noRight, noBottom]),
    16: new Room( 16, [], [], TILE_SIZE, TILE_COUNT, {p: 2, w: 3})
  };

  let r = startRoom(rooms[start]);
  rooms[start] = new Room( r.id, r.traits, r.entities);

  rooms = createKeyRooms(rooms);
  rooms = createMachineRoom(rooms);
  rooms = spawnGuards(rooms);
  rooms = addProps(rooms);
  rooms = addManagers(rooms);
  rooms = finalRoom(rooms);
  rooms = addFloors(rooms);

  return rooms;
};
