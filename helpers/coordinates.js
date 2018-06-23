
// Set the coordinates of the grid and ensure that game properties are set to dictate the logic of how robot coordinates should be stored depending on number of coordinates (e.g. x = 1 digit, y = 2 digits)
function setRectCoordinates(coords) {
  const coordObj = {};
  const coordsArr = coords.split('');
  // There are four coordinates, two x, two y
  if (coordsArr.length === 4) {
    this.fourDigitCoords = true;
    coordObj.x = parseInt(coordsArr[0] + coordsArr[1], 10);
    coordObj.y = parseInt(coordsArr[2] + coordsArr[3], 10);
    // There are 3 coordinates, variety in how they can be constructed so use helper function
  } else if (coordsArr.length === 3) {
    this.threeDigitCoords = true;
    this.threeCoordinateLogic.call(this, coordsArr, coordObj);
    // There are two coordinates, single x and y
  } else {
    coordObj.x = parseInt(coordsArr[0], 10);
    coordObj.y = parseInt(coordsArr[1], 10);
  }
  return coordObj;
}


// Set the coordinates for all Robots on a global object
function setRobotCoordinates(coords) {
  const coordObj = {};
  const coordsArr = coords.split('');
  if (this.fourDigitCoords) {
    coordObj.x = parseInt(coordsArr[0] + coordsArr[1], 10);
    coordObj.y = parseInt(coordsArr[2] + coordsArr[3], 10);
    coordObj.direction = coordsArr[4];
  } else if (this.threeDigitCoords) {
    if (this.yTwoDigits) {
      coordObj.x = parseInt(coordsArr[0], 10);
      coordObj.y = parseInt(coordsArr[1] + coordsArr[2], 10);
    } else {
      coordObj.x = parseInt(coordsArr[0] + coordsArr[1], 10);
      coordObj.y = parseInt(coordsArr[2], 10);
    }
    coordObj.direction = coordsArr[3];
  } else {
    coordObj.x = parseInt(coordsArr[0], 10);
    coordObj.y = parseInt(coordsArr[1], 10);
    coordObj.direction = coordsArr[2];
  }
  return coordObj;
}

// Take the inputs of each Robot and reduce to a single object containing all Robot starting positions.
function buildRobotObjects(inputs) {
  let robotNumber = 1;
  return inputs.reduce((robotObj, dataPoint, index) => {
    if (index % 2 === 0) {
      robotObj[robotNumber] = {};
      robotObj[robotNumber].startingCoord = setRobotCoordinates.call(this, dataPoint);
      robotObj[robotNumber].instructions = this.inputs[index + 1].split('');
      robotNumber++;
    }
    return robotObj;
  }, {});
}


function threeCoordinateLogic(coordsArr, coordObj) {
  // If the first number is greater than 5 or all numbers are less than 5, assume x = 1 digit, y = 2. The second piece of logic here is an assumption rather than a rule, but as the area is a rectangle, there's no problem as long as same rules are applied to robot coordinate inputs
  if (coordsArr[0] > 5 || (coordsArr[0] === 5 && coordsArr[1] > 0)) {
    this.yTwoDigits = true;
    coordObj.x = parseInt(coordsArr[0], 10);
    coordObj.y = parseInt(coordsArr[1] + coordsArr[2], 10);
    // Other logic secenarios include first two numbers equalling 50 or num 1 < 5 and num 2 > 5, but essentially all these scenarios result in x = 2 digits, y = 1, so no need to explicitly define this.
  } else {
    this.xTwoDigits = true;
    coordObj.x = parseInt(coordsArr[0] + coordsArr[1], 10);
    coordObj.y = parseInt(coordsArr[2], 10);
  }
  return coordObj;
}


module.exports = {
  setRectCoordinates,
  threeCoordinateLogic,
  setRobotCoordinates,
  buildRobotObjects
};
