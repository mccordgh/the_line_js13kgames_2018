// let makeRoom = () =>

let types = {
  0: [ // standard room
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
  ]
}

let fillRow = (room, row, start, stop, value) => {
  for (let i = start; i < (stop + 1); i++) {
    room[row][i] = value;
  }

  return room;
}

let fillCol = (room, col, start, stop, value) => {
  for (let i = start; i < (stop + 1); i++) {
    room[i][col] = value;
  }

  return room;
}

fillRow(types[0], 2, 9, 11, 9);
fillCol(types[0], 2, 9, 11, 9);
console.log(types[0])
/* BUILDING A ROOM



*/

export default {
  0: makeRoom(),
  1: makeRoom(),
  2: makeRoom(),
  3: makeRoom(),
  4: makeRoom(),
  5: makeRoom(),
  6: makeRoom(),
  7: makeRoom(),
  8: makeRoom(),
  9: makeRoom(),
  10: makeRoom(),
  11: makeRoom(),
  12: makeRoom(),
  13: makeRoom(),
  14: makeRoom(),
  15: makeRoom(),
}