import { Room } from './room';
import { Guard } from '../entities/creatures/monsters/guard';

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
*

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

let startRoom = (handler, room) => {
  console.log('br', room);
  room.addEntity(new Guard(handler, 8, 3));
  console.log('aft', room);
  return room;
}
/* TRAITS */


export default function(handler, start) {
  let rooms = {
    0: new Room(handler, 0, [noTop, noLeft]),
    1: new Room(handler,1,[noTop]),
    2: new Room(handler,2,[noTop]),
    3: new Room(handler,3,[noTop, noRight]),
    4: new Room(handler,4,[noLeft]),
    5: new Room(handler,5),
    6: new Room(handler,6),
    7: new Room(handler,7,[noRight]),
    8: new Room(handler,8,[noLeft]),
    9: new Room(handler,9,),
    10: new Room(handler,10),
    11: new Room(handler,11,[noRight]),
    12: new Room(handler,12,[noBottom, noLeft]),
    13: new Room(handler,13,[noBottom]),
    14: new Room(handler,14,[noBottom]),
    15: new Room(handler,15,[noRight, noBottom]),
  };

  let r = startRoom(handler, rooms[start]);
  // console.log(r)
  // console.log(r.traits, r.id);
  rooms[start] = new Room(handler, r.id, r.traits, r.entities, start);
  console.log({start, rooms})
  return rooms;
};
