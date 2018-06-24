const {lostChecker, formatResponse} = require('./attributeModifiers');

// Parent function that cycles through all robots, executing their moves and returning a final position
function executeAllMoves(startingCoord, instructions) {
  let robotCoord = startingCoord;
  let lostCoords;

  // Use a for loop to retain the ability to use break to exit loop on robot loss
  for (var i = 0; i < instructions.length; i++) {
    const movement = instructions[i];
    // Create a new object in memory to retain final position of robot if lost
    const unModified = JSON.parse(JSON.stringify(robotCoord));

    // Switch through instructions (switch statement can account for addition of future inputs/instructions, else could use a turnary)
    switch (movement) {
      case 'F':
        robotCoord = moveForward.call(this, robotCoord);
        break;
      case 'L':
        robotCoord = rotateRobot.call(this, robotCoord, movement);
        break;
      case 'R':
        robotCoord = rotateRobot.call(this, robotCoord, movement);
        break;
      default:
    }

    // Run check per loop for lost robots, break from loop if game attribute property is true
    if (this.isLost) {
      lostCoords = unModified;
      break;
    }
  }

  // Modify returned string based on whether robot lost or not. Store coordinates of lost robots for future reference on global game object
  if (lostCoords) {
    const {x, y, direction} = lostCoords;
    this.lostCoordinates.push(`${x}${y}${direction}`);
    return formatResponse.call(this, lostCoords, this.isLost);
  } else {
    return formatResponse.call(this, robotCoord);
  }
}

// Function that finds the compass point the robot is facing, then orientates in one point clockwise or counter-clockwise
function rotateRobot(coords, direction) {
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
}

// Function to move robot forward and increment the x or y axis depending on the robot orientation
function moveForward(currentCoords) {
  // N = y+1   E = x+1   S = y-1   W = x-1
  const direction = currentCoords.direction;
  let axis;
  const stringCoordinates = `${currentCoords.x}${currentCoords.y}${currentCoords.direction}`;

  // Only execute a forward move if the coordinates and orientation combination don't exist in the lost coordinates array
  if (!this.lostCoordinates.includes(stringCoordinates)) {
    if (direction === 'N') {
      axis = 'y';
      currentCoords.y++;
    } else if (direction === 'E') {
      axis = 'x';
      currentCoords.x++;
    } else if (direction === 'S') {
      axis = 'y';
      currentCoords.y--;
    } else {
      axis = 'x';
      currentCoords.x--;
    }
  }
  // Check if the robot is lost based on the last move. returns a boolean value to be assigned to the global attribute object for reference in executeAllMoves function
  this.isLost = lostChecker.call(this, currentCoords, axis);

  return currentCoords;
}

module.exports = {
  executeAllMoves
};
