export class SpatialGrid {
  constructor(_width, _height, _size) {
    this.width = parseInt(_width / _size);
    this.height = parseInt(_height / _size);
    this.size = _size;
    this.grid = [];
    for (let i = 0; i <= this.width; i++){
      this.grid[i] = [];
      for (let j = 0; j <= this.height; j++){
        this.grid[i][j] = [];
      }
    }
  }

  //Insert entities in spatial grid
  insert(_rect, _entity) {
    let startX = Math.max(0, parseInt(_rect.x / this.size));
    let startY = Math.max(0, parseInt(_rect.y / this.size));
    let endX = Math.min(this.width, parseInt((_rect.x + _rect.width) / this.size));
    let endY = Math.min(this.height, parseInt((_rect.y + _rect.height) / this.size));
    for (let y = startY; y <= endY; y++){
      for (let x = startX; x <= endX; x++){
        if (this.grid[x][y].indexOf(_entity) === -1) // if entity does not already exist in spatial grid
          this.grid[x][y].push(_entity);
      }
    }
  }

  //Retrieve all other Entities in spatial grid
  retrieve(_rect, _entity) {
    let startX = Math.max(0, parseInt(_rect.x / this.size));
    let startY = Math.max(0, parseInt(_rect.y / this.size));
    let endX = Math.min(this.width, parseInt((_rect.x + _rect.width) / this.size));
    let endY = Math.min(this.height, parseInt((_rect.y + _rect.height) / this.size));
    let entities = [];
    for (let y = startY; y <= endY; y++){
      for (let x = startX; x <= endX; x++){
        this.grid[x][y].forEach((entity) => {
          if (entity !== _entity && entities.indexOf(entity) === -1)
            entities.push(entity);
        });
      }
    }
    return entities;
  }

  //FOR DEV PURPOSES ~> Remove Entity from spatial grid
  remove(_rect, _entity) {
    let startX = Math.max(0, parseInt(_rect.x / this.size));
    let startY = Math.max(0, parseInt(_rect.y / this.size));
    let endX = Math.min(this.width, parseInt((_rect.x + _rect.width) / this.size));
    let endY = Math.min(this.height, parseInt((_rect.y + _rect.height) / this.size));

    for (let y = startY; y <= endY; y++){
      for (let x = startX; x <= endX; x++){
        for (let i = 0; i < this.grid[x][y].length; i++){
          if (this.grid[x][y][i] === _entity)
            this.grid[x][y].splice(i, 1);
        }
      }
    }
  }

  //Render Grid Squares if you need to see the spatial grid
  // render(_g, _handler) {
  //   for (let y = 0; y <= this.height; y++){
  //     for (let x = 0; x <= this.width; x++){
  //       // let xpos = (x * this.size) - _handler.getGameCamera().getxOffset();
  //       // let ypos = (y * this.size) - _handler.getGameCamera().getyOffset();
  //       let xpos = (x * this.size);
  //       let ypos = (y * this.size);
  //       _g.strokeRect(xpos, ypos, this.size, this.size);
  //       if (grid[x][y].length > 0){
  //         _g.fillStyle = "blue";
  //         _g.fillRect(xpos, ypos, this.size, this.size);
  //       }
  //     }
  //   }
  // }

  //Getters
  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getSize() {
    return this.size;
  }
}
