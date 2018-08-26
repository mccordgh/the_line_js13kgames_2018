// let makeRoom = () =>

let standardRoom = () => [
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1]
  ];

// let fillRow = (room, row, start, stop, value) => {
//   for (let i = start; i < (stop + 1); i++) {
//     room[row][i] = value;
//   }

//   return room;
// }

// let fillCol = (room, col, start, stop, value) => {
//   for (let i = start; i < (stop + 1); i++) {
//     room[i][col] = value;
//   }

//   return room;
// }

/* BUILDING A ROOM

  1. fill in standard room with 4 exits
  2. block off exits that shouldn't exist (outside edges of full world)
  3. add extra barriers
  4. add npc
  5. add items

*/

let makeRoom = (traits = []) => {
  let r = standardRoom();

  for (let i = 0; i < traits.length; i++) {
    r = traits[i](r);
  }

  return r;
}

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

/* World "map" layout of rooms
  [ 0 ] [ 1 ] [ 2 ] [ 3 ]
  [ 4 ] [ 5 ] [ 6 ] [ 7 ]
  [ 8 ] [ 9 ] [10 ] [11 ]
  [12 ] [13 ] [14 ] [15 ]
*/

export default {
  0: makeRoom([noTop, noLeft]),
  1: makeRoom([noTop]),
  2: makeRoom([noTop]),
  3: makeRoom([noTop, noRight]),
  4: makeRoom([noLeft]),
  5: makeRoom(),
  6: makeRoom(),
  7: makeRoom([noRight]),
  8: makeRoom([noLeft]),
  9: makeRoom(),
  10: makeRoom(),
  11: makeRoom([noRight]),
  12: makeRoom([noBottom, noLeft]),
  13: makeRoom([noBottom]),
  14: makeRoom([noBottom]),
  15: makeRoom([noRight, noBottom]),
}