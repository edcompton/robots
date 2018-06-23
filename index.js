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
};


game.initialise();
