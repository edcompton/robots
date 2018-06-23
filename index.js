const game = {};

// First off, initialise the exercise by grabbing the inputs given on the command line and storing them in variables for later.
game.initialise = function() {
  game.isLost = false;
  game.finalRobotPositions = [];
  game.lostCoordinates = [];

  // Store the arguments from the command line in variables to be passed to setup functions in due course. Convert gridSize to an integer for ease of later board creation (if visualising).
  game.gridCoords = game.setRectCoordinates(process.argv.slice(2, 3)[0]);
  game.inputs = process.argv.slice(3, process.argv.length);

  // Save all of the relevant robot instructions and coordinates in an object, using an array for the instructions to enable ease of sorting later
  let robotNumber = 1;
  game.robotPositions = game.inputs.reduce((robotObj, dataPoint, index) => {
    if (index % 2 === 0) {
      robotObj[robotNumber] = {};
      robotObj[robotNumber].startingCoord = game.setRobotCoordinates(dataPoint);
      robotObj[robotNumber].instructions = game.inputs[index + 1].split('');
      robotNumber++;
    }
    return robotObj;
  }, {});

  // Move robots around the grid
  game.initialiseMovement();
};

game.setRectCoordinates = function(coords) {
  const coordObj = {};
  const coordsArr = coords.split('');
  if (coordsArr.length === 4) {
    game.fourDigitCoords = true;
    coordObj.x = parseInt(coordsArr[0] + coordsArr[1], 10);
    coordObj.y = parseInt(coordsArr[2] + coordsArr[3], 10);
    if (coordsArr[4]) coordObj.direction = coordsArr[4];
  } else if (coordsArr.length === 3) {
    game.threeDigitCoords = true;
    game.threeCoordinateLogic(coordsArr, coordObj);
  } else {
    coordObj.x = parseInt(coordsArr[0], 10);
    coordObj.y = parseInt(coordsArr[1], 10);
    if (coordsArr[2]) coordObj.direction = coordsArr[2];
  }

  return coordObj;
};

game.threeCoordinateLogic = function(coordsArr, coordObj) {
  // If the first number is greater than 5 or all numbers are less than 5, assume x = 1 digit, y = 2. The second piece of logic here is an assumption rather than a rule, but as the area is a rectangle, there's no problem as long as same rules are applied to robot coordinate inputs
  if (coordsArr[0] > 5 || ((coordsArr[0] < 5 && coordsArr[1] < 5) && coordsArr[2] < 5)) {
    game.yTwoDigits = true;
    coordObj.x = parseInt(coordsArr[0], 10);
    coordObj.y = parseInt(coordsArr[1] + coordsArr[2], 10);
    // Other logic secenarios include first two numbers equalling 50 or num 1 < 5 and num 2 > 5, but essentially all these scenarios result in x = 2 digits, y = 1, so no need to explicitly define this.
  } else {
    game.xTwoDigits = true;
    coordObj.x = parseInt(coordsArr[0] + coordsArr[1], 10);
    coordObj.y = parseInt(coordsArr[2], 10);
  }
  // Add direction assignment so can use function for both game area and robot coordinate assignment
  if (coordsArr[3]) coordObj.direction = coordsArr[3];
  return coordObj;
};

game.setRobotCoordinates = function(coords) {
  const coordObj = {};
  const coordsArr = coords.split('');
  if (game.fourDigitCoords) {
    console.log(coordsArr);
    coordObj.x = parseInt(coordsArr[0] + coordsArr[1], 10);
    coordObj.y = parseInt(coordsArr[2] + coordsArr[3], 10);
    coordObj.direction = coordsArr[4];
  } else if (game.threeDigitCoords) {
    game.threeCoordinateLogic(coordsArr, coordObj);
  } else {
    coordObj.x = parseInt(coordsArr[0], 10);
    coordObj.y = parseInt(coordsArr[1], 10);
    if (coordsArr[2]) coordObj.direction = coordsArr[2];
  }

  return coordObj;
};

game.initialiseMovement = function() {

  Object.keys(game.robotPositions).forEach((num) => {
    // Create consts for ease of reading
    const startingCoord = game.robotPositions[num].startingCoord;
    const instructions = game.robotPositions[num].instructions;
    console.log(startingCoord);
    game.finalRobotPositions.push(game.findFinalPosition(startingCoord, instructions));
  });
  console.log(game.finalRobotPositions);
};

game.findFinalPosition = function(startingCoord, instructions) {
  let robotCoord = startingCoord;
  let lostCoords;
  let returnString = '';

  // Use a for loop to retain the ability to use break to exit loop on robot 'death'
  for (var i = 0; i < instructions.length; i++) {
    const movement = instructions[i];
    // Create a new object in memory
    const unModified = JSON.parse(JSON.stringify(robotCoord));
    // Switch through instructions (switch statement can account for future inputs)
    switch (movement) {
      case 'F':
        robotCoord = game.moveForward(robotCoord);
        break;
      case 'L':
        robotCoord = game.rotateRobot(robotCoord, movement);
        break;
      case 'R':
        robotCoord = game.rotateRobot(robotCoord, movement);
        break;
      default:
    }
    // Run check per loop for lost robots, break from loop if object property is true
    if (game.isLost) {
      lostCoords = unModified;
      console.log('LOST COORDS', lostCoords);
      break;
    }
  }
  // Modify returned string based on whether robot lost or not. Store coordinates of lost robots for future reference on global game object
  if (lostCoords) {
    game.isLost = false;
    const { x, y, direction } = lostCoords;
    returnString = `${x}${y}${direction}LOST`;
    game.lostCoordinates.push(`${x}${y}${direction}`);
    console.log(game.lostCoordinates);
  } else {
    const { x, y, direction } = robotCoord.x;
    returnString = `${x}${y}${direction}`;
  }

  return returnString;
};

game.rotateRobot = function(coords, direction) {
  const compassPoints = ['N', 'E', 'S', 'W'];
  const currentPosition = compassPoints.findIndex(point => point === coords.direction);

  if (direction === 'L') {
    compassPoints[currentPosition - 1]
      ? coords.direction = compassPoints[currentPosition - 1]
      : coords.direction = compassPoints[compassPoints.length - 1];
  } else {
    compassPoints[currentPosition + 1]
      ? coords.direction = compassPoints[currentPosition + 1]
      : coords.direction = compassPoints[0];
  }
  return coords;
};

game.moveForward = function(currentCoords) {
  // N = y+1   E = x+1   S = y-1   W = x-1
  const direction = currentCoords.direction;
  const modifiedCoords = currentCoords;

  let axis;
  const stringCoordinates = `${modifiedCoords.x}${modifiedCoords.y}${modifiedCoords.direction}`;

  if (!game.lostCoordinates.includes(stringCoordinates)) {
    if (direction === 'N') {
      axis = 'y';
      modifiedCoords.y++;
    } else if (direction === 'E') {
      axis = 'x';
      modifiedCoords.x++;
    } else if (direction === 'S') {
      axis = 'y';
      modifiedCoords.y--;
    } else {
      axis = 'x';
      modifiedCoords.x--;
    }
  }

  game.isLost = game.lostChecker(modifiedCoords, axis);

  return modifiedCoords;
};

game.lostChecker = function(coords, axisIncrement) {
  return coords[axisIncrement] > game.gridCoords[axisIncrement] || coords[axisIncrement] < 0
    ? true
    : false;
};

// Run the program
game.initialise();
