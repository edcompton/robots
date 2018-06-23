const { setRectCoordinates, buildRobotObjects } = require('./helpers/coordinates');
const { executeAllMoves } = require('./helpers/robotMovement');

const game = {};

// First off, initialise the exercise by grabbing the inputs given on the command line and storing them in variables for later.
function initialise() {
  game.isLost = false;
  game.finalRobotPositions = [];
  game.lostCoordinates = [];

  // Store the arguments from the command line in variables to be passed to setup functions in due course. Convert gridSize to an integer for ease of later board creation (if visualising).
  game.gridCoords = setRectCoordinates.call(game, process.argv.slice(2, 3)[0]);
  game.inputs = process.argv.slice(3, process.argv.length);

  // Save all of the relevant robot instructions and coordinates in an object, using an array for the instructions to enable ease of sorting later
  game.robotPositions = buildRobotObjects.call(game, game.inputs);

  // Move robots around the grid
  findFinalPositions.call(game);
}


function findFinalPositions() {
  Object.keys(this.robotPositions).forEach((num) => {
    // Create consts for ease of reading
    const startingCoord = this.robotPositions[num].startingCoord;
    const instructions = this.robotPositions[num].instructions;

    this.finalRobotPositions.push(executeAllMoves.call(this, startingCoord, instructions));
  });
  // Print the final results
  console.log(this.finalRobotPositions);
}

// Run the program
initialise();
