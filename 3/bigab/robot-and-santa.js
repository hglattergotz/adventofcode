function SimpleVector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

SimpleVector.prototype = Object.create({
  addVector: function(vector) {
    return new SimpleVector(this.x + vector.x, this.y + vector.y);
  }
});

var directionVectors = {
  ">": new SimpleVector(1, 0),
  "<": new SimpleVector(-1, 0),
  "^": new SimpleVector(0, 1),
  "v": new SimpleVector(0, -1)
};

function calulateNumberOfHousesThatGotPresentsWithRobot(input) {
  var pos = {
    santa: new SimpleVector(), // origin 0,0
    robot: new SimpleVector() // origin 0,0
  };
  var deliveryLog = input.split('')
    .map(d => directionVectors[d])
    .map((vector, idx) => {
      return pos[idx % 2 ? 'santa' : 'robot'] = pos[idx % 2 ? 'santa' : 'robot'].addVector(vector);
    })
    .reduce((log, position) => {
      var posKey = position.x + "|" + position.y;
      log[posKey] = log[posKey] ? log[posKey] + 1 : 1;
      return log;
    }, {'0|0': 1});
  return Object.keys(deliveryLog).length;
}
