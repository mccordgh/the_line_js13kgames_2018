let width, height, size, grid;

export class SpatialGrid {
  constructor(_width, _height, _size) {
    width = parseInt(_width / _size);
    height = parseInt(_height / _size);
    size = _size;
    grid = [];
    for (var i = 0; i <= width; i++){
      grid[i] = [];
      for (var j = 0; j <= height; j++){
        grid[i][j] = [];
      }
    }
  }

  //Insert entities in spatial grid
  insert(_rect, _entity) {
    var startX = Math.max(0, parseInt(_rect.x / size));
    var startY = Math.max(0, parseInt(_rect.y / size));
    var endX = Math.min(width, parseInt((_rect.x + _rect.width) / size));
    var endY = Math.min(height, parseInt((_rect.y + _rect.height) / size));
    for (var y = startY; y <= endY; y++){
      for (var x = startX; x <= endX; x++){
        if (grid[x][y].indexOf(_entity) === -1) // if entity does not already exist in spatial grid
          grid[x][y].push(_entity);
      }
    }
  }

  //Retrieve all other Entities in spatial grid
  retrieve(_rect, _entity) {
    var startX = Math.max(0, parseInt(_rect.x / size));
    var startY = Math.max(0, parseInt(_rect.y / size));
    var endX = Math.min(width, parseInt((_rect.x + _rect.width) / size));
    var endY = Math.min(height, parseInt((_rect.y + _rect.height) / size));
    var entities = [];
    for (var y = startY; y <= endY; y++){
      for (var x = startX; x <= endX; x++){
        grid[x][y].forEach(function(entity){
          if (entity !== _entity && entities.indexOf(entity) == -1)
            entities.push(entity);
        });
      }
    }
    return entities;
  }

  //FOR DEV PURPOSES ~> Remove Entity from spatial grid
  remove(_rect, _entity) {
    var startX = Math.max(0, parseInt(_rect.x / size));
    var startY = Math.max(0, parseInt(_rect.y / size));
    var endX = Math.min(width, parseInt((_rect.x + _rect.width) / size));
    var endY = Math.min(height, parseInt((_rect.y + _rect.height) / size));
    var entities = [];
    for (var y = startY; y <= endY; y++){
      for (var x = startX; x <= endX; x++){
        for (var i = 0; i < grid[x][y].length; i++){
          if (grid[x][y][i] === _entity)
            grid[x][y].splice(i, 1);
        }
      }
    }
  }

  //Render Grid Squares
  render(_g, _handler) {
    for (var y = 0; y <= height; y++){
      for (var x = 0; x <= width; x++){
        // var xpos = (x * size) - _handler.getGameCamera().getxOffset();
        // var ypos = (y * size) - _handler.getGameCamera().getyOffset();
        var xpos = (x * size);
        var ypos = (y * size);
        _g.strokeRect(xpos, ypos, size, size);
        if (grid[x][y].length > 0){
          _g.fillStyle = "blue";
          _g.fillRect(xpos, ypos, size, size);
        }
      }
    }
  }

  //Getters
  getWidth() {
    return width;
  }

  getHeight() {
    return height;
  }

  getSize() {
    return size;
  }
}
