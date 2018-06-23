const game = {};

// First off, initialise the exercise by grabbing the inputs given on the command line and storing them in variables for later.
game.initialise = function() {
  game.isLost = false;
  // Store the arguments from the command line in variables to be passed to setup functions in due course. Convert gridSize to an integer for ease of later board creation (if visualising).
  game.gridCoords = game.setCoordinates(process.argv.slice(2, 3)[0]);

  game.inputs = process.argv.slice(3, process.argv.length);

  // Save all of the relevant robot instructions and coordinates in an object, using an array for the instructions to enable ease of sorting later
  let robotNumber = 1;
  game.robotPositions = game.inputs.reduce((robotObj, dataPoint, index) => {
    if (index % 2 === 0) {
      robotObj[robotNumber] = {};
      robotObj[robotNumber].startingCoord = game.setCoordinates(dataPoint);
      robotObj[robotNumber].instructions = game.inputs[index + 1].split('');
      robotNumber++;
    }
    return robotObj;
  }, {});
  // Move robots around the grid
  game.initialiseMovement();
};


game.setCoordinates = function(coords) {
  const coordObj = {};
  const individualCoords = coords.split('');
  if (individualCoords.length === 4) {
    coordObj.x = parseInt(individualCoords[0] + individualCoords[1], 10);
    coordObj.y = parseInt(individualCoords[2] + individualCoords[3], 10);
    if (individualCoords[4]) coordObj.direction = individualCoords[4];
  } else {
    coordObj.x = parseInt(individualCoords[0], 10);
    coordObj.y = parseInt(individualCoords[1], 10);
    if (individualCoords[2]) coordObj.direction = individualCoords[2];
  }


  return coordObj;
};

game.initialiseMovement = function() {
  game.finalRobotPositions = [];
  game.lostCoordinates = [];

  Object.keys(game.robotPositions).forEach((num) => {
    // Create consts for ease of reading
    const startingCoord = game.robotPositions[num].startingCoord;
    const instructions = game.robotPositions[num].instructions;

    game.finalRobotPositions.push(game.findFinalPosition(startingCoord, instructions));
  });
  console.log(game.finalRobotPositions);
};

game.findFinalPosition = function(startingCoord, instructions) {
  let robotCoord = startingCoord;
  let lostCoords;
  let x;
  let y;
  let direction;
  let returnString = '';

  // Use a for loop to retain the ability to use break
  for (var i = 0; i < instructions.length; i++) {
    const movement = instructions[i];
    console.log(robotCoord);
    const unModified = {
      x: robotCoord.x,
      y: robotCoord.y,
      direction: robotCoord.direction
    };
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
    if (game.isLost) {
      lostCoords = unModified;
      console.log('LOST COORDS', lostCoords);
      break;
    }
  }

  if (lostCoords) {
    game.isLost = false;
    x = lostCoords.x;
    y = lostCoords.y;
    direction = lostCoords.direction;
    returnString = `${x}${y}${direction}LOST`;
    game.lostCoordinates.push(`${x}${y}${direction}`);
    console.log(game.lostCoordinates);
  } else {
    x = robotCoord.x;
    y = robotCoord.y;
    direction = robotCoord.direction;
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
