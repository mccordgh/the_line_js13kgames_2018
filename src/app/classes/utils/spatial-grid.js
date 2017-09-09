export class SpatialGrid {
  constructor(width, height, size) {
    this.width = parseInt(width / size);
    this.height = parseInt(height / size);
    this.size = size;
    this.grid = [];
    for (let i = 0; i <= this.width; i++){
      this.grid[i] = [];
      for (let j = 0; j <= this.height; j++){
        this.grid[i][j] = [];
      }
    }
  }

  insert(rect, entity) {
    let startX = Math.max(0, parseInt(rect.x / this.size));
    let startY = Math.max(0, parseInt(rect.y / this.size));
    let endX = Math.min(this.width, parseInt((rect.x + rect.width) / this.size));
    let endY = Math.min(this.height, parseInt((rect.y + rect.height) / this.size));
    for (let y = startY; y <= endY; y++){
      for (let x = startX; x <= endX; x++){
        if (this.grid[x][y].indexOf(entity) === -1)
          this.grid[x][y].push(entity);
      }
    }
  }

  //Retrieve all other Entities in spatial grid
  retrieve(rect, _entity) {
    let startX = Math.max(0, parseInt(rect.x / this.size));
    let startY = Math.max(0, parseInt(rect.y / this.size));
    let endX = Math.min(this.width, parseInt((rect.x + rect.width) / this.size));
    let endY = Math.min(this.height, parseInt((rect.y + rect.height) / this.size));
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

  remove(rect, entity) {
    let startX = Math.max(0, parseInt(rect.x / this.size));
    let startY = Math.max(0, parseInt(rect.y / this.size));
    let endX = Math.min(this.width, parseInt((rect.x + rect.width) / this.size));
    let endY = Math.min(this.height, parseInt((rect.y + rect.height) / this.size));

    for (let y = startY; y <= endY; y++){
      for (let x = startX; x <= endX; x++){
        for (let i = 0; i < this.grid[x][y].length; i++){
          if (this.grid[x][y][i] === entity)
            this.grid[x][y].splice(i, 1);
        }
      }
    }
  }

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
